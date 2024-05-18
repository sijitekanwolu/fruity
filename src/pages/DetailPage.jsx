import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/createClient";
import { useAuth } from "../auth/AuthProvider";

const DetailPage = () => {
  const { id } = useParams();
  const getId = parseInt(id);

  const [getDetail, setGetDetail] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log(getDetail);
  useEffect(() => {
    fetchDetail();
  }, []);

  async function fetchDetail() {
    try {
      const { data, error } = await supabase
        .from("selai")
        .select()
        .eq("id", getId);

      if (error) throw error;
      setGetDetail(data);
    } catch (error) {
      console.error("tidak memuat detail:", error.message);
    }
  }

  async function addToCart() {
    console.log(getDetail[0].produk);
    try {
      const { data, error } = await supabase
        .from("keranjang")
        .insert([
          {
            id_cust: user.id,
            produk: getDetail[0].produk,
            harga: getDetail[0].harga,
            jumlah: quantity,
            gambar: getDetail[0].gambar,
          },
        ])
        .select();

      if (error) {
        throw error;
      } else {
        alert("Produk berhasil ditambahkan ke keranjang!");
        navigate("/");
      }
    } catch (error) {
      console.error("Gagal menambahkan produk ke keranjang:", error.message);
    }
  }

  const image = (filename) => {
    console.log(filename);
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

  return (
    <section className="flex flex-col">
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
      <div className="flex max-sm:flex-col justify-center items-center mt-10">
        {getDetail.map((detail) => (
          <div
            key={detail.id}
            className="card max-sm:flex max-sm:justify-center max-sm:items-center max-sm:flex-col card-side bg-base-100 shadow-xl w-full md:w-4/5"
          >
            <div className="w-1/2">
              <figure>
                <img
                  className="h-96 w-96 rounded-xl object-cover "
                  src={image(detail.gambar)}
                  alt={detail.gambar}
                />
              </figure>
            </div>
            <div className="w-1/2">
              <div className="card-body">
                <h4 className="text-sm">⭐ {detail.reting}</h4>
                <h2 className="card-title font-semibold max-sm:text-base">
                  {detail.produk}
                </h2>

                <p className="max-sm:text-sm">{detail.deskripsi}</p>
                <p className="text-2xl font-medium  max-sm:-mt-0 text-green-500">
                  ${detail.harga}
                </p>
                <div className="flex justify-between w-40 ">
                  <button
                    className="btn btn-outline btn-error"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-14 rounded-lg border text-center text-white bg-black"
                  />
                  <button
                    className="btn btn-outline btn-success"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-outline mt-5 btn-error"
                    data-tip="Click to add items"
                    onClick={addToCart}
                  >
                    Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailPage;
