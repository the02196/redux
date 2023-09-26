import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { toggleTheme } from '../store'


const ASide = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    border: 1px solid #ddd;
    background: ${({$isdark}) => ($isdark === 'light' ? "#fff" : "#333")};    
    border-radius: 5px;
    cursor: pointer;
    width: 50px; height: 50px;
    line-height: 50px; text-align: center;
    svg{
      color: ${({$isdark}) => ($isdark === 'light' ? "#000" : "#d9d9d9")};
    }
`

function Aside() {
  const theme = useSelector(state => state.dark);
  const dispatch = useDispatch(toggleTheme)
  return (
    <ASide $isdark={theme} onClick={()=>{dispatch(toggleTheme())}}>
        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} size="lg"/>
    </ASide>
  )
}

export default Aside