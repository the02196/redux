import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main.js";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./components/Nav";
import store, { toggleTheme } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";

function App() {

  console.log(process.env)

  return (
    <>
      <Provider store={store}>
        <Inner />
      </Provider>
    </>
  );
}

function Inner() {
  const light = {
    colors: {
      Primary: "orange",
      Secondary: "black",
      BgColor: "#e9f1f6",
      Color: "#000",
      Content: "#fff",
    },
  };

  const dark = {
    colors: {
      Primary: "#272929",
      Secondary: "white",
      BgColor: "#333",
      Color: "#e9e9e9",
      ContentBg: "#272929",
    },
  };

  const theme = useSelector((state) => state.dark);
  const DarkMode = theme === "light" ? light : dark;

  return (
    <ThemeProvider theme={DarkMode}>
      <GlobalStyle />
      <Aside />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="member" element={<Member />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
