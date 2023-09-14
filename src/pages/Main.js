import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../store';


function Main() {

  const dispatch = useDispatch()

  const a = useSelector(state => state.user)
  return (
    <>
      <p>{a}</p>
      <button onClick={()=>{dispatch(changeName())}}>변경</button>
    </>
  )
}

export default Main