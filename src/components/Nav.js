import { faArrowRightFromBracket, faLock, faUser,faChevronDown, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Mnav from './Mnav'
import { useSelector } from 'react-redux'


const NavContent = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  background-color: #fff;
  z-index: 40;

`
const NavWrap = styled.div`
 max-width: 1280px;
 margin: 0 auto;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 10px 2%;
`
const NavLogo = styled.div`
 img{width: 100%;}


`
const NavList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-basis:66.66667%;
    @media screen and (max-width:1024px){
        display: none;
    }
    ul{
        display: flex;
        justify-content: space-between;
        flex-basis: 100%;
        li{
            position: relative;
            flex-basis: 25%;
            text-align: center;
                a.active{ // NavLink 사용시 클릭하는 요소에 active가 되기때문에 active한 요소에 효과를 주고싶을때 적음 
                      font-weight: bold;
                     color:lightblue
                }
        }
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    transition: all 0.5s;
    font-size: 12px;
    vertical-align: baseline;
    transform: rotate(${({$isopen})=> $isopen === "true" ? "180deg" : "0"});

`
const NavSubMenu = styled.ul`
    position: absolute;
    background-color: rgb(30,41,59);
    transition: 0.5s; //세로가 auto이면 transition이 안됨.그래서 세로값을 지정해줘야함
    flex-wrap: wrap;
    text-align: center;
    height: ${({$isopen,$height}) => ($isopen === "true" ? $height : "0px")};
    //아래에서 선언된 $isopen,$height를 스타일 컴포넌트 안에서 이용하는 방법으로  $ 중괄호,소괄호,중괄호를 차례대로 입력한 후 화살표 함수를 사용해서 괄호 안에 또 조건을 적어주면 됨 
    overflow: hidden; 
    // height: 0; overflow: hidden; => 2개 같이 입력하면 화면에서 사라짐
    li{
        flex-basis: 100% !important;
        padding: 10px 0;
        a{
         color: #fff;
        }
    }
`

const NavMember = styled.div`
    ul{
        display: flex; column-gap: 20px; 
       a.active{
        font-weight: bold;
        color:lightblue
       }
        }
    @media screen and (max-width: 1024px){display: none;}
    
   
`
const Hamburger = styled.div`
 position: fixed;
 right: 16px;
 top: 24px;
 transition: all 1s;
 z-index: 50;
 cursor: pointer;
  > div{
    width: 30px; height: 2px; background-color: #000; border-radius: 4px; margin: 6px; transition: all 1s;
   }
   //props로 받아서 하는 방법도 해보기
   &.on div:nth-child(1){transform: rotate(45deg) translateY(12px);}
   &.on div:nth-child(2){opacity: 0; transform: translateX(-30px) rotate(720deg);}
   &.on div:nth-child(3){transform: rotate(-45deg) translateY(-12px);}
 @media screen and (min-width: 1024px){display: none;}
 @media screen and (max-width: 768px){right: 24px;}
`

const Container = styled.div`
    width: 320px;
    height: 100%;
    position: fixed;
    background-color: rgb(249,250,251); //#f9fafb -> 구글에 색상선택을 검색하면 rgb 코드를 #으로 바꿔줌
    right: ${({$isopen})=> $isopen ? "0px" :"-320px"}; // 일반적인 DOM 형태에서는 사용할 수 없고 스타일컴포넌트에서만 사용가능함(ul,li안에서는 사용불가능해서 따로 ul 스타일컴포넌트를 만들어줘서 사용해줘야함)
    top: 0;
    padding: 48px;
    box-sizing: border-box;
    z-index: 40; transition: all 0.5s;
    @media screen and (min-width: 1024px){display: none;}
        >ul{
            margin-top: 24px;
            >li{
                padding: 20px; border-bottom: 1px solid #ddd;
                font-weight: bold; cursor: pointer;
            }
        }

`
const Msubmenu = styled(NavSubMenu)`
    width: 100%;
    position: relative;
    background-color: transparent; // background:unset; background:none;
    text-align: left ;
        li{padding-left: 15px;
            a{color: #000;}
        }
`

const MsubmenuMember = styled(NavMember)` //styled 하고 괄호를 열면 괄호안에 있는 스타일컴포넌트를 사용하겠다는 의미임
    margin-top: 45px;
    ul{
        justify-content: center;
        li{
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
            background-color: purple;
            &:nth-child(2){
                background-color: green;
            }
            a{color: #fff;}
        }
    }
    @media screen and (max-width: 1024px){display: block;}
    
`




function Nav({userState}) {
    // const userState=useSelector(state => state.user); 
    // 1.Nav에 userState 변수 설정해주거나 2. App.js에서 userState를 props로 넘김
    const[isHeight,setIsHeight] = useState();
    
    const SubMenuHeight = (e) =>{
        const list = document.querySelectorAll(".sub_list")[e];
        const listLength = list.querySelectorAll("li").length;
        // console.log(listLength);
        const value = listLength * 43 +"px";
        console.log(value);
        return setIsHeight(value);
        
    }
    const[isActive2,setIsActive2] = useState(false);
    const[isActive,setIsActive] = useState(-1); //하나씩 나오게 할려면 false를 -1로 바꿔서 아래에 i로 바꿔줘야함
    
    const SubData ={
        company:[
            {
            title:"인사말",
            link:"/company/greetings"
            },
            {
            title:"연혁",
            link:"/company/history"
            },
            {
            title:"내부전경",
            link:"/company/interior"    
            },
            {
            title:"오시는길",
            link:"/company/directions"
            }
        ],
        business:[
            {
            title:"사업소개",
            link:"/business/business-1"
            },
            {   
            title:"사업소개2",
            link:"/business/business-2"
            },
            {
            title:"사업소개3",
            link:"/business/business-3"
            }
        ],
        product:[
            {
            title:"제품소개",
            link:"/product/product-1"
            },
            {
            title:"제품소개2",
            link:"/product/product-2"
            },
            {
            title:"제품소개3",
            link:"/product/product-3"
            }
        ],
        service:[
            {
            title:"공지사항",
            link:"/service/notice"
            },
            {
            title:"온라인 상담",
            link:"/service/online"
            },
            {
            title:"질문과 답변",
            link:"/service/qna"
            },
            {
            title:"갤러리",
            link:"/service/gallery"    
            }
        ]
    }
    //오브젝트 내에 배열 => 적을때는 변수명[문자열][인덱스번호].title


    // const SubMenu = [
    //     ["인사말","연혁","내부전경","오시는길"],
    //     ["사업소개","사업소개2","사업소개3"],
    //     ["제품소개","제품소개2","제품소개3"],
    //     ["공지사항","온라인 상담","질문과 답변","갤러리"]
    // ];

    // const SubMenuLink=[
    //     ["/company/greetings","/company/history","/company/interior","/company/directions"],
    //     ["/business/business-1","/business/business-2","/business/business-3"],
    //     ["/product/product-1","/product/product-2","/product/product-3"],
    //     ["/service/notice","/service/online","/service/qna","/service/gallery"]
    // ]
    // console.log(SubMenu.length); //배열로 저장해도 되고 데이터 제이슨 형태로 저장해도 됨 //콘솔창에 4라고 나옴
    
    // const Nav = [
    //     ["회사소개","사업소개","제품소개","고객센터"],
    //     ["/company","business","/product","/service"]
    // ]
    //배열안에 배열이 또 들어가는 거

    const Nav=[
        { 
            title:'회사소개',
            link:'company'
        },
        { 
            title:'사업소개',
            link:'business'
        },
        { 
            title:'제품소개',
            link:'product'
        },
        { 
            title:'고객센터',
            link:'service'
        }
    ] // 배열안에 객체 형태가 들어가는 거
    
    // let MaxLength =SubMenu.length;
    // for(let i =0 ; i < MaxLength; i ++){
        //     SubMenu[i].map((e,index)=>{
    //         return(
    //             console.log(e,index)
    //         )
    //     })
    // }
       
  return (
    <>
        <NavContent>
            <NavWrap>
                <NavLogo>
                    <NavLink to="/">
                        <img src="https://via.placeholder.com/120x60" alt="로고" />
                    </NavLink>
                </NavLogo>
                <NavList>
                    <ul>
                       {/* {
                        Nav[0].map((e,i)=>{ // 배열이 2개 들어가있으니깐 배열번호를 꼭 적어줘야함
                            return(
                                <li><NavLink to ={Nav[1][i]}>{e}</NavLink></li> 
                            )
                        })
                       } */}
                       {
                        Nav.map((e,i)=>{ 
                            return(
                                <li onMouseOver={()=>{
                                    setIsActive(i);
                                    SubMenuHeight(i);
                                   
                                }} onMouseOut={()=>{
                                    setIsActive(-1);
                                }} key={i}><NavLink to ={`/${e.link}`}>{e.title}</NavLink> <StyledIcon icon={faChevronDown} $isopen={isActive === i ?"true" : "false"} />
                                {/* Nav의 슬러쉬를 삭제해서 벡틱이랑 달러사용하기  */}
                                <NavSubMenu className={`sub_list`} $isopen={isActive ===  i ? "true" : "false"} $height={isHeight}>
                                    {/* 달러를 사용해서 속성이 안보이게 하기 위해서 */}
                                {/* style={{height: isActive === i && isHeight}} */}
                                    { 
                                    SubData[e.link].map((el,index)=>{ //[e.link] 하면 슬러쉬 삭제를 해야함 그래서 Nav에 있는 링크의 슬러쉬 없애주기
                                        return(
                                            <li key={index} ><NavLink to = {el.link}>{el.title}</NavLink> </li>
                                            //중괄호에 el.link, el.title로 변경하기
                                        )
                                    })
                                        
                                    }
                                </NavSubMenu>
                                </li>
                            )
                        })
                       }
                    </ul>
                </NavList>
                <NavMember>
                    <ul>
                        <li>
                            <NavLink to={userState.data?.nickname ? "/logout" : "/login"}>
                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                {userState.data?.nickname ? "로그아웃" : "로그인"}
                            </NavLink>
                        </li>
                            {
                                userState.data?.nickname ?
                                <li>
                                <NavLink to="/modify">
                                <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon>
                                 정보수정
                                </NavLink>
                                </li> 
                                :
                                <li>
                                <NavLink to="/member">
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                 회원가입
                                </NavLink>
                                </li> 

                            }
                    </ul>
                </NavMember>
            </NavWrap>
        </NavContent>
        {/* 모바일네비 */}
        <Hamburger className={isActive2 && "on"} onClick={()=>{setIsActive2(!isActive2)}}>
            {/* className={isActive2 === true ? "on" : " "} -> 위에랑 똑같은건데 코드만 줄여서 나타낸거임  */}
            { //반복하기 위해서 Array(3)으로 적음 -> 아무것도 없는 배열을 채워줌(undefined)
                Array(3).fill().map(( _ , i)=>{ //e를 쓸 일이 없을때 _라고 적음. 즉. i의 데이터만 필요할때 사용함 (실무) -> _적어도 에러가 안남 
                    return(
                        <div key={i} ></div>
                    )
                })
            }
        </Hamburger>
        <Container $isopen={isActive2}>
            <MsubmenuMember>
                 <ul>
                    <li>
                        <NavLink to={userState.data?.nickname ? "/logout" : "/login"}>
                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                            {userState.data?.nickname ? "로그아웃" : "로그인"}
                            {/* ? 문법: loggedIn의 값이 없더라도 에러를 방지하는 코드임(에러방지코드라고 생각하면 됨) */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/member">
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                            회원가입
                        </NavLink>
                    </li> 
                </ul>
            </MsubmenuMember>
                <ul>
                {
                 Nav.map((e,i)=>{
                    return(
                        <li key={i} onClick={()=>{
                            SubMenuHeight(i); //여기에 추가로 함수를 더 실행할려면 세미콜론을 붙여줘야함
                            (isActive !==i ? setIsActive(i): setIsActive(-1));
                            //삼항연산자를 사용하면 참,거짓일때 값 2개가 생기고 &&만 적으면 참일때의 값만 있음

                        }}>{e.title}
                           <Msubmenu className='sub_list' $isopen ={isActive === i ? "true" :"false"} $height ={isHeight} >
                                {
                                    SubData[e.link].map((el,index)=>{
                                        return(
                                            <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                                        )
                                    })
                                }
                           </Msubmenu>
                        </li>
                        )
                    })
                }
                </ul>
        </Container>
        
        {/* 모바일네비 */}
    </>
  )
}

export default Nav