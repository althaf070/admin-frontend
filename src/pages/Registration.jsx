/* eslint-disable react/prop-types */
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import {  Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  useAuthStore } from "../store/adminstore";

const Registration = ({ isRegistration }) => {
 
  const {register,login,isLoading,isAuthenticated} = useAuthStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //  form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {username,email,password} = formData
    if(isRegistration){
      await register(username,email,password)
      navigate('/admin/settings')
    }else {
      await login(email,password)
      navigate('/')
    }
    
    setFormData({ username: "", email: "", password: "" });
  };
if(isAuthenticated){
  return <Navigate to={'/'}/>
}
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl lg:text-4xl font-semibold text-center mb-5">
        {isRegistration ? "Admin Registration" : "Admin Login"}
      </h1>

      <div className="flex flex-col justify-center items-center p-3">
        <form className="w-[28rem] bg-slate-400 p-7 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {isRegistration && (
            <div className="mt-5">
              <div className="mb-2 block">
                <Label htmlFor="username" value="Enter Your Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="yourname"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="text-center mt-5">
          {isLoading ? <Spinner color="success"/>:"Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};


export default Registration;
