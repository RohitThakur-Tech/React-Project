import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function checkUser() {
    try {
      axios
        .post("http://localhost:9599/login", form)
        .then((d) => {
          alert(d.data.message);
          localStorage.setItem("id", d.data.id);
          localStorage.setItem("role", d.data.role);
          if (d.data.role == "admin") navigate(ROUTES.universityAdmin.name);
          else navigate(ROUTES.home.name);
        })
        .catch((e) => {
          alert("Wrong Username/Password");
        });
    } catch (error) {
      alert("Unable to Login the user");
    }
  }

  // function checkUser() {
  //   try {
  //     axios
  //       .post("http://localhost:9995/login", form)
  //       .then((response) => {
  //         alert(
  //           `Login successful! UserID: ${response.data.id}, Role: ${response.data.role}`
  //         );
  //         navigate(ROUTES.home.name);
  //       })
  //       .catch((error) => {
  //         if (
  //           error.response &&
  //           error.response.data &&
  //           error.response.data.message
  //         ) {
  //           alert(error.response.data.message); // Display the error message from the server
  //         } else {
  //           alert("Something Went Wrong");
  //         }
  //       });
  //   } catch (error) {
  //     alert("Unable to Login");
  //   }
  // }

  function onUserSubmit() {
    let errors = false;
    let error = {
      email: "",
      password: "",
    };
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Enter your registered email-id" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Enter your password" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      checkUser();
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header bg-success text-black">Login</div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Email-ID</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email-id"
                      onChange={changeHandler}
                      name="email"
                    />
                    <p className="text-danger">{formError.email}</p>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-4 col-form-label">Password</label>
                  <div className="col-lg-8">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={changeHandler}
                      name="password"
                    />
                    <p className="text-danger">{formError.password}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button onClick={onUserSubmit} className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
