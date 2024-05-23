import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../supabase/createClient";

const HistoriPage = () => {
  const { user, role } = useAuth();
  const [pesanan, setPesanan] = useState([]);

  async function fetchPesanan() {
    try {
      let pesananData;
      if (role === "admin") {
        const { data, error } = await supabase.from("co").select("*");
        if (error) {
          throw error;
        }
        pesananData = data;
      } else {
        const { data, error } = await supabase
          .from("co")
          .select("*")
          .eq("ic_cust", user.id);
        if (error) {
          throw error;
        }
        pesananData = data;
      }
      setPesanan(pesananData);
    } catch (error) {
      console.error("Error fetching pesanan:", error.message);
    }
  }

  async function deletePesanan(pesananId) {
    try {
      const { error } = await supabase.from("co").delete().eq("id", pesananId);
      if (error) {
        throw error;
      }
      // Update state pesanan setelah penghapusan berhasil
      setPesanan(pesanan.filter((item) => item.id !== pesananId));
    } catch (error) {
      console.error("Error deleting pesanan:", error.message);
    }
  }

  useEffect(() => {
    fetchPesanan();
  }, []);

  return (
    <div className="bg-histori h-screen">
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
      <h4 className="text-center font-bold text-2xl text-white m-5">
        SHOPPING HISTORY
      </h4>
      {role === "admin" ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white">
                <th>No</th>
                <th>Name</th>
                <th>Product</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pesanan.map((co, index) => (
                <tr key={index} className="text-white">
                  <th>{index + 1}</th>
                  <td>{co.cust}</td>
                  <td>{co.produk}</td>
                  <td>$ {co.total}</td>

                  <td>
                    <button
                      className="btn btn-error btn-outline btn-xs"
                      onClick={() => deletePesanan(co.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-white">
                <th>No</th>
                <th>Name</th>
                <th>Product</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {pesanan.map((co, index) => (
                <tr key={index} className="text-white">
                  <th>{index + 1}</th>
                  <td>{co.cust}</td>
                  <td>{co.produk}</td>
                  <td>$ {co.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoriPage;
