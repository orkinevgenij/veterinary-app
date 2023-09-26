import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './components/Layout';
import { Order } from './components/Order';
import { PrivateRoute } from './components/PrivateRoute.jsx';
import { About } from './screens/About';
import { AdminDashbord } from './screens/AdminPage/AdminDashboard';
import { ApointmentsList } from './screens/AdminPage/ApointmentsList';
import { ClientsList } from './screens/AdminPage/ClientsList';
import { CreateCategory } from './screens/AdminPage/CreateCategory';
import { CreateProduct } from './screens/AdminPage/CreateProduct';
import { CreateUser } from './screens/AdminPage/CreateUser';
import Products from './screens/AdminPage/Products';
import { Statistics } from './screens/AdminPage/Statistics';
import { SuccessApointments } from './screens/AdminPage/SuccessApointmentsList';
import { UserDetailsInfo } from './screens/AdminPage/UserDetailsInfo';
import { ApointmentDetails } from './screens/ApointmentDetails';
import { AppointmentDoctor } from './screens/AppointmentDoctor';
import { Contacts } from './screens/Contacts';
import { Doctors } from './screens/Doctors';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { LoginScreen } from './screens/LoginScreen.jsx';
import { Prescribing } from './screens/Prescribing';
import { Profile } from './screens/Profile';
import { ProfileUpdate } from './screens/ProfileUpdate.jsx';
import { RegisterScreen } from './screens/RegisterScreen.jsx';
import { Services } from './screens/Services';
import CategoryPage from './screens/ZooShop/CategoryPage';
import { CategoryProducts } from './screens/ZooShop/CategoryProduct';
import { UpdateProduct } from './screens/AdminPage/UpdateProduct';
import { ProductDetails } from './screens/ZooShop/ProductDetails';
import { SearchResult } from './screens/ZooShop/SearchResult';
import { Orders } from './screens/AdminPage/Orders';
import { AdminRoute } from './components/AdminRoute';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' index element={<HomeScreen />} />
          <Route path='about' element={<About />} />
          <Route path='doctors' element={<Doctors />} />
          <Route path='services' element={<Services />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
          <Route path='apointment-details' element={<ApointmentDetails />} />
          <Route path='order' element={<Order />} />

          <Route path='' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile-update' element={<ProfileUpdate />} />
            <Route path='/apointment' element={<AppointmentDoctor />} />
          </Route>

          {/*Shop routes  */}
          <Route path='shop/product/:slug' element={<Products />} />
          <Route path='shop/category' element={<CategoryPage />} />
          <Route path='shop/category-product/:slug' element={<CategoryProducts />} />
          <Route path='shop/product-details/:slug' element={<ProductDetails />} />
          <Route path='shop/search-products' element={<SearchResult />} />

          {/* Admin routes */}
          <Route path='' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashbord />}>
              <Route path='clientlist' element={<ClientsList />} />
              <Route path='orders' element={<Orders />} />
              <Route path='user-details/:userId' element={<UserDetailsInfo />} />
              <Route path='apointments' element={<ApointmentsList />} />
              <Route path='statistics' element={<Statistics />} />
              <Route path='prescribing' element={<Prescribing />} />
              <Route path='create-product' element={<CreateProduct />} />
              <Route path='create-user' element={<CreateUser />} />
              <Route path='success-apointments' element={<SuccessApointments />} />
              <Route path='create-category' element={<CreateCategory />} />
              <Route path='all-products' element={<Products />} />
              <Route path='all-products/update-product/:pid' element={<UpdateProduct />} />
            </Route>
          </Route>
          <Route />
        </Route>
      </Routes>
    </>
  );
};
export default App;
