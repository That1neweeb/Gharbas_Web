import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema/login.schema";
import useApi from "../../hooks/useAPI";
import LogoSideCard from "../../component/LogoSideCard";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const { callApi } = useApi();

  const handleLogin = async (loginData) => {
    try {
      const res = await callApi("POST", "/auth/Login", { data: loginData });
      localStorage.setItem("access_token", res?.data?.access_token);
      navigate("/product", { replace: true });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-58px)] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 p-4">
      <div className="w-full flex max-w-[700px] bg-white rounded-2xl ">
        <LogoSideCard/>

        <div className="bg-white w-[400px] shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-orange-600 text-center">
          Login Account
          </h2>
        <p className="text-sm text-yellow-600 text-center mt-1">
          Please fill in the details below
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              type="text"
              placeholder="Enter Email"
              className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Password"
              className="w-full rounded-xl border border-gray-200 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-orange-400
             focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600
                       text-white font-semibold py-2 rounded-lg
                       transition duration-200 shadow-md"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-orange-600 font-medium hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
