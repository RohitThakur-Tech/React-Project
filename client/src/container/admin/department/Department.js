import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
// import { get } from 'mongoose';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Department() {
  const queryParams = useQuery();
  const navigate = useNavigate();
  const [departmentId, setDepartmentId] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [form, setForm] = useState({
    name: "",
    image: null,
    universityId: queryParams.get("id"),
  });
  const [formError, setFormError] = useState({ name: "", image: null });

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios
      .get(
        "http://localhost:9599/department?universityId=" + queryParams.get("id")
      )
      .then((d) => {
        setDepartments(d.data.departData);
      });
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:9599/" + item.image}
              height="150"
              width="150"
            />
          </td>
          <td>{item.name}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(
                  ROUTES.productAdmin.name +
                    "?id=" +
                    item._id +
                    "&name=" +
                    item.name
                );
              }}
            >
              Add Product
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteUniversity(item._id);
              }}
            >
              <i className="fa fa-trash">Delete</i>
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                setDepartmentId(item._id);
                setForm({ ...form, name: item.name });
              }}
              className="btn btn-info"
            >
              <i className="fa fa-edit">Edit</i>
            </button>
          </td>
        </tr>
      );
    });
  }

  function saveDepartments() {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      formData.append("universityId", form.universityId);

      axios
        .post("http://localhost:9599/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("Data saved successfully");
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Failed to submit the data");
    }
  }

  function updateDepartments() {
    try {
      const formData = new FormData();
      formData.append("id", departmentId);
      formData.append("name", form.name);
      formData.append("image", form.image, form.image.name);
      // formData.append("universityId",form.universityId);

      axios
        .put("http://localhost:9599/department", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("Data Updated successfully");
          getAll();
          resetForm();
        });
    } catch (error) {
      console.log("Failed to Update the data");
    }
  }

  function resetForm() {
    setForm({ name: "", image: "" });
  }

  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Please enter name !!!!" };
    }

    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Please enter images !!!!" };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      {
        departmentId ? updateDepartments() : saveDepartments();
      }
    }
  }

  function deleteUniversity(id) {
    let ans = window.confirm("Do you want to delete the university");
    if (!ans) return;

    axios
      .delete("http://localhost:9599/department", { data: { _id: id } })
      .then((d) => {
        getAll();
      })
      .catch((e) => {
        alert(e.response?.data?.message);
      });
  }

  return (
    <div>
      <Header />

      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>

          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">University</label>
              {/* <div className="col-lg-8">
                <input type='text' className="form-control" value={queryParams.get("id")} disabled/>
              </div> */}

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={queryParams.get("name")}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtName">
                Department Name
              </label>
              <div className="col-lg-8">
                <input
                  value={form.name}
                  type="text"
                  name="name"
                  id="txtName"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtImage">
                Department Image
              </label>
              <div className="col-lg-8">
                <input
                  type="file"
                  name="image"
                  id="txtImage"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>

          <div class="card-footer text-muted">
            {/* <button className="btn btn-info">Save</button> */}
            {departmentId ? (
              <button
                className="btn btn-info"
                onClick={() => {
                  onDepartmentSubmit();
                }}
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-info"
                onClick={() => {
                  onDepartmentSubmit();
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border m-2 p-2">
        <table className="table table-striped table bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Add Product</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Department;
