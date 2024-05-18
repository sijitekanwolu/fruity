import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase/createClient";

const scrollHeader = () => {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });
};

const Header = () => {
  const { user, logout } = useAuth();
  const [getCart, setGetCart] = useState([]);
  const [getTotalCart, setGetTotalCart] = useState("");
  const [cartData, setCartData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  async function fetchCart() {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_cust", user.id);
    setGetCart(data);
  }

  const image = (filename) => {
    try {
      const { data, error } = supabase.storage
        .from("image_produk")
        .getPublicUrl("images/" + filename);
      if (error) {
        throw error;
      }
      return data.publicUrl;
    } catch (error) {
      console.error("Error getting image URL:", error.message);
    }
  };

  // useEffect(() => {
  //   const filterCart = () => {
  //     if (getCart.length > 1) {
  //       const data = getCart.slice(0, 1);
  //       setCartData(data);
  //       console.log(data);
  //     }
  //   };
  //   filterCart();
  // }, [getCart]);
  // console.log(cartData);
  const handleLogout = async () => {
    try {
      await logout();
      alert("logout berhasil");
      useNavigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const totalCart = async () => {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_cust", user.id);

    setGetTotalCart(data.length);

    // if (cartLength > 5) {
    //   setGetTotalCart(5); // Set jumlah total cart yang ditampilkan menjadi 5
    // } else if (cartLength > 0) {
    //   setGetTotalCart(cartLength); // Set jumlah total cart yang ditampilkan sesuai dengan jumlah item di cart
    // } else {
    //   setGetTotalCart(0); // Set jumlah total cart yang ditampilkan menjadi 0 jika tidak ada item di cart
    // }

    // console.log(data.length);
  };
  // console.log(getCart);
  useEffect(() => {
    scrollHeader();
    fetchCart();
    totalCart();
  }, []);

  return (
    <header className="flex justify-between items-center w-full bg-black/15 z-10 fixed shadow-2xl p-5">
      <div className="flex">
        <Link
          to={"/"}
          className="text-2xl max-sm:text-xl text-green-400 font-bold"
        >
          FRUITY
        </Link>
      </div>
      {/* <ul className="menu flex gap-5 items-center menu-horizontal px-1">
        <li>
          <a className="hover:text-green-400 text-white font-medium">Home</a>
        </li>
        <li>
          <a className="hover:text-green-400 text-white font-medium">Menu</a>
        </li>
        <li>
          <a className="hover:text-green-400 text-white font-medium">Footer</a>
        </li>
      </ul> */}
      <div className="flex justify-center items-center">
        {user !== null ? (
          <>
            <div className="flex max-sm:hidden">
              <h2 className="m-3 text-white">Haii! {user.email}</h2>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {getTotalCart}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-96 bg-base-100 shadow"
                >
                  <div className="card-body">
                    {getCart.slice(0, 5).map((cart) => (
                      <div className="flex justify-between">
                        <div className="flex">
                          <img
                            className="w-12 h-12 rounded-sm"
                            src={image(cart.gambar)}
                            alt={cart.gambar}
                          />
                          <span className="text-base mt-2 ms-3">
                            {cart.produk}
                          </span>
                        </div>

                        <span className="text-sm mt-2">${cart.harga}</span>
                      </div>
                    ))}
                    <div className="card-actions">
                      {getTotalCart > 5 && (
                        <p className="text-xs">
                          {getTotalCart - 5} Other products
                        </p>
                      )}
                      <Link to={"/cart"}>
                        <button className="btn w-80 ms-4 mt-2 btn-outline btn-success">
                          View cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxr_FyexDzwaI1UhVhiXDm2Fd4IyVVwbRJw&usqp=CAU"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/profile"}>Profile</Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sm:hidden ">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                size={21}
                duration={0.8}
                rounded
                color="#ffffff"
              />

              {isOpen ? (
                <div className="absolute w-full left-0 flex flex-col text-white items-center gap-5 bg-black/50 p-5 mt-5">
                  <h2>{user.email}</h2>
                  <div className="flex gap-4">
                    <Link to={"/profile"}>
                      <button className="btn btn-outline btn-accent">
                        Profile
                      </button>
                    </Link>

                    <Link to={"/cart"}>
                      <button className="btn btn-outline btn-warning">
                        Cart
                      </button>
                    </Link>

                    <button
                      className="btn btn-outline btn-error"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-outline btn-warning">
              <Link to={"/login"}>Masuk / Login</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
