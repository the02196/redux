import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../store'
import Product from './Product'
import { useMemo } from 'react'
import Banner from '../components/Home/Banner'

const Test = () => {
  return console.log("계속 실행 됨")
}

function Main() {

  const result = useMemo(()=>{
    return Test()
  },[])

  useEffect(()=>{
    console.log("완료")
    return ()=>{
      console.log("완료가 되기 전 실행 됨")
    }
  },[])
  let [count, setCount] = useState(0);

  // ? 마운트와 언마운트

  /*

    언마운트는 "페이지를 이탈했을 때" 가 언마운트다.
    마운트는 "로딩이 딱 되었을 때!" 가 마운트다.

    이탈한 페이지의 요소들이 사라지는 순간이 언마운트.
    연 페이지의 요소들이 모두 생성되었을 때 마운트.
    
    * 가상돔 처리 이후 돔에 반영되는 시점에 대해 이해하면 이해가 더 쉬울 것.
  
  */


  // ? useMemo

  /*

    useEffect 는 마운트 "되었을 때" 실행되고 
    useMemo는 마운트 되기 "직전에" 실행된다.

  */


  // ? useEffect

  /* 

    "마운트"가 되었을 때 실행되고, "업데이트"가 되었을 때, 실행된다.
    아래 setCount 누르면 재렌더링이 되면서 useEffect가 계속 다시 실행된다.
    이 경우 한 번만 실행 시키고 싶다면,
    
    todo         useEffect(()=>{
                        .....code......
    todo         },[])
    
    이렇게 대괄호를 넣어 줘서, 업데이트를 중단 해야한다.
    
    만약 '언마운트' 될 때, 실행하고 싶은 코드가 있다면 
    아래와 같이 리턴을 걸어주면 된다.
    
          useEffect(()=>{
              console.log("완료")
    todo          return ()=>{
    todo              console.log("완료가 되기 전 실행 됨")
    todo          }
          },[])

  */

  return (
    <>
      <Banner />
    </>
  )
}

export default Main