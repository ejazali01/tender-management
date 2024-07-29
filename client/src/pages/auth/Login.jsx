import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/AuthSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state?.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
      toast.success("login success");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user?.success !== null && user?.success !== false) {
      navigate("/");
    }
    navigate("/signin");
  }, [user]);

  return (
    <div className="max-w-[300px] h-screen m-auto">
      <h2 className="py-3 text-center">Login</h2>
      <h2 className="py-3 text-center flex gap-2 justify-center text-sm items-center">
        Don't have an account ?
        <span>
          <Link to="/signup" className="text-blue underline underline-offset-4">
            SignUp
          </Link>
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-2 rounded-md"
        />
        <Link to="/forgot-password">
          <h2 className=" text-blue-400 hover:underline hover:text-blue-500 text-right cursor-pointer">
            forget password
          </h2>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-300 p-1 px-4 rounded flex justify-center hover:bg-blue-200"
        >
          {loading ? (
            <svg className="w-6 h-6 animate-rotate" viewBox="0 0 50 50">
              <circle
                className="path stroke-current text-blue-500"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              ></circle>
              <style jsx>{`
                .path {
                  stroke-linecap: round;
                  animation: dash 1.5s ease-in-out infinite;
                }
              `}</style>
            </svg>
          ) : (
            "SignIn"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default Login;
