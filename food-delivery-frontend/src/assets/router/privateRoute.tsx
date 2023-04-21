import { AsyncLocalStorage } from "async_hooks";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../../store/store";

const PrivateRoute = ()=>{
  const isLogged: boolean = useSelector((state: RootState) => state.auth.isLogged);
  const isReallyLogged = localStorage.getItem("isLogged")
  return(
    isReallyLogged ? <Outlet/> : <Navigate to="login" />
  )
}

export default PrivateRoute 
