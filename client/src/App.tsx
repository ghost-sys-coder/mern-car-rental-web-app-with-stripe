import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AddNewRental, AllCars, Booking, CarBrand, CreateBlog, ForgotPassword, Home, Login, ProfilePage, Shop, SignUp, SingleBlog, SingleCarPage, VerifyToken } from "./pages";
import { AuthLayout, MainLayout, ProtectedLayout } from "./layouts";
import axios from "axios";
import { LoadingPhase, ResetPassword } from "./components";


function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;

  return (
    <Suspense fallback={<LoadingPhase />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cars/:id" element={<SingleCarPage />} />
          <Route path="/add-rental" element={
            <ProtectedLayout>
              <AddNewRental />
            </ProtectedLayout>
          } />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog/create" element={
            <ProtectedLayout>
              <CreateBlog />
            </ProtectedLayout>
          } />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/allcars" element={<AllCars />} />
          <Route path="/brands/:brand/:id" element={<CarBrand />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route>
        <Route path="verify/:token" element={<VerifyToken />} />
      </Routes>
    </Suspense>
  )
}

export default App
