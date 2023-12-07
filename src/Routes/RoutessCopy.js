import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayout from "../Layouts/HeaderLayout";
import PublicLayout from "../Layouts/PublicLayout";
import AboutUs from "../Pages/Public/AboutUs/AboutUs";
import Home from "../Pages/Public/Home/Home";
import Registration from "../Pages/Public/Registation/index";
import Login from "../Pages/Public/Login/Login";
import Profile from "../Pages/User/Profile/Index";
import PointTransfer from "../Pages/User/PointTransfer/Index";
import StartWork from "../Pages/User/StartWork/Index";
import AccessPoints from "../Pages/User/AccessPoints/Index";
import RegularPoints from "../Pages/User/RegularPoints/Index";
import DailyPoints from "../Pages/User/DailyPoints/Index";
import DailyWithdraw from "../Pages/User/DailyWithdraw/Index";
import UserAuthGard from "../Gards/UserAuthGard";
import AdminAuthGard from "../Gards/AdminAuthGard";
import RegularWithdraw from "../Pages/User/RegularWithdraw/Index";
import InvoiceInbox from "../Pages/User/InvoiceInbox/Index";
import ECommerce from "../Pages/Public/ECommerce/ECommerce";
import AdminDashboardLayout from "../Layouts/adminDashboardLayout";
import AllUser from "../Pages/Admin/AllUser/Index";
import ViewProfile from "../Pages/Admin/ViewProfile/Index";
import EditUser from "../Pages/Admin/EditUser/Index";
import AdminStartWork from "../Pages/Admin/AdminStartWork/Index";
import AdminNewRequest from "../Pages/Admin/AdminNewRequest/Index";
import Team from "../Pages/User/Team/Index";
import UserProducts from "../Pages/User/UserProducts/Index";
import AdminDailyWithdraw from "../Pages/Admin/AdminDailyWithdraw/Index";
import AdminRegularWithdraw from "../Pages/Admin/adminRegularWithdraw/Index";
import PlacementUsers from "../Pages/User/PlacementUsers/Index";
import ConfigSetting from "../Pages/Admin/ConfigSetting/Index";
import AdminProducts from "../Pages/Admin/AdminProducts/Index";
import AdminAddProduct from "../Pages/Admin/AdminAddProduct/Index";
import AdminEditProduct from "../Pages/Admin/AdminEditProduct/Index";
import AdminAddService from "../Pages/Admin/AdminAddService/Index";
import AdminEditService from "../Pages/Admin/AdminEditService/Index";
import AdminServices from "../Pages/Admin/AdminServices/Index";
import Services from "../Pages/Public/Services/Services";
import ProductDetails from "../Pages/Public/ProductDetails/ProductDetails";
import Cart from "../Pages/Public/Cart/Cart";
import Category from "../Pages/Public/Category/Category";
import BuyNow from "../Pages/Public/BuyNow/BuyNow";
import AdminPurchase from "../Pages/Admin/AdminPurchase/Index";
import AdminPackges from "../Pages/Admin/AdminPackges/Index";
import AdminAddPackage from "../Pages/Admin/AdminAddPackage/Index";
import AdminInvoiceInbox from "../Pages/Admin/AdminInvoiceInbox/Index";
import Test from "./Test";
import CommonGard from "../Gards/CommonGard";

const Routess = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout children={<Home />} />} />
          <Route
            path="/about_us"
            element={<PublicLayout children={<AboutUs />} />}
          />
          <Route
            path="/registaion"
            element={<HeaderLayout children={<Registration />} />}
          />
          <Route
            path="/ecommerce"
            element={<PublicLayout children={<ECommerce />} />}
          />
          <Route
            path="/services"
            element={<PublicLayout children={<Services />} />}
          />
          <Route
            path="/login"
            element={<HeaderLayout children={<Login />} />}
          />
          <Route
            path="/product_details/:id"
            element={<HeaderLayout children={<ProductDetails />} />}
          />
          <Route path="/cart" element={<HeaderLayout children={<Cart />} />} />
          <Route
            path="/category/:CategoryName"
            element={<HeaderLayout children={<Category />} />}
          />
          <Route
            path="/buy_now"
            element={<HeaderLayout children={<BuyNow />} />}
          />
        </Routes>
      </BrowserRouter>
      {/* User Routes */}
      {/* <Test> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={<UserAuthGard children={<Profile />} />}
          />

          <Route
            path="/start_work"
            element={<UserAuthGard children={<StartWork />} />}
          />
          <Route
            path="/point_transfer"
            element={<UserAuthGard children={<PointTransfer />} />}
          />
          <Route
            path="/points/daily_points"
            element={<UserAuthGard children={<DailyPoints />} />}
          />
          <Route
            path="/points/regular_points"
            element={<UserAuthGard children={<RegularPoints />} />}
          />
          <Route
            path="/points/access_points"
            element={<UserAuthGard children={<AccessPoints />} />}
          />
          <Route
            path="/withdraw/daily_withdraw"
            element={<UserAuthGard children={<DailyWithdraw />} />}
          />
          <Route
            path="/withdraw/regular_withdraw"
            element={<UserAuthGard children={<RegularWithdraw />} />}
          />
          <Route
            path="/invoice/inbox"
            element={<UserAuthGard children={<InvoiceInbox />} />}
          />
          <Route
            path="/team/refer"
            element={<UserAuthGard children={<Team />} />}
          />
          <Route
            path="/user/products"
            element={<UserAuthGard children={<UserProducts />} />}
          />
          <Route
            path="/team/placement"
            element={<UserAuthGard children={<PlacementUsers />} />}
          />
          <Route
            path="/view_profile/:id"
            element={<UserAuthGard children={<ViewProfile />} />}
          />
        </Routes>
      </BrowserRouter>
      {/* </Test> */}
      {/* Affiliate Routes */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/affiliate/balance"
            element={<UserAuthGard children={<StartWork />} />}
          />

          {/* Admin Routes */}

          <Route
            path="/admin/all_user"
            element={<AdminAuthGard children={<AllUser />} />}
            // element={ <AllUser  />}
          />

          <Route
            path="/admin/edit_user/:id"
            element={<AdminAuthGard children={<EditUser />} />}
          />
          <Route
            path="/admin/start_work"
            element={<AdminAuthGard children={<AdminStartWork />} />}
          />
          <Route
            path="/admin/new_request"
            element={<AdminAuthGard children={<AdminNewRequest />} />}
          />
          <Route
            path="/admin/daily_withdraw"
            element={<AdminAuthGard children={<AdminDailyWithdraw />} />}
          />
          <Route
            path="/admin/regular_withdraw"
            element={<AdminAuthGard children={<AdminRegularWithdraw />} />}
          />
          <Route
            path="/admin/config_setting"
            element={<AdminAuthGard children={<ConfigSetting />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminAuthGard children={<AdminProducts />} />}
          />
          <Route
            path="/admin/products/add_product"
            element={<AdminAuthGard children={<AdminAddProduct />} />}
          />
          <Route
            path="/admin/products/eidt_product/:id"
            element={<AdminAuthGard children={<AdminEditProduct />} />}
          />

          <Route
            path="/admin/services"
            element={<AdminAuthGard children={<AdminServices />} />}
          />
          <Route
            path="/admin/purchase"
            element={<AdminAuthGard children={<AdminPurchase />} />}
          />
          <Route
            path="/admin/services/add_service"
            element={<AdminAuthGard children={<AdminAddService />} />}
          />
          <Route
            path="/admin/services/eidt_service/:id"
            element={<AdminAuthGard children={<AdminEditService />} />}
          />
          <Route
            path="/admin/packges"
            element={<AdminAuthGard children={<AdminPackges />} />}
          />
          <Route
            path="/admin/packges/add_spackg"
            element={<AdminAuthGard children={<AdminAddPackage />} />}
          />
          <Route
            path="/admin/invoice/inbox"
            element={<AdminAuthGard children={<AdminInvoiceInbox />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routess;
