import React, { useEffect } from 'react'
import styled from 'styled-components';
import Ckeditor from '../components/Ckeditor';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import { useSelector } from 'react-redux';
import { doc, getDoc, getFirestore } from 'firebase/firestore';



const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
`;

const InnerContainer = styled.div`
  margin: 0 4px;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Heading = styled.h3`
  font-size: 30px;
  position: relative;

  &::after {
    content: '';
    width: 30px;
    height: 5px;
    margin-left: 0.5px;
    background-color: #2ed090;
    position: absolute;
    top: -6px;
    left: 0;
    border-radius: 2px;
  }
`;

const ContentWrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 9px;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;

const ContentInner = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const TextInput = styled.input`
  height: 40px;
  border: 1px solid #e5e7eb;
  flex-basis: 75%;
`;

const ContentInputWrapper = styled.div`
  width: auto;
  margin-top: 20px;
  margin-left: 70px;
`;

const ContentLabel = styled.p`
  margin-bottom: 15px;
`;



function Write() {

  const [textTitle, setTextTitle] = useState("");
  const {board, view} = useParams()
  
  const boards = ["notice", "online", "qna", "gallery"];
  const [isModal, setIsModal] = useState(view ? false : true);
  const navigate = useNavigate();
  const memberProfile = useSelector(state => state.user);
  
  const [postData, setPostData] = useState(null);
  const [message, setMessage] = useState("");
  const uid = sessionStorage.getItem("users");
  const [userUid, setUserUid] = useState(uid);

  useEffect(()=>{
    if(board && view){
      const fetchData = async () => {
        const postRef = doc(getFirestore(), board, view);
        const postSnapShot = await getDoc(postRef);
        if(postSnapShot.exists()){
          setIsModal(false)
          setPostData(postSnapShot.data())
          setTextTitle(postSnapShot.data().title)
          if(uid !== postSnapShot.data().uid){
            setIsModal(true);
            setMessage("권한 없음")
            return;
          }
        }else{
          setIsModal(true)
          setMessage("해당 문서가 존재하지 않습니다.")
        }
      }
    fetchData()
    }
  },[board, view, uid])

  if(!memberProfile.loggedIn){
    return (
      <>
        {
          isModal && <Modal error="로그인 이후 이용해주시길 바랍니다." onClose={()=>{setIsModal(false); navigate('/login')}} />
        }
      </>
    )
  }
  if(!boards.includes(board)){
    return (
      <>
        {
          isModal && <Modal error="잘못된 게시판입니다!" onClose={()=>{setIsModal(false); navigate('/')}} />
        }
      </>
    )
  }

  return (
    <>
      {
        isModal && view && <Modal error={message} onClose={()=>{setIsModal(false); navigate(`/service/${board}`)}} />
      }
      <Container>
        <InnerContainer>
          <Header>
            <Heading>{board && view ? "글수정" : "글쓰기"}</Heading>
            
          </Header>

          <ContentWrapper>
            <ContentInner>
              <Title>제목</Title>
              <TextInput defaultValue={postData && postData.title} type="text" onChange={(e)=>{setTextTitle(e.target.value)}} />
            </ContentInner>
            <ContentInputWrapper>
              <ContentLabel>내용</ContentLabel>
              <Ckeditor postData={postData} title={textTitle}/>
            </ContentInputWrapper>
          </ContentWrapper>
        </InnerContainer>
      </Container>
    </>
  );
}


export default Write;