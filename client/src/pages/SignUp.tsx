import React, { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { UserSignUpDetails } from "types";


const SignUp = () => {
  const { handleUserRegister, loading } = useAuthContext();

  const [credentials, setCredentials] = useState<UserSignUpDetails>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleUserRegister(credentials)
  }


  return (
    <div className="flex flex-col gap-2">
      <Helmet>
        <title>Locka Rentals SignUp</title>
      </Helmet>
      <div className="header">
        <h1 className="auth-title">Sign Up</h1>
        <p>to continue to Locka Car Rentals</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
        <div className="input-container">
          <label htmlFor="firstName">Full Name:</label>
          <input type="text" id="firstName" name="firstName"
            placeholder="Provide your first name..."
            value={credentials.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Full Name:</label>
          <input type="text" id="lastName" name="lastName"
            placeholder="Provide your last name..."
            value={credentials.lastName}
            onChange={handleChange}
          />
        </div>
        </div>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"
            placeholder="Provide username..."
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email"
            placeholder="Provide email..."
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password"
            placeholder="Provide your password..."
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <span>Create your account</span>
          )}
        </Button>
      </form>

      <div className="links">
        <Link to={"/login"}>
          Already have an Account? <span>LogIn</span>
        </Link>
      </div>
      <Toaster />
    </div>
  )
}

export default SignUp