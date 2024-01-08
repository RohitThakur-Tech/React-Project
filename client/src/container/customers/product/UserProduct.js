import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function UserProduct() {
  const [products, setProducts] = useState(null);
  const queryParams = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios
      .get(
        "http://localhost:9599/product?departmentId=" + queryParams.get("id")
      )
      .then((d) => {
        setProducts(d.data.prdData);
      });
  }

  function renderProducts() {
    return products?.map((item) => (
      <div className="col-3">
        <div class="card">
          <img
            class="card-img-top"
            src={"http://localhost:9599/" + item.images[0]}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <button
              onClick={() => {
                navigate(ROUTES.productDetails.name + "?id=" + item._id);
              }}
              class="btn btn-primary"
            >
              ProductDetails
            </button>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div>
      <Header />
      <div className="row m-2">{renderProducts()}</div>
    </div>
  );
}

export default UserProduct;
