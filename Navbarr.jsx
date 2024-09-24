import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../components/Functionality";
import { toast } from "react-hot-toast";

const auth = getAuth(app);

const Navbarr = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setLoading(false);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  $(".navbar-collapse a").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have been logged out");
    } catch (error) {}
  };

  return (
    <nav className="navbar navbar-expand-lg py-3 back-nav navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          <span className="me-2 ms-3">
            <i className="bi bi-clouds-fill "></i>
          </span>
          Weather
        </Link>

        <button
          className="navbar-toggler me-4"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user === null ? (
              <>
                <li className="nav-item fw-bold ms-3">
                  <Link className="nav-link js- text-white" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item fw-bold ms-3">
                  <Link className="nav-link text-white" to="/Signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item fw-bold ms-3 ">
                <Link
                  onClick={handleLogout}
                  className="nav-link text-white"
                  disabled={loading}
                >
                  {" "}
                  <span className="text-white me-2">
                    <i className="bi bi-box-arrow-left"></i>
                  </span>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
