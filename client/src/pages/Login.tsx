import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
  const { handleUserLogin, loading } = useAuthContext();
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDetails({...details, [name]: value})
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUserLogin(details)
  }


  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Locka Rentals Login</title>
      </Helmet>
      <div className="header mb-4">
        <h1 className="auth-title">Sign in</h1>
        <p>to continue to Locka Car Rentals</p>
      </div>

      <form onSubmit={handleEmailLogin}>
        <div className="input-container">
          <label htmlFor="email">Email address or username</label>
          <input
            type="email" name="email" id="email"
            placeholder="Provide your email..."
            value={details.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"
            placeholder="Provide your password..."
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <div className="my-1 flex justify-end items-center gap-1">
          <p className="text-gray-300 font-semibold">Forgot password?</p>
          <Link className="font-semibold text-primary underline" to={"/forgot"}>Click here</Link>
        </div>
        <Button type="submit">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
              <span>Log into your account</span>
          )}
        </Button>
      </form>

      <div className="links">
        <Link to={"/register"}>
          No Account? <span>Sign Up</span>
        </Link>
      </div>
      <Toaster />
    </div>
  )
}

export default Login