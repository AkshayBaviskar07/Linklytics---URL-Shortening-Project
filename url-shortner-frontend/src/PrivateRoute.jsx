import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";

export default function PrivateRoute({ children, publicPage }) {
  const { token } = useStoreContext();

  /* console.log("PrivateRoute Check:", { publicPage, token, type: typeof token }); */

  const isAuthenticated = token && token !== "null" && token !== "undefined";

  if (publicPage) {
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  }

  return !isAuthenticated ? <Navigate to="/login" /> : children;
}