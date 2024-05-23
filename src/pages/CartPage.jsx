import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase/createClient";

const CartPage = () => {
  const { user } = useAuth();
  const [getCart, setGetCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function fetchCart() {
    const { data } = await supabase
      .from("keranjang")
      .select("*")
      .eq("id_cust", user.id);
    setGetCart(data);
  }

  const calculateTotalPrice = () => {
    const filteredCart = getCart.filter((cart) =>
      checkedItems.includes(cart.id)
    );
    const totalPrice = filteredCart.reduce((total, cart) => {
      return total + cart.harga * cart.jumlah;
    }, 0);
    setTotalPrice(totalPrice);
  };

  const toggleCheckbox = (cartId) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(cartId)
        ? prevCheckedItems.filter((id) => id !== cartId)
        : [...prevCheckedItems, cartId]
    );
  };

  const handleCheckboxChange = (cartId) => {
    toggleCheckbox(cartId);
  };

  const increaseQuantity = async (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    const { data, error } = await supabase
      .from("keranjang")
      .update({ jumlah: newQuantity })
      .eq("id", cartId);

    if (error) {
      console.log(error);
    } else {
      fetchCart();
    }
  };

  const decreaseQuantity = async (cartId, currentQuantity) => {
    if (currentQuantity <= 1) return;
    const newQuantity = currentQuantity - 1;
    const { data, error } = await supabase
      .from("keranjang")
      .update({ jumlah: newQuantity })
      .eq("id", cartId);

    if (error) {
      console.log(error);
    } else {
      fetchCart();
    }
  };

  async function deleteCart(cartId) {
    const { data, error } = await supabase
      .from("keranjang")
      .delete()
      .eq("id", cartId);

    if (error) {
      console.log(error);
    } else {
      fetchCart();
    }
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

  const deleteCheckedItems = async () => {
    const { error } = await supabase
      .from("keranjang")
      .delete()
      .in("id", checkedItems);

    if (error) {
      console.log(error);
    } else {
      setCheckedItems([]);
      fetchCart();
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (checkedItems.length === 0) {
      alert("Please select items to checkout.");
      return;
    }

    const { data: getName, error: getNameError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id);

    if (getNameError) {
      console.error("Error getting username:", getNameError.message);
      return;
    }

    const getNameProduk = getCart
      .filter((produk) => checkedItems.includes(produk.id))
      .map((produk) => produk.produk)
      .join(", "); // Menggabungkan array produk menjadi string

    try {
      const { data: checkoutData, error: checkoutError } = await supabase
        .from("co")
        .insert({
          ic_cust: user.id,
          cust: getName[0].username,
          produk: getNameProduk,
          total: totalPrice,
        })
        .select();

      if (checkoutError) {
        console.error("Error during checkout:", checkoutError.message);
        return;
      }

      await deleteCheckedItems();
      alert("Checkout success!");
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkedItems]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-5">
        <Link to={"/"}>
          <button className="btn btn-square btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Link>
      </div>
      <h2 className="text-center text-2xl font-bold ">CART</h2>
      {getCart.map((cart) => (
        <div
          key={cart.id}
          className="card card-side bg-base-100 shadow-xl mt-5 m-5 border max-sm:flex max-sm:flex-col"
        >
          <input
            type="checkbox"
            className="checkbox checkbox-error m-5 mt-24 max-sm:mt-5"
            checked={checkedItems.includes(cart.id)}
            onChange={() => handleCheckboxChange(cart.id)}
          />
          <figure className="w-24 ml-4 rounded-2xl">
            <img
              className="rounded-xl w-20 max-sm:ml-52"
              src={image(cart.gambar)}
              alt={cart.gambar}
            />
          </figure>
          <div className="card-body">
            <h2 className="font-semibold ">{cart.produk}</h2>
            <p className="text-green-500 text-xl">
              ${cart.harga * cart.jumlah}
              <span className="text-lg ml-10 text-slate-500">
                {cart.jumlah}x
              </span>
            </p>
            <div className="flex justify-between w-10 h-12 gap-2 ">
              <button
                className="btn btn-outline btn-error"
                onClick={() => decreaseQuantity(cart.id, cart.jumlah)}
              >
                <FiMinus className="-m-5" />
              </button>
              <input
                type="text"
                className="w-14 rounded-lg border text-center bg-black text-white"
                value={cart.jumlah}
                readOnly
              />
              <button
                className="btn btn-outline btn-success"
                onClick={() => increaseQuantity(cart.id, cart.jumlah)}
              >
                <IoAdd className="-m-5" />
              </button>
            </div>
          </div>

          <div className="card-actions justify-end p-5 mt-32 max-sm:mt-2">
            <button
              className="btn btn-outline btn-error"
              onClick={() => deleteCart(cart.id)}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-lg w-full total-price-sticky border p-6 shadow-md md:mt-0">
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <p className="mb-1 text-lg font-bold">${totalPrice}</p>
        </div>
        <form onSubmit={handleCheckout}>
          <button className="btn btn-outline btn-success w-full mt-3">
            Check out
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
