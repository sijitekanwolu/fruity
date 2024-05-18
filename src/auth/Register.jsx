import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/createClient";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Password anda tidak sama");
    }

    const { error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (error) {
      alert("gagal mendaftar");
    } else {
      alert("Sukses Mendaftar, silahkan cek email anda untuk verfikasi");
    }

    setLoading(false);
  };

  console.log(emailRef);
  return (
    <section className="flex flex-col h-screen bg-register items-center justify-center">
      <div className="flex max-sm:flex-col justify-center items-center mt-10">
        <div className="card max-sm:flex max-sm:flex-col card-side backdrop-blur-lg shadow-xl w-full md:w-4/5">
          <div className="card-body">
            <form className="mt-3" onSubmit={handleSubmit}>
              <h2 className="text-center text-white font-bold">REGISTER</h2>
              <h4 className="text-white mt-5">Email</h4>
              <input
                className="input input-bordered bg-transparent w-full"
                type="email"
                ref={emailRef}
                placeholder="Input your Email"
              />
              <h4 className="text-white mt-4">Password</h4>
              <input
                className="input input-bordered bg-transparent w-full"
                type="password"
                ref={passwordRef}
                placeholder="Input your Password"
              />
              <h4 className="text-white bg-transparent mt-4">
                Confirm Password
              </h4>
              <input
                className="input input-bordered bg-transparent w-full"
                type="password"
                ref={confirmPasswordRef}
                placeholder="Input your Password"
              />
              <button
                type="submit"
                className="btn mt-3 btn-outline w-full btn-accent"
              >
                {loading ? <>Loading...</> : <>Register</>}
              </button>
              <h2 className="text-center text-gray-400 text-sm mt-2">
                if you have an account <br />
                <Link
                  to={"/login"}
                  className="text-white text-sm hover:text-green-500"
                >
                  "LOGIN"
                </Link>
              </h2>
            </form>
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default Register;
