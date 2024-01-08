import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function University() {
  const [universities, setUniversities] = useState(null);
  const [forms, setForms] = useState({ name: "", image: null });
  const [formsError, setFormsError] = useState({ name: "", image: null });
  const [universityId, setUniversityId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
    console.log(universities);
  }, []);

  function getAll() {
    axios.get("http://localhost:9599/university").then((d) => {
      setUniversities(d.data.univData);
    });
  }

  const onChangeHandler = (e) => {
    setForms({ ...forms, [e.target.name]: e.target.value });
  };


  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <tr>
          <td>
            <img
              src={"http://localhost:9599/" + item.image}
              height="150"
              width="150"
            />
            {/* onClick={()=>{
              deleteUniversity(item._id); */}
          </td>
          <td>{item.name}</td>
          <td>
            <button className="btn btn-success" onClick={()=>{
              navigate(ROUTES.departmentAdmin.name + "?id=" + item._id + "&name=" + item.name)
            }}>Add Department</button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={()=>{
              deleteUniversity(item._id);
            }} >Delete</button>
          </td>
          <td>
            <button className="btn btn-info" onClick={()=>{
              setUniversityId(item._id);
              setForms({...forms,name:item.name})
            }} >Edit</button>
          </td>
        </tr>
      );
    });
  }
  // onClick={()=>{
  //   navigate(ROUTES.departmentAdmin.name + "?id=" +item._id + "&name=" + item.name)
  // }}

  function saveUniversities() {
    try {
      const formData = new FormData();
      formData.append("name", forms.name);
      formData.append("image", forms.image, forms.image.name);

      axios
        .post("http://localhost:9599/university", formData, {
          "content-type": "multipart/form-data",
        })
        .then((d) => {
          alert("Data saved successfully");
          getAll();
           resetForm();
        });
    } catch (error) {
      console.log("Failed to submit data");
    }
  }

  function updateUniversity()
  {
    try
    {
      const formData=new FormData();
      // formData.append("id",UniversityId);
      formData.append("id",universityId);
      formData.append("name",forms.name);
      formData.append("image",forms.image,forms.image.name);

      axios.put("http://localhost:9599/university",formData,{
        "content-type": "multipart/form-data",
      })
      .then((d)=>{
        alert("Data updated successfully");
        getAll();
        resetForm();
      })
    }
    catch(error){
      console.log("Failed to update data");
    }
  }

  function onUniversitySubmit()
  {
    let errors=false;
    let error={name:"",image:""}

    if(forms.name.trim().length==0)
    {
      errors=true;
      error={...error,name:"Please enter name !!!!"};
    }
    if(forms.image==null)
    {
      errors=true;
      error={...error,image:"Please Enter Image !!!!"};
    }
    if(errors)setFormsError(error);
    else
    {
      setFormsError(error);
      {universityId? updateUniversity():saveUniversities()}
    }
  }

  function deleteUniversity(id)
  {
    
    let ans=window.confirm("Do you want to delete the university");
    if(!ans)return;

    axios.delete("http://localhost:9599/university",{data:{_id:id}}).
    then((d)=>{
      getAll();
    })
    .catch((e)=>{
      alert(e.response?.data?.message);
    })
  }

  function resetForm()
  {
    setForms({name:"",image:""});
  }

  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>

          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4" for="txtName">
                University Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  id="txtName"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={onChangeHandler}
                  value={forms.name}
                />
                  <p className="text-danger">{formsError.name}</p>
              </div>
            </div>
            {/* onChange={(e)=>{
                  let file=e.target.files[0];
                  setForm({...form,image:file});
                }}/> */}

            <div className="form-group row">
              <label className="col-lg-4" for="txtImage">
                University Image
              </label>
              <div className="col-lg-8">
                <input
                  type="file"
                  name="image"
                  id="txtImage"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForms({ ...forms, image: file });
                  }}
                />
                  <p className="text-danger">{formsError.image}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            {universityId ? (
              <button className="btn btn-info" onClick={()=>{
                onUniversitySubmit()
              }} >Update</button>
            ) : (
              <button className="btn btn-info" onClick={()=>{
               onUniversitySubmit() 
              }}>Save</button>
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
              <th>Add Department</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default University;
