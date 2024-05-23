import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/createClient";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      if (data.user && data.session) {
        alert("Login success.");
        navigate("/");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="flex bg-login flex-col items-center justify-center h-screen">
      <div className="flex max-sm:flex-col justify-center items-center mt-10">
        <div className="card max-sm:flex max-sm:flex-col card-side backdrop-blur-lg shadow-xl w-full md:w-4/5">
          <div className="card-body ">
            <form className="mt-3" onSubmit={handleSubmit}>
              <h2 className="text-center font-bold text-white">LOGIN</h2>
              <h4 className="mt-5 text-white">Email</h4>
              <input
                className="input input-bordered mt-2 border-gray-500 bg-transparent text-white w-full"
                type="email"
                ref={emailRef}
                placeholder="Input your Email"
              />
              <h4 className="mt-2 text-white">Password</h4>
              <input
                className="input input-bordered mt-2 border-gray-500 bg-transparent text-white w-full"
                type="password"
                ref={passwordRef}
                placeholder="Input your Password"
              />
              <button
                type="submit"
                className="btn mt-3 btn-outline w-full btn-accent"
                disabled={loading} // Disable button saat loading
              >
                {loading ? "Loading..." : "Login"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
              {/* Tampilkan pesan error jika ada */}
              <h2 className="text-center text-gray-400 text-sm mt-2">
                if you don't have an account <br />
                <Link
                  to={"/register"}
                  className="text-white text-sm hover:text-green-500"
                >
                  "CREATE ACCOUNT"
                </Link>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
