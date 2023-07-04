import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AdminGaurdRouter from "./AdminGaurdRouter.jsx";
import NotFound from "./../components/NotFound";

import Login from "./../pages/AccountPages/Login";
import Register from "./../pages/AccountPages/Register";
import RecoverPassword from "./../pages/AccountPages/RecoverPassword";
import ResetPassword from "./../pages/AccountPages/ResetPassword";
import ConfirmEmail from "../components/ConfirmEmail";
import UserGaurdRouter from "./UserGaurdRouter.jsx";
import { Home } from "../pages/Home.jsx";
import { HomeGuard, LoginGuard } from "../guards/AuthGuards.js";
export default function Router() {
  const AddUser = lazy(() => import("../pages/AdminPages/AddUser"));
  const AddMovie = lazy(() => import("../pages/AdminPages/AddMovie"));
  const AddProduct = lazy(() => import("../pages/AdminPages/AddProduct"));
  const UserList = lazy(() => import("../pages/AdminPages/UserList"));
  const MoviesList = lazy(() => import("../pages/AdminPages/MoviesList"));
  const ProductsList = lazy(() => import("../pages/AdminPages/ProductsList"));
  const OrdersList = lazy(() => import("../pages/AdminPages/OrdersList"));
  const ReviewsList = lazy(() => import("../pages/AdminPages/ReviewsList"));

  // E-Commerce
  const Cart = lazy(() => import("./../pages/ProductPages/Cart"));
  const Store = lazy(() => import("./../pages/ProductPages/Store"));
  const ProductDetails = lazy(() =>
    import("./../pages/ProductPages/ProductDetails")
  );
  const UserOrders = lazy(() =>
    import("./../pages/ProductPages/UserOrders")
  );
  //Stream
  const Movies = lazy(() =>
    import("../pages/StreamPages/Movies.jsx")
  );
  const MovieDetails = lazy(() =>
    import("../pages/StreamPages/moviePage.jsx")
  );
  const Favorites = lazy(() =>
    import("../pages/StreamPages/Favorites.jsx")
  );
  const Animes = lazy(() =>
    import("../pages/StreamPages/Anime.jsx")
  );
  const Series = lazy(() =>
    import("../pages/StreamPages/Series.jsx")
  );
  const ChangePassword = lazy(() =>
  import("./../pages/AccountPages/ChangePassword")
);
const Profile = lazy(() =>
import("./../pages/AccountPages/Profile")
);
const Settings = lazy(() =>
import("../pages/AccountPages/Settings")
);


  return (
    <>
      <Routes>
        <Route element={<AdminGaurdRouter />}>
          <Route path="/userList" element={<UserList />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/moviesList" element={<MoviesList />} />
          <Route path="/productsList" element={<ProductsList />} />
          <Route path="/ordersList" element={<OrdersList />} />
          <Route path="/reviewsList" element={<ReviewsList />} />
        </Route>
        {/* E-Commerce */}
        <Route path="/store" element={<UserGaurdRouter />}>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/store/cart" element={<Cart />}></Route>
          <Route path="/store/product/:id" element={<ProductDetails />}></Route>
          <Route path="/store/search" element={<Store />}></Route>
        </Route>

        {/* Stream */}
        <Route element={<UserGaurdRouter />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/anime" element={<Animes />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/orders" element={<UserOrders />}></Route>
        </Route>
        <Route path="/" element={<HomeGuard><Home /></HomeGuard>} />


        <Route path="/login" element={<LoginGuard><Login /></LoginGuard>} />
        <Route path="/register" element={<LoginGuard><Register /></LoginGuard>} />
        <Route path="/recoverPassword" element={<LoginGuard><RecoverPassword /></LoginGuard>} />  
        <Route path="/resetPassword/:id" element={<LoginGuard><ResetPassword /></LoginGuard>} />
        <Route path="/confirmEmail" element={<LoginGuard><ConfirmEmail /></LoginGuard>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
