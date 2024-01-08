import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const queryParams = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
    //alert(productDetails);
  }, []);

  // function getProductDetails() {
  //   axios
  //     .get("http://localhost:9599/productDetails", {
  //       params: { _id: queryParams.get("id") },
  //     })
  //     .then((d) => {
  //       setProductDetails(d.data.prdData);
  //     });
  // }
  function getProductDetails()
  {
    axios.get("http://localhost:9599/productDetails?id=" + queryParams.get("id")).then((d)=>{
      setProductDetails(d.data.prdData);
    });
  }

  function renderImages() {
    return productDetails?.images?.map((item) => {
      return (
        <img
          className="card-mig-top"
          src={"http://localhost:9599/" + item}
          height="150px"
          width="150px"
        />
      );
    });
  }
  return (
    <div>
      <Header />
      <div className="row m-2 p-2">
        <div className="card text-center mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImages()}
          </div>
          <div className="card-body">
            Product
            <h5 className="card-title">{productDetails?.name}</h5>
            Description
            <h6 className="card-title">{productDetails?.description}</h6>
            Total Items Left
            <h6 className="card-title">{productDetails?.quantity}</h6>
            Price
            <h6 className="card-title">{productDetails?.price}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
