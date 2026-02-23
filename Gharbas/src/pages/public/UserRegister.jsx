import { useForm } from "react-hook-form";
import { data, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schema/register.schema";
import LogoSideCard from "../../component/LogoSideCard";
import useApi from "../../hooks/useAPI";
import { toast } from "react-toastify";

 const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const {callApi} = useApi();

  const onSubmit = async(userData) => {
    try{
       const finaldata = {
        ...userData,
        role: "user"
       }
       
        const res = await callApi("POST",'/auth/register',{ data : finaldata});
        console.log(res);
        toast.success("Registration successfull");
    }
    catch(err){
      toast.error("Couldnt register try again");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-4">
      <div className="flex bg-white/20 w-[800px] rounded-2xl p-2">
        <LogoSideCard/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white max-w-[400px] p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Register Here
        </h1>
        <p className="text-center text-yellow-600 text-sm mb-6">
          Create your account
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullname")}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-2">
            Gender
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                value="Male"
                {...register("gender")}
                className="accent-orange-500"
              />
              Male
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                value="Female"
                {...register("gender")}
                className="accent-orange-500"
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* DOB */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.dob && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dob.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Address
          </label>
          <input
            {...register("address")}
            placeholder="Enter your address"
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Phone
          </label>
          <input
            {...register("phone")}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmpassword")}
            className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
          />
          {errors.confirmpassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmpassword.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600
             text-white font-semibold py-3 rounded-xl
             transition shadow-md hover:shadow-xl"

          >
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="w-full bg-gray-100 hover:bg-gray-200
             text-gray-700 font-medium py-3 rounded-xl transition"
          >
            Reset
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-orange-600 font-medium hover:underline ml-1"
          >
            Login Here
          </Link>
        </p>
        <p className="text-center text-gray-600 text-sm">
          <Link 
          to ="/HostRegister"
          className="text-orange-600 font-medium hover:underline ml-1" >
          Become a Host
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Register;