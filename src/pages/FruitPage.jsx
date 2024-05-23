import axios from "axios";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";

const FruitPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(4);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getData = async () => {
    try {
      const res = await axios.get(`https://fruityvice.com/api/fruit/all`);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
        <div className="w-full flex flex-col px-5 ">
          {/* <h2 className="font-bold m-5 text-center">FRUIT NUTRITION</h2> */}
          <div className="flex flex-wrap gap-10 justify-center items-center my-5">
            {currentData.map((fruit, index) => (
              <div className="card w-64 bg-base-100 bg-card shadow-xl hover:scale-105">
                <div className="card-body">
                  <h2 className="card-title-mt-2 font-semibold text-center text-white">
                    {fruit.name}
                  </h2>
                  <h2 className="text-white text-sm">Nutritions:</h2>
                  <p className="text-xs text-white">
                    Calories: {fruit.nutritions.calories}
                  </p>
                  <p className="text-xs text-white">
                    Fat: {fruit.nutritions.fat}
                  </p>
                  <p className="text-xs text-white">
                    Sugar: {fruit.nutritions.sugar}
                  </p>
                  <p className="text-xs text-white">
                    Carbohydrates: {fruit.nutritions.carbohydrates}
                  </p>
                  <p className="text-xs text-white">
                    Protein: {fruit.nutritions.protein}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="join items-center justify-center">
            {Array.from(
              { length: Math.ceil(data.length / itemPerPage) },
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

export default FruitPage;
