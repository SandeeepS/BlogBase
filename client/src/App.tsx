import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import HomePage from "./pages/user/HomePage";
import CreatePost from "./pages/user/CreatePost";
import UserLoggedIn from "./middleware/User/UserLoggedIn";
import UserLoggedOut from "./middleware/User/UserLoggedOut";
import PageNotFound from "./pages/common/PageNotFound";
// import UserLayout from "./pages/user/UserLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="" element={<UserLoggedOut />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Route>

        <Route path="/" element={<UserLoggedIn />}>
          {/* <Route path="/" element={<UserLayout />}> */}
            <Route path="user/homepage" element={<HomePage />} />
            <Route path="/createpost" element={<CreatePost />} />
          {/* </Route> */}
        </Route>
        <Route path={"*"} element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
