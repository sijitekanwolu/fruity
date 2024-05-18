import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/createClient";
import { v4 as uuidv4 } from "uuid";

const CreatePage = () => {
  const [selais, setSelais] = useState([]);

  const [imageUpload, setImageUpload] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  async function fetchSelais() {
    const { data } = await supabase.from("selai").select("*");
    setSelais(data);
  }

  const truncate = (str, maxLength, trunc) => {
    if (str.length > maxLength) {
      return `${str.substring(0, trunc)}...`;
    } else {
      return str;
    }
  };

  const [selai, setSelai] = useState({
    produk: "",
    harga: "",
    reting: "",
    deskripsi: "",
    gambar: "",
  });

  useEffect(() => {
    fetchSelais();
  }, []);

  function handleChange(event) {
    setSelai((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChange2(event) {
    setSelai((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function createData(e) {
    e.preventDefault();

    const filename = `${uuidv4(imageUpload.name)}`;

    try {
      const { data } = await supabase.storage
        .from("image_produk")
        .upload(`images/${filename}`, imageUpload, {
          cacheControl: "3600",
          upsert: true,
        });
      if (data) {
        console.log("Upload images suksess");
      }
    } catch (error) {
      console.log(error);
    }

    const { error } = await supabase.from("selai").insert([
      {
        produk: selai.produk,
        harga: selai.harga,
        reting: selai.reting,
        deskripsi: selai.deskripsi,
        gambar: filename,
      },
    ]);
    fetchSelais();
    if (!error) {
      window.location.reload();
    }
  }

  async function deleteSelai(selaiId) {
    try {
      const { data: getProductImageById } = await supabase
        .from("selai")
        .select("gambar")
        .eq("id", selaiId);

      const { data: getImage } = await supabase.storage
        .from("image_produk")
        .remove([`images/${getProductImageById[0].images}`]);

      const { error } = await supabase.from("selai").delete().eq("id", selaiId);

      if (!error && getImage) {
        alert("Delete Product Berhasil");
        window.location.reload();
      }

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }

  function displaySelai(selaiId) {
    selais.map((selai) => {
      if (selai.id == selaiId) {
        setSelai({
          id: selai.id,
          produk: selai.produk,
          harga: selai.harga,
          deskripsi: selai.deskripsi,
          reting: selai.reting,
          gambar: selai.gambar,
        });
      }
    });
  }

  async function updateSelais(e) {
    e.preventDefault();

    const filename = `${uuidv4(imageUpload.name)}`;

    if (imageUpload.length === 0) {
      const { error } = await supabase
        .from("selai")
        .update({
          produk: selai.produk,
          harga: selai.harga,
          deskripsi: selai.deskripsi,
          reting: selai.reting,
          gambar: filename,
        })
        .eq("id", selai.id);
      fetchSelais();

      if (!error) {
        alert("Update Produk Berhasil");
        window.location.reload();
      }
    } else {
      const { data: deleteImage } = await supabase.storage
        .from("image_produk")
        .remove([`images/${selai.gambar}`]);

      if (deleteImage) {
        const { data: updateData } = await supabase.storage
          .from("image_produk")
          .upload(`images/${filename}`, imageUpload, {
            cacheControl: "3600",
            upsert: true,
          });

        if (updateData) {
          const { error } = await supabase
            .from("selai")
            .update({
              produk: selai.produk,
              harga: selai.harga,
              deskripsi: selai.deskripsi,
              reting: selai.reting,
              gambar: filename,
            })
            .eq("id", selai.id);
          fetchSelais();

          if (!error) {
            alert("Update Produk Berhasil");
            window.location.reload();
          }
        }
      }
    }
  }

  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImage = (e) => {
    setImageUpload(e.target.files[0]);
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

  return (
    <div className="bg-admin h-full">
      <div className="flex p-5">
        <Link to={"/profile"}>
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
      <h2 className="text-center font-bold text-2xl text-white m-5">
        DATA PRODUCT
      </h2>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="btn mt-5 ml-5 btn-outline
       btn-warning"
      >
        + Add Product
      </button>
      {/* form 1 */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="font-bold text-lg">Add Product</h2>
          </form>
          <form id="form" className="mt-3" onSubmit={createData}>
            <h4>Product</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Enter The Product Name"
              name="produk"
              onChange={handleChange}
            />

            <h4 className="mt-3">Price</h4>
            <input
              className="input input-bordered w-full"
              type="number"
              placeholder="Enter The Product Price"
              name="harga"
              onChange={handleChange}
            />
            <h4 className="mt-3">Description</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Enter The Product Description"
              name="deskripsi"
              onChange={handleChange}
            />
            <h4 className="mt-3">Rating</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Enter The Product rating"
              name="reting"
              onChange={handleChange}
            />
            <h4>Masukan gambar barang</h4>
            <input
              className="file-input file-input-bordered w-full cursor-pointer"
              type="file"
              placeholder="Masukan file"
              onChange={handleImage}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-24 object-cover"
              />
            ) : (
              <>
                <img
                  src={`https://yruxqbmpcpvyxhjkusyt.supabase.co/storage/v1/object/public/image_produk/images/${selai.gambar}`}
                  alt=""
                  className="w-24 object-cover"
                />
              </>
            )}

            <button
              type="submit"
              className="btn mt-3 btn-outline w-full btn-accent"
            >
              Add
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* form 2 */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <h2 className="font-bold text-lg">Edit Product</h2>
          </form>
          <form className="mt-3" onSubmit={updateSelais}>
            <h4>Product</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              name="produk"
              onChange={handleChange2}
              defaultValue={selai.produk}
            />
            <h4 className="mt-3">Price</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              name="harga"
              onChange={handleChange2}
              defaultValue={selai.harga}
            />
            <h4 className="mt-3">Description</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              name="deskripsi"
              onChange={handleChange2}
              defaultValue={selai.deskripsi}
            />
            <h4 className="mt-3">Rating</h4>
            <input
              className="input input-bordered w-full"
              type="text"
              name="reting"
              onChange={handleChange2}
              defaultValue={selai.reting}
            />
            <h4>Images Product</h4>
            <input
              className="file-input file-input-bordered w-full cursor-pointer"
              type="file"
              placeholder="Import File"
              onChange={handleImageUpdate}
              name="images"
              defaultValue={selai.gambar}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-24 object-cover"
              />
            ) : (
              <>
                <img
                  src={`https://yruxqbmpcpvyxhjkusyt.supabase.co/storage/v1/object/public/image_produk/images/${selai.gambar}`}
                  alt=""
                  className="w-24 object-cover"
                />
              </>
            )}

            <button
              type="submit"
              className="btn mt-3 btn-outline w-full btn-accent"
            >
              save changes
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="overflow-x-auto mt-5">
        <table className="table backdrop-blur-md">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>No</th>
              <th>picture Product</th>
              <th>Product</th>
              <th>Price</th>
              <th>Rating</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selais.map((selai, index) => (
              <tr key={index} className="text-xs text-white">
                <th>{index + 1}</th>
                <td>
                  <img
                    src={image(selai.gambar)}
                    alt={selai.gambar}
                    width={100}
                  />
                </td>
                <td>{selai.produk}</td>
                <td>{selai.harga}</td>
                <td>{selai.reting}</td>
                <td>{truncate(selai.deskripsi, 22, 22)}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      deleteSelai(selai.id);
                    }}
                    className="btn sm:btn-sm text-x btn-outline btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      displaySelai(selai.id);
                      document.getElementById("my_modal_4").showModal();
                    }}
                    className="btn sm:btn-sm text-xs btn-outline
            btn-accent"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatePage;
