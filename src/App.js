import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./components/Nav";
import store, { loggedIn } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./example/Example";
import Modal from "./components/Modal";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./pages/Modify";
import FindEmail from "./pages/FindEmail";



function App() {
	// console.log(process.env)
  // const light ={
  //   colors:{
  //     Primary :"orange",  
  //     Secondary:"orangered",
  //     BgColor:"#e9f1f6",
  //     Color: "#000",
  //     ContentBg :"#fff"
  //   }
  // }

  // const dark ={
  //   colors:{
  //     Primary:"#272929",
  //     Secondary:"#e9e9e9",
  //     BgColor:"#333",
  //     Color: "#e9e9e9",
  //     ContentBg :"#272929"
  //   }
  // }
  // const [themeConfig, setThemeConfig] = useState("light");
  // const DarkMode = themeConfig === "light" ? light : dark ;
  //여기서 light,dark는 위에 있는 함수의 컬러들을 받는것임
  // const ThemeSelect = () =>{
  //   setThemeConfig(themeConfig === "light" ? "dark" : "light")
  // }
 
  return (
   <>
    <Provider store={store}>
    	<Inner />
    </Provider>
   </>
  );
}
function Inner(){

  const light ={
    colors:{
      Primary :"orange",  
      Secondary:"orangered",
      BgColor:"#e9f1f6",
      Color: "#000",
      ContentBg :"#fff"
    }
  }

  const dark ={
    colors:{
      Primary:"#272929",
      Secondary:"#e9e9e9",
      BgColor:"#333",
      Color: "#e9e9e9",
      ContentBg :"#272929"
    }
  }
  const theme = useSelector(state => state.dark);
  const DarkMode = theme === "light" ? light : dark ;
  const userState = useSelector(state => state.user);
  console.log(userState);

  const dispatch =useDispatch();
  const uid = sessionStorage.getItem("users");
  console.log(uid);
  //0919-1
  //async를 사용하면 try,catch문을 반드시 써줘야함 국룰
  //try는 실패할수도있다 ~ catch는 오류가 뜨면~

  useEffect(()=>{
    const fetchUser = async () =>{
      if(!uid) return;
      const userDoc = doc(collection(getFirestore(),"users"),uid);
      console.log(userDoc)
      try{
        const docSnapshot = await getDoc(userDoc);
        console.log(docSnapshot);
        if(docSnapshot.exists()){
          const userData= docSnapshot.data();
          dispatch(loggedIn(userData)); 
          //로그인에서 로그아웃으로 바껴야하니깐 데이터를 불러옴
        }

      }catch(error){
        console.log(error)
      }
    }
    fetchUser();
  }, [dispatch, uid])

  // 대괄호 안에 변수값이 들어가면 변수가 바뀔떄마다 실행되는거고, 비어있다면 한번만 실행됨

    return(
    <ThemeProvider theme={DarkMode}>
      	<GlobalStyle/>
      	<Aside/> 
        <Nav userState={userState}/>
     	  <Routes>
       	     <Route path="/" element={<Main />}></Route>
       	     <Route path="/member" element={<Member />}></Route>
       	     <Route path="/login" element={<Login />}></Route>
       	     <Route path="/logout" element={<Logout />}></Route>
       	     <Route path="/example" element={<Example />}></Route>
       	     <Route path="/modal" element={<Modal />}></Route>
       	     <Route path="/modify" element={<Modify />}></Route>
       	     <Route path="/findemail" element={<FindEmail />}></Route>
      	</Routes>
    	</ThemeProvider>
    )

}

export default App;
