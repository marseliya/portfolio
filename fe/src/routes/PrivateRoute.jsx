import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../service/auth";

function PrivateRoute({ children }) {

    if(!isAuthenticated()){

        return <Navigate to="/admin"/>
    
    }
    
    return children;
}

export default PrivateRoute;