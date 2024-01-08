import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Product() {
  const queryParam = useQuery();
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState(null);
  const [departmentId, setDepartmentId] = useState(queryParam.get("id"));

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "10",
    images: null,
    departmentId: queryParam.get("id"),
  });

  const [formError, setFormError] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    images: null,
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios
      .get("http://localhost:9599/product?departmentId=" + queryParam.get("id"))
      .then((d) => {
        setProducts(d.data.prdData);
      });
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      quantity: "10",
      price: "",
      images: null,
    });
  }

  function renderProducts() {
    return products?.map((item) => {
      return (
        <tr>
          <td>
            {item.images.map((image, index) => (
              <img
                key={index}
                src={"http://localhost:9599/" + image}
                height="150"
                width="150"
                alt={`Product Image ${index + 1}`}
              />
            ))}
            {/* <img src={"http://localhost:9995/" + item.images} height="150" width="150"/> */}
          </td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          {/* <td>
            <button className="btn btn-success">ProductDetails</button>
          </td> */}
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteProducts(item._id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              className="btn btn-info"
              onClick={() => {
                setProductId(item._id);
                setForm({
                  ...form,
                  name: item.name,
                  description: item.description,
                  quantity: item.quantity,
                  price: item.price,
                });
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  }

  function saveProducts() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("price", form.price);
      formData.append("departmentId", form.departmentId);

      axios
        .post("http://localhost:9599/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("Data Saved Successfully");
          getAll();
          resetForm();
        });
    } catch (error) {
      alert("Unable to save the data");
    }
  }

  function updateProducts() {
    try {
      const formData = new FormData();
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("id", productId);
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("quantity", form.quantity);
      formData.append("price", form.price);
      formData.append("departmentId",departmentId);

      axios
        .put("http://localhost:9599/product", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("Data Updated Successfully");
          getAll();
          resetForm();
        });
    } catch (error) {
      alert("Unable to update the data");
    }
  }

  function onProductSubmit() {
    let errors = false;
    let error = {
      name: "",
      images: "",
      description: "",
      quantity: "",
      price: "",
    };
    if (form.name.trim().length == 0) {
      errors = true;
      error = { ...error, name: "Please enter name" };
    }

    if (form.images == null) {
      errors = true;
      error = { ...error, images: "Please enter images" };
    }

    if (form.description == "") {
      errors = true;
      error = { ...error, description: "Please enter description" };
    }

    if (form.quantity == 0 || form.quantity == "") {
      errors = true;
      error = { ...error, quantity: "Please enter quantity" };
    }

    if (form.price == "" || form.price == 0) {
      errors = true;
      error = { ...error, price: "Please enter price" };
    }

    if (errors) setFormError(error);
    else {
      setFormError(error);
      productId ? updateProducts() : saveProducts();
    }
  }

  function deleteProducts(_id) {
    let ans = window.confirm("Do you want to delete the data ?");
    if (!ans) return;
    else {
      axios
        .delete("http://localhost:9599/product", { data: { _id: _id } })
        .then((d) => {
          getAll();
        })
        .catch((e) => {
          // alert("Unable to delete the data");
          alert(e.response?.data?.message);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {productId ? "Edit Product" : "New Product"}
          </div>

          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Department</label>
              {/* <div className="col-lg-8">
                <input type='text' className="form-control" value={queryParams.get("id")} disabled/>
              </div> */}

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={queryParam.get("name")}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtName">
                Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  id="txtName"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtDescription">
                Description
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="description"
                  id="txtDescription"
                  className="form-control"
                  placeholder="description"
                  onChange={changeHandler}
                  value={form.description}
                />
                <p className="text-danger">{formError.description}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtQuantity">
                Quantity
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="quantity"
                  id="txtQuantity"
                  className="form-control"
                  placeholder="quantity"
                  onChange={changeHandler}
                  value={form.quantity}
                />
                <p className="text-danger">{formError.quantity}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtPrice">
                Price
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="price"
                  id="txtPrice"
                  className="form-control"
                  placeholder="price"
                  onChange={changeHandler}
                  value={form.price}
                />
                <p className="text-danger">{formError.price}</p>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-lg-4" for="txtImage">
                Product Image
              </label>
              <div className="col-lg-8">
                <input
                  type="file"
                  id="txtImage"
                  className="form-control"
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                />
                <p className="text-danger">{formError.images}</p>
              </div>
            </div>
          </div>

          <div class="card-footer text-muted">
            {/* <button className="btn btn-info">Save</button> */}
            {productId ? (
              <button
                className="btn btn-info"
                onClick={() => {
                  onProductSubmit();
                }}
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-info"
                onClick={() => {
                  onProductSubmit();
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
              {/* <th>ProductDetails</th> */}
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;