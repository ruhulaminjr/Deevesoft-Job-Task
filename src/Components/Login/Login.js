import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = memo(() => {
  const [newUser, setIsNewUser] = useState(true);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { error, singInUserWithEmail, singupUserWithEmail, googleLogin } =
    useAuth();
  const onSubmit = (data) => {
    if (newUser) {
      singInUserWithEmail(data.email, data.password, navigate);
    } else {
      singupUserWithEmail(data.email, data.password, navigate);
    }
  };
  return (
    <div>
      <div className="center">
        {newUser ? <h1>Login</h1> : <h1>Register</h1>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="txt_field">
            <input type="email" required {...register("email")} />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              minLength={6}
              {...register("password")}
            />
            <span></span>
            <label>Password</label>
          </div>
          {error && <div className="error">{error.message}</div>}

          {newUser ? (
            <input type="submit" value="Login" />
          ) : (
            <input type="submit" value="Register" />
          )}
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="g-login" onClick={() => googleLogin(navigate)}>
            Login With Google
          </button>
        </div>
        {newUser ? (
          <div className="signup_link">
            New User?{" "}
            <button onClick={() => setIsNewUser(!newUser)}>Signup</button>
          </div>
        ) : (
          <div className="signup_link">
            Existing User?{" "}
            <button onClick={() => setIsNewUser(!newUser)}>SignIn</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Login;
