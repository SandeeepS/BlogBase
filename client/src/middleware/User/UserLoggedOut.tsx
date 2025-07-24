import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/store";

const UserLoggedOut = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  console.log("userData from the UserLoggedOut is ", userData);

  if (userData) {
    return <Navigate to="/homepage" replace />;
  } else {
    return <Outlet />;
  }
};

export default UserLoggedOut;
