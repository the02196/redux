import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import {collection, addDoc, getFirestore, serverTimestamp} from 'firebase/firestore'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../components/Modal'

const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 12px;
    padding: 0.625rem 1.25rem;
    background-color: rgb(126,34,206);
    padding-top: 0.625rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color: white;
    display: flex;
    cursor: pointer;
    align-items: center;
    outline: none;
    border: none;
    &:nth-child(2){
        background-color: rgb(29,78,216);
    }
    a{
        color: #fff;
    }
    svg{margin-right: 12px}
`

function Ckeditor({title}) {
    const memberProfile = useSelector(state => state.user);
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const {board} = useParams();    
    const [writeData, setWriteData] = useState("");
    const [message, setMessage] = useState("");
    const dataSubmit = async ()=>{
        if(title.length === 0){
            setIsModal(!isModal)
            setMessage("제목을 입력해주세요.");
            return;
            // 아래 것이 실행되지 않게 하기 위해 리턴한다!
        }else if(writeData.length === 0){
            setIsModal(!isModal);
            setMessage("내용을 입력해주세요.")
            return;
        }

        try{
            // setDoc은 내가 uid를 지정할 수 있다.
            // addDoc은 uid를 지정할 수 없다. 랜덤으로 값이 부여된다!
            await addDoc(collection(getFirestore(), board), {
                title : title,
                content : writeData,
                view: 1,
                uid: memberProfile.uid,
                name: memberProfile.data.name,
                email: memberProfile.data.email,
                nickname: memberProfile.data.nickname,
                timestamp: serverTimestamp()
            })
            alert("게시글이 성공적으로 등록 되었습니다")
            navigate(`/service/${board}`)
        }catch(error){
            setIsModal(!isModal);
            setMessage(error);
        }
    }


  return (
    <>
    {isModal && <Modal error={message} onClose={()=>{setIsModal(false)}}></Modal>}
    <CKEditor
                    editor={ClassicEditor}
                    data = {writeData}
                    config={{
                         placeholder: "내용을 입력하세요.",
                     }}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setWriteData(data);
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <ButtonWrap>
                    <Button onClick={dataSubmit}><FontAwesomeIcon icon={faPen} />완료</Button>
                    <Button><Link to="/service/notice"><FontAwesomeIcon icon={faPen} />목록</Link></Button>
                </ButtonWrap>
    
    </>
  )
}

export default Ckeditor