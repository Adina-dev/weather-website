import React, { useState} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../components/Functionality";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const success = () => {
    toast.dismiss();
    toast.success("Successfully logged in");
    navigate("/");
  };

  const notify = () => toast.error("Error while logging in");

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      success();
    } catch (error) {
      toast.dismiss();
      notify();
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const forgetpasswords = () => {
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.dismiss();
        toast.success("Email has been send Successfully");
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };


  return (
    <div className=" back-log">
      <div className="container text-center">
        <div className="row align-items-center justify-content-around">
          <div className="col-lg-5 col-md-8 col-11 my-5 ">
            <div className=" rounded py-4 shadow-lg ">
              <h1 className="text-light">LOGIN</h1>
              <input
                className="mt-3  w-75"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
              <br />
              <input
                className="mt-4  w-75"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required
              />
              <br />

              <button
                className="fw-bold w-75 mt-5 mb-4 border-0 py-2 rounded bg-secondary-subtle text-light-emphasis"
           
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <div className="text-center text-light-emphasis">
                    <div className="spinner-border load" role="status">
                      <span className="visually-hidden ">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <div className="text-end me-lg-5 me-4 me-md-5 pe-4 fs-5 ">
                <a
                   id="forget"
                   onClick={forgetpasswords}
                  className="text-light-emphasis"
                  href="#"
                >
                  Forget Password?
                </a>
              </div>
       
            </div>
            <div className=" fs-5 mt-5 text-light">
              You don't have an account?{" "}
              <a
                className="text-white link-offset-2 link-underline link-underline-opacity-0"
                href="/Signup"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
