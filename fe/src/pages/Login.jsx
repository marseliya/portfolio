import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/auth";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleLogin = (e) => {

        e.preventDefault();

        const success = login(
            form.username,
            form.password
        );
        
        if(success){
        
            navigate("/admin/dashboard");
        
        }else{
        
            alert("Username / Password salah");
        
        }
    };

    return (

        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div
                className="card shadow p-4"
                style={{ width: "400px" }}
            >

                <h3 className="text-center mb-4">

                    Admin Login

                </h3>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">

                            Username

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;