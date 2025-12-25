import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try{
      const {data: response} = await api.post(
        "/api/auth/public/register",
        data
      );
      reset();
      console.log(response.message);
      navigate("/login");
      toast.success("Registered Successfully!");
    }catch(err){
      console.log(err);
      toast.error("Registration Failed!");
    } finally{
      setLoader(false);
    }
  };

  return (
    <div 
      className='min-h-[calc(100vh-64px)] flex justify-center items-center'
    >
      <form onSubmit={handleSubmit(registerHandler)}
        className='sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md'
      >
        <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
            Register Here
        </h1>
        <hr className='mt-2 mb-5 text-slate-300'/>
        <div>
          <TextField 
            label="User Name"
            id="username"
            type="text"
            register={register}
            errors={errors}
            required
            message="User Name is required"
          />
          <TextField 
            label="Email"
            id="email"
            type="email"
            register={register}
            errors={errors}
            required
            message="Email is required"
          />
          <TextField 
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            required
            min={6}
            message="Password is required"
          />
        </div>

        {/* button */}
        <button
          type='submit'
          className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 cursor-pointer'
        >
          {loader ? "Loading..." : "Register"}
        </button>

        <p className='text-center text-slate-700 mt-2 text-sm'>
          Already have an account? 
          <Link
            className='font-semibold underline hover:text-black'
            to="/login"
          >
            <span className='pl-1 text-btnColor'>Login</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage