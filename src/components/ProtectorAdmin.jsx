import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({ isAdmin }) => {
  //si no soy admin
  if (!isAdmin) {
    return <Navigate to={"/"}></Navigate>;
  }
  //si soy admin
   return <Outlet></Outlet>;
};

export default ProtectorAdmin;
