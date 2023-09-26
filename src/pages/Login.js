import React, { useState } from 'react'
import styled from 'styled-components'
import {firebaseAuth, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup} from './../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, loggedIn } from './../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

// import {useHistory} from 'react-router-dom';



const Container = styled.div`
    display: flex;
    background-color: #f5f5f5;
    justify-content: center;
    height: calc(100vh - 86px);
    align-items: center;
`
const SignUp = styled.div`
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
const Title = styled.h1`
    font-size: 24px;
    text-align: center; margin-bottom: 20px;
`
const Input = styled.input`
    width: 100%; padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px; box-sizing: border-box;
    padding-left: 45px;
    transition: border-color 0.4s;
    &:focus{
        border-color: #007bff;
        outline: none;
    }
    &::placeholder{opacity: 0;}
`
const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    &:last-child{
        margin-bottom: 0; margin-top: 20px;
        justify-content: flex-end;
        display: flex;
        column-gap: 20px;
        a{
            background-color: #40e0d0;
            font-size: 14px;
            text-align: center; padding: 5px 20px;
            border-radius: 5px;
            color: #fff;
            &:last-child{
                background-color: #036;
            }
        }
    }
    input:focus + label,
    input:not(:placeholder-shown) + label{
        top: 4px;
        left: 4px;
        font-size: 8px;
        color: #007bff;
    }
`
const Label = styled.label`
    position: absolute;
    top: 10px; left: 10px;
    font-size: 14px; color: #999;
    transition: all 0.3s;
    pointer-events: none;
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: #007bff;
    border: none;
    color: #fff; cursor: pointer;
`

const SnsButton = styled.button`
    display: flex;
    align-items: center;
    padding: 8px 12px; 
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${props => props.$bgColor || "gray"};
    color: ${props => props.сolor || "white"};
    font-size: 16px;
    width: 50%;
    transition: 0.3s;
    &:hover{
        background-color: ${props => props.$hoverBgGolor || "#666"}
    }
    svg{
        margin-right: 8px;
    }
`

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    // const history = useHistory();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    console.log(userState);

    const errorMsg = (errorCode) =>{
        const firebaseError = {
            'auth/user-not-found' : "이메일 혹은 비밀번호가 잘못 되었습니다.",
            'auth/wrong-password' : "이메일 혹은 비밀번호가 잘못 되었습니다.",
            'auth/invalid-email' : "이메일 혹은 비밀번호가 잘못 되었습니다."
        }
        return firebaseError[errorCode] || '알 수 없는 에러가 발생했습니다.'
    }

    const LoginForm = async (e) =>{
        e.preventDefault();
        try{
            const userLogin = await signInWithEmailAndPassword(firebaseAuth, email, password)
            // console.log(userLogin)
            const user = userLogin.user;
            console.log(user)
            sessionStorage.setItem("users", user.uid)
            dispatch(logIn(user.uid));

            const userDoc = doc(collection(getFirestore(), "users"), user.uid);
            const userDocSnapshot = await getDoc(userDoc)
            if(userDocSnapshot.exists()){
                const userData = userDocSnapshot.data();
                console.log(userData)
                dispatch(loggedIn(userData));
                navigate(-1);
            }
        }catch(error){
            setError(errorMsg(error.code));
            console.log(error.code)
        }
    }

    const snsLogin = async (data) => {
        let provider;

        switch(data){
            case 'google' :
                provider = new GoogleAuthProvider();
            break;
            case 'github':
                provider = new GithubAuthProvider();
            break;
            default:
                return;
        }
        try{
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;
            console.log(user)
            sessionStorage.setItem("users", user.uid)
            dispatch(logIn(user.uid))

            navigate("/member", {
                state: {
                    nickname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })
        }
        catch(error){
            setError(errorMsg(error));
            console.log(error)
        }
    }


  return (
    <>
        <Container>
            <SignUp>
                <Title>로그인</Title>
                {email} {password}
                <form onSubmit={LoginForm}>
                    <InputWrapper>
                        <Input type="email" className='email' placeholder='이메일' onChange={(e)=>{
                            setEmail(e.target.value)
                        }} required />
                        <Label>이메일</Label>
                    </InputWrapper>
                    <InputWrapper>
                        <Input type="password" className='password' placeholder='비밀번호' onChange={(e)=>{
                            setPassword(e.target.value)
                        }} required />
                        <Label>패스워드</Label>
                    </InputWrapper>
                    <Button>로그인</Button>
                </form>
                <InputWrapper>
                    <NavLink to="/findemail">이메일/비밀번호 재설정</NavLink>
                    <NavLink to="/member">회원가입</NavLink>
                </InputWrapper>
                <InputWrapper>
                        <SnsButton onClick={()=>{snsLogin('google')}} $bgColor="#dd4437" $hoverBgColor="#b33225">
                            <FontAwesomeIcon  icon={faGoogle} />Login With Google
                        </SnsButton>
                        <SnsButton onClick={()=>{snsLogin('github')}} $bgColor="#333" $hoverBgColor="#111">
                            <FontAwesomeIcon icon={faGithub} />Login With Github
                        </SnsButton>
                </InputWrapper>
            </SignUp>
        </Container>
    </>
  )
}

export default Login