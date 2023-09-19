import React, { useState } from 'react'
import styled from 'styled-components'
import { createUserWithEmailAndPassword, firebaseAuth } from './../firebase'
import {doc, setDoc, getFirestore, getDoc, collection} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, loggedIn } from '../store';
//사용하는 이유? 


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
// input에는 before,after가 안 먹음
// 비밀번호를 보이게 할려면 눈모양을 사용해서..
const Password = styled.div`
position: relative;
width: 100%;
 svg{
  position: absolute;
  right: 10px;
  top: 12.5px;
  cursor: pointer;
 }
`
const ModalBackground =styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 999;
  display: flex; justify-content: center; align-items: center;
`
const ModalContent =styled.div`
 flex-basis: 360px;
 background-color: #f7fcfc;
 padding: 60px 20px 40px;
 border-radius: 8px;
 display: flex;
 justify-content: center;
 flex-wrap: wrap;
 >svg{
  flex-basis: 100%;
  font-size: 80px;
  color:red;

 }
 >p{
  font-size: 16px;
  font-weight: bold;
  margin:24px 0;

 }

`



function Member() {
  
  
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[passwordConfirm,setPasswordConfirm] = useState("");
  const[nickname,setNickname] = useState("");
  const[phoneNumber,setPhoneNumber] = useState("");
  const[error,setError] = useState("");
  const[eye,setEye]=useState([0,0]); //눈이 2개라서 배열에 한번에 담기 위해서 ..
  const navigate = useNavigate();
  const[isModal,setIsModal]= useState(false);
  //삼항연산자를 사용할려면 항상 useState에 값을 저장해둬야함
  const dispatch= useDispatch();
 
  const toggelEye = (index) =>{
    const newEye =[...eye]; 
    //원래 있던 eye의 배열값을 복사해 배열을 벗긴다. 
    //[[0,0]]> []  없애는게 ... 표현 > 다시 말해서 같은값이 복사가 된다.
    newEye[index] = !newEye[index]; 
    // eye를 첫번째를 클릭했다면 newEye[0] = 부정 즉 false > true 로 변경된다. [1,0] 
    setEye(newEye);
    //그리고 그 값을 쓰기전용인 setEye에 새로운 배열값을 저장한다.
  }

  const PhoneNumber = (e) =>{
    let value = e.target.value;
    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g,"");
 
      return setPhoneNumber(value); 
     
  }
  const errorMsg = (errorCode) =>{
    const firebaseError= {
      'auth/admin-restricted-operation' :"빈 데이터가 있다.",
      'auth/email-already-in-use' :"이미 사용중인 이메일 주소",
      'auth/invalid-email':"유효하지 않은 이메일 주소",
      'auth/operation-not-allowed' :"이메일/비밀번호 계정이 비활성화 되어있습니다. ",
      'auth/weak-password':"너무 짧은 비밀번호를 사용하였습니다.(6자리)",
      'invalid-argument' :'빈 데이터가 있다.' //데이터베이스와 에러메세지 두개를 동시에 사용하기 때문에 이름,닉네임,번호중에 하나라도 누락되면 invaild-argument 라고 뜸
    }
    return firebaseError[errorCode] || "알 수 없는 에러가 발생하였습니다."
  }
//데이터가 다 비어있으면 튕궈내야함

  const isValidPhone = (phoneNumber) =>{ //phone 대신 e라고 써도 됨
    const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/
    return regex.test(phoneNumber);
    //test는 정규식코드에 일치하는 코드가 있는지 확인하는것 => true or false 로 값이 나옴(전화번호 유효성 검사 페이지 참조하기!)
  }
  const isValidEmail = (email) =>{
    const regex =/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    return regex.test(email);
  }
  
  const signUp = async (e) =>{
    e.preventDefault();
    let errorMessage ="";

  if(name.length===0){
    errorMessage="이름";
  }else if(nickname.length === 0){
    errorMessage="닉네임";
  }else if(!isValidPhone(phoneNumber)){
    setError("유효한 전화번호를 입력해주세요.")
    setIsModal(!isModal)
    return;
  }else if(!isValidEmail(email)){
    setError("유효한 이메일 주소를 입력해주세요.")
    setIsModal(!isModal) //isModal을 true로 바꾸고 return 해야함!!
    return;
  }else if(password.length === 0){
    errorMessage = "비밀번호";
  }else if(passwordConfirm.length === 0){
    errorMessage="비밀번호 확인"
  }else if(password !== passwordConfirm){
    setError("비밀번호가 일치하지 않습니다.");
    setIsModal(!isModal)
    return;
  }
  

  if(errorMessage){
    setError(errorMessage + "이(가) 비어 있습니다.")
    //length가 숫자보다 작고 숫자보다 크다면 해서 조건걸어서 만들수도 있음
    setIsModal(!isModal)
    return;
  }
  
  
    try{
      const {user} = await createUserWithEmailAndPassword(firebaseAuth, email, password)

      const userProfile = {
        name,
        nickname,
        phoneNumber, //0919-1
        email
      }
      await setDoc(doc(getFirestore(), "users",user.uid), userProfile);
      //0919-1
      sessionStorage.setItem("users",user.uid); //로그인 유지가 되어야하니깐
      dispatch(logIn(user.uid)); //logIn import 해주기
     
      alert("회원가입이 완료 되었습니다.");
      navigate("/");
      


      //회원가입 완료시 알림창이 뜨고 메인페이지로 이동하게 됨!!!
      
      
    }catch(error){
      setError(errorMsg(error.code));
      setIsModal(!isModal); 
      console.log(error.code);
      
    }
  }

  const userState = useSelector(state => state.user);
  console.log(userState);

  return (
    <>
    {
      isModal &&
      <Modal error={error} onClose={()=>{setIsModal(false)}}/> 
      //내가 한거 error={error} isModal={isModal} setIsModal={setIsModal}
      //모달창을 닫는값만 보내주면 되니깐 false값만 보내주는거임
      //값이 있거나 참일때만 모달창을 보여준다는 의미임(display:none의 의미가 아님 => 많이 쓰이니깐 잘 알아놓기!)
      
    // <ModalBackground> 
    //   {/* modal을 컴포넌트로 만드느것도 좋을거 같음 => 다른데도 사용해야하닊나 */}
    //   <ModalContent>
    //     <FontAwesomeIcon icon={faTriangleExclamation}/>
    //     <p>{error}</p>
    //     <Button onClick={()=>{setIsModal(!isModal)}}>확인</Button>
    //   </ModalContent>
    // </ModalBackground>
    }
    {
      userState.loggedIn ?  <Modal error="이미 로그인 중입니다." onClose={()=> navigate("/")}/> :
      
      
      <Container>
        <SignUp>
          <Title>회원가입</Title>
          <Input value={name} onChange={(e) => {setName(e.target.value)}} type='text' className='name' placeholder='이름' />
          <Input value={nickname} onChange={(e) => {setNickname(e.target.value)}} type='text' className='nickname' placeholder='닉네임' />
          <Input onInput={PhoneNumber} type='text' className='phone' placeholder='전화번호' maxLength={13}/>
          <Input type='email' className='email' placeholder='이메일' onChange={(e) => {setEmail(e.target.value)}} />
          <Password>
          <Input type={eye[0] ? "text" : "password"}  className='password' placeholder='비밀번호'  onChange={(e) => {setPassword(e.target.value)}} />
          <FontAwesomeIcon icon={eye[0] ?faEye : faEyeSlash} onClick={()=>{
          toggelEye(0)}}/>
          </Password>
          <Password>
          <Input type={eye[1] ? "text" : "password"} className='confirm_password' placeholder='비밀번호 확인' onChange={(e) => {setPasswordConfirm(e.target.value)}}/>
          <FontAwesomeIcon icon={eye[1] ?faEye : faEyeSlash} onClick={()=>{
          toggelEye(1)}}/>
          </Password>
            <Button onClick={signUp}>가입</Button>
            <p>{error}</p>
        </SignUp>
      </Container>

    }
      
      
    </>
  )
}

export default Member