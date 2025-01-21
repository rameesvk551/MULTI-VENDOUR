import axios from 'axios'
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/style";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { server } from '../../server';
function Signup() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [avator, setAvator] = useState(null);

  const handleSubmit =async (e) => {
   e.preventDefault()
    const config={headers:{"content-Type":"multipart/form-data"}}
    const newForm= new FormData()
    newForm.append("file",avator)
    newForm.append("name",name)
    newForm.append("email",email)
    newForm.append("password",password)
    newForm.append("conformPassword",conformPassword)
    axios.post(`${server}/create-user`,newForm,config)
    .then((res)=>{
      if(res.data.success === true){
        navigate("/")
      }
      console.log("daaaaaaaata",res);  
    }).catch((err)=>{
      console.log(err); 
    })
   
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvator(file);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as new user
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/*Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
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

            {/*conform password*/}

            <div>
              <label
                htmlFor="conformPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Conform-Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="conformPassword"
                  required
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
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

            <div>
              <label
                htmlFor="avator "
                className="bock-text-sm font-medium text-gray-700"
              ></label>
              <div className="mt- flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avator ? (
                    <img
                    src={URL.createObjectURL(avator)}
                      alt="avator"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className=" h-8 w-8" />
                  )}
                </span>
                <label htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium
                text-gray-700 bg-white hover:bg-gray-50">
                  <span>Upload a file</span>
                  <input type="file" name="avator" id="file-input" accept=".jpg.jpeg.png"
                  onChange={handleFileInputChange}
                  className="sr-only" />
                  </label>
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
            <div className={`${styles.noramlFlex} w-full`}>
              <h4> have an account</h4>
              <Link to={"/login"} className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
