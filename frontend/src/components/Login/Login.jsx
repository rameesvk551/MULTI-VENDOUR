import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible }from 'react-icons/ai'
import styles from "../../styles/style";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [visible,setVisible]=useState(false)
 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700"
  >
    Password
  </label>
  <div className="mt-1 relative">
    <input
      type={visible ? "text" : "password"}
      name="password"
      autoComplete="current-password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    {visible ? (
      <AiOutlineEyeInvisible
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        size={20}
        onClick={() => setVisible(false)}
      />
    ) : (
      <AiOutlineEye
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        size={20}
        onClick={() => setVisible(true)}
      />
    )}
  </div>
</div>


<div className={`${styles.noramlFlex} justify-between`}>
<div className={`${styles.noramlFlex}`}>
    <input type="checkbox" name="remember-me" id="remember-me"
    className="h-4 w-4 text-blue-600 focus: ring-blue-500 border-gray-300 rounded" />
    <label htmlFor="remember-me"
    className="m1-2 block text-sm text-gray-900">Remember me</label>
</div>
<div className="text-sm">
    <a href="#"
    className="font-medium text-blue-600 hover:text-blue-500">
        Forgot your password?
    </a>
</div>
</div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full` }>
                <h4>Not have any account</h4>
                <Link to={'/signup'}  className="text-blue-600 pl-2">
                SignUp
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
