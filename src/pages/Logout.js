import React, { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { logOut } from '../store'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../firebase' //로그아웃이 된 다음 메인페이지로 가기 위해서
import Modal from '../components/Modal'




function Logout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [isModal,setIsModal]=useState(true);

    signOut(firebaseAuth)
    .then(()=>{
        dispatch(logOut()); 
        // navigate("/logout"); //로그아웃 클릭하면 메인화면으로 가기 위해서
        sessionStorage.removeItem("users") //세션 스토리지에 있는 데이터를 지울려고
        
    })
    .catch((error)=>{
        console.log(error);
    })

  return (
    <>
    {
        isModal &&
        <Modal error ="로그아웃 되었습니다." onClose={()=>{setIsModal(false); navigate("/")}} > 
        {/* 다른 컴포넌트에서는 직접적으로 onclick을 사용할 수 없음 */}
        </Modal>

    }
        
    </>
  )
}

export default Logout