// import React, { useState } from "react";
// import Header from "../../components/Header";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ROUTES from "../../navigations/Routes";

// function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [formError, setFormError] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const changeHandler = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   function saveUser() {
//     try {
//       axios
//         .post("http://localhost:9599/register", form)
//         .then((d) => {
//           alert(d.data.message);
//           navigate(ROUTES.login.name);
//         })
//         .catch((e) => {
//           alert("Something Went Wrong");
//         });
//     } catch (error) {
//       alert("Unable to register data");
//     }
//   }

//   function onUserSubmit() {
//     let errors = false;
//     let error = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };
//     if (form.firstName.trim().length == 0) {
//       errors = true;
//       error = { ...error, firstName: "Enter your first name" };
//     }
//     if (form.lastName.trim().length == 0) {
//       errors = true;
//       error = { ...error, lastName: "Enter your last name" };
//     }
//     if (form.email.trim().length == 0) {
//       errors = true;
//       error = { ...error, email: "Enter your email id" };
//     }
//     if (form.password.trim().length == 0) {
//       errors = true;
//       error = { ...error, password: "Enter your password" };
//     }
//     if (form.confirmPassword.trim().length == 0) {
//       errors = true;
//       error = { ...error, confirmPassword: "Enter your password again" };
//     }
//     if (form.password != form.confirmPassword) {
//       errors = true;
//       error = {
//         ...error,
//         password: "Password and confirm password suppose to be same",
//       };
//     }
//     if (!(form.password.length >= 6 && form.password.length <= 12)) {
//       errors = true;
//       error = {
//         ...error,
//         password: "Password length should be between 6 to 12 words",
//       };
//     }
//     if (errors) setFormError(error);
//     else {
//       setFormError(error);
//       saveUser();
//     }
//   }

//   return (
//     <div>
//       <Header />
//       <div className="row m-2">
//         <div class="card text-center mx-auto">
//           <div class="card-header bg-info text-white">New User</div>
//           <div class="card-body">
//             <div className="form-group row">
//               <label for="txtFName" className="col-sm-4">
//                 First Name
//               </label>
//               <div className="col-sm-8">
//                 <input
//                   type="text"
//                   placeholder="Enter Your first name"
//                   className="form-control"
//                   id="txtFName"
//                   onChange={changeHandler}
//                 />
//                 <p className="text-danger">{formError.firstName}</p>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label for="txtLName" className="col-sm-4">
//                 Last Name
//               </label>
//               <div className="col-sm-8">
//                 <input
//                   type="text"
//                   placeholder="Enter Your last name"
//                   className="form-control"
//                   id="txtLName"
//                   onChange={changeHandler}
//                 />
//                 <p className="text-danger">{formError.lastName}</p>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label for="txtEmail" className="col-sm-4">
//                 User Email
//               </label>
//               <div className="col-sm-8">
//                 <input
//                   type="email"
//                   placeholder="Enter Your Email Id"
//                   className="form-control"
//                   id="txtEmail"
//                   onChange={changeHandler}
//                 />
//                 <p className="text-danger">{formError.email}</p>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label for="txtPassword" className="col-sm-4">
//                 Password
//               </label>
//               <div className="col-sm-8">
//                 <input
//                   type="password"
//                   placeholder="Enter Your Password"
//                   className="form-control"
//                   id="txtPassword"
//                   onChange={changeHandler}
//                 />
//                 <p className="text-danger">{formError.password}</p>
//               </div>
//             </div>

//             <div className="form-group row">
//               <label for="txtCPassword" className="col-sm-4">
//                 Confirm Password
//               </label>
//               <div className="col-sm-8">
//                 <input
//                   type="password"
//                   placeholder="Enter Your Confirm Password"
//                   className="form-control"
//                   id="txtCPassword"
//                   onChange={changeHandler}
//                 />
//                 <p className="text-danger">{formError.confirmPassword}</p>
//               </div>
//             </div>
//           </div>
//           <div class="card-footer text-muted">
//             <button onClick={onUserSubmit} className="btn btn-primary">
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Register;

import React, { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../navigations/Routes";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function saveUser() {
    try {
      axios
        .post("http://localhost:9599/register", form) // Updated URL
        .then((response) => {
          alert(response.data.message);
          navigate(ROUTES.login.name);
        })
        .catch((error) => {
          alert("Something Went Wrong");
        });
    } catch (error) {
      alert("Unable to register data");
    }
  }

  function onUserSubmit() {
    let errors = false;
    let error = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (form.firstName.trim().length == 0) {
      errors = true;
      error = { ...error, firstName: "Enter your first name" };
    }
    if (form.lastName.trim().length == 0) {
      errors = true;
      error = { ...error, lastName: "Enter your last name" };
    }
    if (form.email.trim().length == 0) {
      errors = true;
      error = { ...error, email: "Enter your email id" };
    }
    if (form.password.trim().length == 0) {
      errors = true;
      error = { ...error, password: "Enter your password" };
    }
    if (form.confirmPassword.trim().length == 0) {
      errors = true;
      error = { ...error, confirmPassword: "Enter your password again" };
    }
    if (form.password != form.confirmPassword) {
      errors = true;
      error = {
        ...error,
        password: "Password and confirm password should be the same",
      };
    }
    if (!(form.password.length >= 6 && form.password.length <= 12)) {
      errors = true;
      error = {
        ...error,
        password: "Password length should be between 6 to 12 words",
      };
    }

    if (errors) setFormError(error);
    else {
      setFormError(error);
      saveUser();
    }
  }

  return (
    <div>
      <Header />
      <div className="row m-2">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">New User</div>

          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="txtFName" className="col-sm-4">
                First Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  placeholder="Enter Your first name"
                  className="form-control"
                  id="txtFName"
                  onChange={changeHandler}
                  name="firstName"
                />
                <p className="text-danger">{formError.firstName}</p>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="txtLName" className="col-sm-4">
                Last Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  placeholder="Enter Your last name"
                  className="form-control"
                  id="txtLName"
                  onChange={changeHandler}
                  name="lastName"
                />
                <p className="text-danger">{formError.lastName}</p>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="txtEmail" className="col-sm-4">
                User Email
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  placeholder="Enter Your Email Id"
                  className="form-control"
                  id="txtEmail"
                  onChange={changeHandler}
                  name="email"
                />
                <p className="text-danger">{formError.email}</p>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="txtPassword" className="col-sm-4">
                Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  id="txtPassword"
                  onChange={changeHandler}
                  name="password"
                />
                <p className="text-danger">{formError.password}</p>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="txtCPassword" className="col-sm-4">
                Confirm Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  placeholder="Enter Your Confirm Password"
                  className="form-control"
                  id="txtCPassword"
                  onChange={changeHandler}
                  name="confirmPassword"
                />
                <p className="text-danger">{formError.confirmPassword}</p>
              </div>
            </div>

            {/* Add the rest of the form inputs here if needed */}
          </div>

          <div className="card-footer text-muted">
            <button onClick={onUserSubmit} className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
