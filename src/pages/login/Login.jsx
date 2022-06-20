import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Tamnotsocial</h3>
                    <span className="loginDesc">Tam all around the world</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                            ref={email}
                            required
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            className="loginInput"
                            ref={password}
                            minLength="6"
                            required
                        />
                        <button
                            className="loginButton"
                            type="submit"
                            disabled={isFetching}
                        >
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <span className="loginForgot">Forgot password ?</span>
                        <Link to="/register" >
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                "Sign up"
                            )}
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
