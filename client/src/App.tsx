import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import HomePage from "./pages/user/HomePage";
import CreatePost from "./pages/user/CreatePost";
import UserLoggedIn from "./middleware/User/UserLoggedIn";
import UserLoggedOut from "./middleware/User/UserLoggedOut";
import PageNotFound from "./pages/common/PageNotFound";
import { Toaster } from "react-hot-toast";
import UserPosts from "./pages/user/UserPosts";
import EditPost from "./pages/user/EditPost";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public routes (when user is logged out) */}
        <Route path="/" element={<UserLoggedOut />}>
          <Route index element={<HomePage/>} /> This handles the root path
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Protected routes (when user is logged in) */}
        <Route path="/" element={<UserLoggedIn />}>
          <Route path="homepage" element={<HomePage />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="myposts" element={<UserPosts />} />
          <Route path="editPost/:blogId" element={<EditPost />} />
        </Route>

        {/* Catch all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;