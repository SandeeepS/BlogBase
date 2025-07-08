import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage/>}/> 
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
