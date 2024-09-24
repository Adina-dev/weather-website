import React from "react";
import { Link } from "react-router-dom";

const Errorfound = () => {
  return (
    <div>
      <div className="container text-center">
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-lg-5">
            <h1>Page not found! 404</h1>
            <Link to="/">Go back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errorfound;
