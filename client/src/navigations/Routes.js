import About from "../container/about/About";
import Department from "../container/admin/department/Department";
import Product from "../container/admin/product/Product";
import University from "../container/admin/university/University";
import Contact from "../container/contact/Contact";
import UserDepartment from "../container/customers/department/UserDepartment";
import Home from "../container/customers/home/Home";
import UserProduct from "../container/customers/product/UserProduct";
import ProductDetails from "../container/customers/productDetails/ProductDetails";
import Login from "../container/login/Login";
import Register from "../container/register/Register";

const ROUTES = {
  contact: {
    name: "/contact",
    component: <Contact />,
  },
  about: {
    name: "/about",
    component: <About />,
  },
  login: {
    name: "/login",
    component: <Login />,
  },
  register: {
    name: "/register",
    component: <Register />,
  },
  universityAdmin: {
    name: "/universityAdmin",
    component: <University />,
  },
  departmentAdmin: {
    name: "/departmentAdmin",
    component: <Department />,
  },
  productAdmin: {
    name: "/productAdmin",
    component: <Product />,
  },
  home: {
    name: "/",
    component: <Home />,
  },
  department: {
    name: "/department",
    component: <UserDepartment />,
  },
  product: {
    name: "/product",
    component: <UserProduct />,
  },
  productDetails: {
    name: "/productDetails",
    component: <ProductDetails />,
  },
};
export default ROUTES;
