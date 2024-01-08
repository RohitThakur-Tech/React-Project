import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserDepartment() {
  const [departments, setDepartments] = useState(null);
  const queryParams = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
    //alert(departments);
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

  function renderDepartments() {
    return departments?.map((item) => (
      <div className="col-3">
        <div class="card">
          <img
            class="card-img-top"
            src={"http://localhost:9599/" + item.image}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <button
              onClick={() => {
                navigate(ROUTES.product.name + "?id=" + item._id);
              }}
              className="btn btn-primary"
            >
              View Products
            </button>
          </div>
        </div>
      </div>
    ));
  }

  // function renderDepartments() {
  //   return department?.map((item) => (
  //     <div className="col-3">
  //       <div className="card">
  //         <img
  //           className="card-img-top"
  //           src={"http://localhost:9995/" + item.image}
  //           alt="card image cap"
  //         />
  //         <div className="card-body">
  //           <h5 className="card-title">{item.name}</h5>
  //           <button
  //             onClick={() => {
  //               navigate(ROUTES.product.name + "?id=" + item._id);
  //             }}
  //             className="btn btn-primary"
  //           >
  //             View Products
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // }
  return (
    <div>
      <Header />
      {/* <div className="row m-2">{renderDepartments()}</div> */}
      <div className="row m-2">{renderDepartments()}</div>
    </div>
  );
}
export default UserDepartment;
