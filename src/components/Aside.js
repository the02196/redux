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
        background-color: ${({$isDark}) => ($isDark === 'light' ? "#fff" : "#333")};
        border-radius: 5px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        svg {
          color : ${({$isDark}) => ($isDark === 'light' ? "#333" : "#fff" )};
        }
    `

function Aside() {
  const theme = useSelector(state => state.dark);
  const dispatch = useDispatch();
  return (
    <ASide $isDark={theme} onClick={()=>{dispatch(toggleTheme())}}><FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} size="xl"/></ASide>
  )
}

export default Aside