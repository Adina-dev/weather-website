import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../components/Functionality";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const navigate = useNavigate();


  const createUser = () => {
    try {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          toast.dismiss();
           toast.success("Successfully registered");
          navigate("/");
        
        })
        .catch((error) => {
          toast.dismiss();
           toast.error(" oops! wrong data");
        });
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
 
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("User signed in successfully");
        toast.dismiss();
        navigate("/");
      })
      .catch((error) =>{
        toast.error("Something went wrong");
        toast.dismiss();
      });

  };

  return (
    <div className="back-sign">
      <div className="container text-center">
        <div className="row align-items-center justify-content-around">
          <div className="col-lg-5 col-md-9 col-sm-9 col-11 mt-3 shadow">
            <div className="  rounded py-4">
              <h1 className="text-light">SIGNUP</h1>
              <input
                className="mt-3 w-75"
                type="text"
                placeholder="Enter your Full name"
                required
              />
              <input
                className="mt-4 w-75"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your Email"
                required
              />
              <br />
              <input
                className="mt-4 w-75"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
              />

              <div className="px-5 mt-4">
                <span className="text-black-50">
                  By sigining up, you you agree to the term of services and
                  privacy policy
                </span>
              </div>

            
                <div>
                  <button
                    onClick={createUser}
                    className="fw-bold w-75 mt-4 mb-4 py-2 rounded bg-secondary-subtle text-light-emphasis border-0"
                    disabled={loading}
                  >
                      {loading ? (
                  <div className="text-center text-light-emphasis">
                    <div className="spinner-border load" role="status">
                      <span className="visually-hidden ">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Create an account"
                )}
                  </button>
                </div>
              
                <div>
                  <a
                    className="fw-bold text-light-emphasis"
                    href="#"
                    onClick={signUpWithGoogle}
                  >
                    <i className="bi bi-google icn"></i> Signup with google
                  </a>
                </div>
            
            </div>
          </div>
          <div className="mt-lg-5 mt-sm-5 mt-md-5 mt-2 mb-4 fs-5 text-light">
            Already have an account ?{" "}
            <a
              className="text-white link-offset-2 link-underline link-underline-opacity-0"
              href="/Login"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
