import React, { useState,useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link,useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';



const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, seterror] = useState(null);

  const { updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) =>{
     e.preventDefault();

    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.");
      return;
    }

    if (!password) {
      seterror("Please enter the password");
      return;
    }

    seterror("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token, user } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    }catch (error) {
      if (error.response && error.response.data.message) {
        seterror(error.response.data.message);
    } else{
        seterror("Something went wrong. Pleasr try again.")
}
    }

  }


  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
        <p className='text-sm text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="Sashika@example.com"
            type="text"
            />

             <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Character"
            type="password"
          />

          
          {error && 
            <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <button
            type="submit"
            className="btn-primary"
          >
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don’t have an account?{" "}
            <Link
              className="font-medium text-primary underline"
              to="/signup"
            >
              Sign up
            </Link>
            </p>

        </form>




      </div>
    </AuthLayout>
  )
}

export default Login