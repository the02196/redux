import React, { useState } from 'react'
import styled from 'styled-components'
import { firebaseAuth, signInWithEmailAndPassword } from './../firebase'
import {NavLink, useNavigate} from 'react-router-dom' //로그인 성공시 이전페이지로 돌아가기 위해 필요함
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { logIn, loggedIn } from '../store'

const Container =styled.div`
  display: flex;
  background-color: #f5f5f5;  //다크모드 불러와서 써야함
  justify-content: center;
  height: calc(100vh - 86px); // 스크롤떄문에 빼기 해줌
  align-items: center; // 화면 정가운데로 옮기고 싶으면 height 값 주고 aic 하면됨
`

const SignUp =styled.div`
  width: 35vw;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: 10px;
  @media screen and (max-width: 1024px){
    width: 60vw;
  }
  @media screen and (max-width: 640px){
    width: 70vw;
  }  
`

const Title =styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;

`
const Input =styled.input`
 width: 100%;
 padding: 10px;
 margin-bottom: 10px;
 border: 1px solid #ddd;
 border-radius: 5px;
 box-sizing: border-box;
 padding-left: 45px;
 transition: border-color 0.4s;
 &:focus{
  border-color: #007bff;
  outline: none;
 }
 &::placeholder{
  opacity: 0;
 }
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;

  &:last-child{
    margin-bottom: 0; margin-top: 20px;
    justify-content: flex-end; display: flex;
    column-gap: 20px;
    a{
      background-color: #40e0d0;
      font-size: 14px;
      text-align: center;
      padding: 5px 20px;
      border-radius: 5px;
      color: #fff;
      &:last-child{
        background-color: #036;
      }
    }

  }
  input:focus + label,
  input:not(:placeholder-shown) + label{ //글자를 남겨두는거
    top: 4px;
    left: 4px;
    font-size: 8px;
    color: #007bff;
  }

`
const Label =styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s;
  pointer-events: none;

`


const Button =styled.button`
 width: 100%;
 padding: 10px;
 background-color: #007bff;
 border-radius: 5px;
 border: none;
 cursor: pointer;
 color: #fff;
`


function Login() {

  const [email,setEmail]=useState();
  const[password,setPassword]=useState();
  const [error,setError]=useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMsg = (errorCode) =>{
    const firebaseError = {
        'auth/user-not-found' :"이메일 혹은 비밀번호가 잘못 되었습니다.",
        'auth/wrong-password' :'이메일 혹은 비밀번호가 잘못 되었습니다.',
        'auth/invalid-email' :'이메일 혹은 비밀번호가 잘못 되었습니다.'
    }
    return firebaseError[errorCode]|| '알 수 없는 에러가 발생했습니다.'  //firebaseError가 반환되거나 알수없는 에러가 발생했습니다 라고 둘중에 하나가 리턴이 됨
  }
  const LoginForm = async (e) =>{ //async: 함수내에서 만 사용가능하며, function 앞에 붙어서 사용함. 무엇가를 준비한다.
  // try,catch 문:try문의 코드는 오류가 있을수있지만 실행해주세요~ catch문에는 오류가 있을 시 아래 코드를 실행해주세요
    e.preventDefault();

    try{
      const userLogin = await signInWithEmailAndPassword(firebaseAuth , email, password);
      //await는 변수를 설정할때 같이 사용하는데 잠깐 기다리는라는 말임. (async랑 같이 사용해야만 함. )
      // console.log(userLogin);
      const user = userLogin.user;
      console.log(user);
      sessionStorage.setItem("users",user.uid);
      dispatch(logIn(user.uid));


      const userDoc = doc(collection(getFirestore(),"users"),user.uid);
      //collection은 데이터 하나만 가져온다는 뜻
      const userDocSnapshot = await getDoc(userDoc);
      // console.log(userDocSnapshot.data());
      if(userDocSnapshot.exists()){
        const userData = userDocSnapshot.data();
        dispatch(loggedIn(userData));
        navigate(-1);
        
      }else if(!userDocSnapshot.exists()){
        
      }

    }catch(error){
      setError(errorMsg(error.code));
      console.log(error.code);

    }
    
  }


  return (
    <>
      <Container>
        <SignUp>
          <Title>로그인</Title>
          {/* {email}{password} */}
          <form onSubmit={LoginForm}>
            <InputWrapper>
              <Input type='email' className='email' placeholder='이메일' onChange={(e)=>{
                setEmail(e.target.value)
              }} required /> 
              {/* required는 input에서 코드가 있는지 없는지 확인하는것 */}
              <Label>이메일</Label>
            </InputWrapper>
            <InputWrapper>
              <Input type='password' className='password' placeholder='비밀번호' onChange={(e)=>{
                setPassword(e.target.value)
              }} required/>
              <Label>패스워드</Label>
            </InputWrapper>
            <Button>로그인</Button>
            </form>
            <InputWrapper>
              <NavLink to="/findemail">이메일/비밀번호 재설정</NavLink>
              <NavLink to="/member">회원가입</NavLink>
            </InputWrapper>

            {/* <p>{error}</p> */}
        </SignUp>
      </Container>
    </>
  )
}

export default {Login}