import axios from "axios";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/createClient";

const MenuPage = () => {
  const [getSelai, setGetSelai] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  async function fetchSelai() {
    const { data } = await supabase.from("selai").select("*");
    setGetSelai(data);
  }

  const truncate = (str, maxLength, trunc) => {
    if (str.length > maxLength) {
      return `${str.substring(0, trunc)}...`;
    } else {
      return str;
    }
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getSelai.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchSelai();
    setTimeout(() => {
      setLoading();
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="justify-center flex flex-col items-center h-screen">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <h2 className="mt-2 text-sm">Loading...</h2>
        </div>
      ) : (
        <div className="w-full flex flex-col px-5">
          <h2 className="font-bold m-5 text-center ">JAMS</h2>
          <div className="grid max-md:grid-cols-2 grid-cols-4 gap-10 my-5">
            {currentItems.map((selai) => (
              <Link to={`/detail/${selai.id}`}>
                <div className="card bg-base-100   bg-gray-700/45 shadow-xl hover:scale-105">
                  <figure>
                    <img
                      className="object-cover h-40 w-full"
                      src={image(selai.gambar)}
                      alt={selai.gambar}
                    />
                  </figure>
                  <div className="card-body">
                    <p className="text-xs hidden max-md:block">
                      ⭐ {selai.reting}
                    </p>
                    <h2 className="text-sm hidden max-md:block font-semibold">
                      {truncate(selai.produk, 10, 10)}
                    </h2>
                    <h2 className="card-title text-sm max-sm:hidden justify-between">
                      {selai.produk}
                      <div>⭐ {selai.reting}</div>
                    </h2>
                    <p className="text-xs max-sm:hidden">
                      {truncate(selai.deskripsi, 35, 35)}
                    </p>
                    <p className="text-xs hidden max-md:block">
                      {truncate(selai.deskripsi, 15, 15)}
                    </p>
                    <p className="text-green-500 font-semibold text-lg hidden max-md:block">
                      ${selai.harga}
                    </p>
                    <div className="card-actions justify-between mt-2 items-center">
                      <button className="btn btn-outline max-sm:btn-sm max-sm:text-xs btn-bg-gray-400">
                        Add to cart
                      </button>
                      <div className="text-green-500 font-semibold text-lg max-sm:hidden">
                        ${selai.harga}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="join items-center justify-center mb-5">
            {Array.from(
              { length: Math.ceil(getSelai.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className="join-item btn"
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MenuPage;
