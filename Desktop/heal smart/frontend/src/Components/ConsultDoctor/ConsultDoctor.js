import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DoctorDetails from "../DoctorDetails/DoctorDetails";
import { FilterContext } from "../../context/FilterContext";

function ConsultDoctor({ updateFilter }) {
  const { doctorSpec, setDoctorSpec } = useContext(FilterContext);

  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorSpec);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [DoctorDet, setDoctorDet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(doctors);
        setDoctors(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const notify = (item) => {
    setDoctorDet(item);
    setShowDoctorDetails(true);
  };
  console.log(doctors);
  const filters = [
    "Dermatologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Rheumatologist",
    "Neurologist",
    "Pulmonologist",
    "Cardiologist",
  ];

  const handleFilterChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const filterItems = () => {
    if (selectedDoctor) {
      setFilteredItems(
        doctors.filter((doctor) => doctor.specialisation === selectedDoctor)
      );
    } else {
      setFilteredItems(doctors);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedDoctor, doctors]);

  return (
    <>
      {!showDoctorDetails && (
        <DashboardStyled>
          <div className="heading">
            <h2>Consult Doctor</h2>
          </div>
          <InnerLayout>
            <div>
              <select
                value={selectedDoctor}
                onChange={handleFilterChange}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a filter</option>
                {filters.map((filter, idx) => (
                  <option key={`filter-${idx}`} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>

              <div className="flex flex-col space-y-4 mt-4 w-full">
                {filteredItems.map((item, idx) => {
                  const randomRating = Math.floor(Math.random() * 5) + 1;
                  return (
                    <div key={`items-${idx}`} className="w-full lg:flex">
                      <div
                        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-lg lg:rounded-t-none lg:rounded-lg text-center overflow-hidden"
                        style={{
                          backgroundImage: `url(${item.imageUri})`,
                        }}
                      ></div>

                      <div className="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
                        <div className="mb-8 flex">
                          <div className="ml-4">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"></div>

                            <p className="text-gray-900 font-bold text-xl mb-2">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              {item.specialisation}
                            </p>
                            <p className="text-gray-700 text-base">
                              {item.experience}
                            </p>

                            <div className="flex items-center mt-2">
                              {[...Array(randomRating)].map((_, i) => (
                                <FaStar
                                  key={`star-${i}`}
                                  className="text-yellow-500"
                                />
                              ))}
                              {[...Array(5 - randomRating)].map((_, i) => (
                                <FaStar
                                  key={`star-empty-${i}`}
                                  className="text-gray-400"
                                />
                              ))}
                            </div>
                            <div className="flex items-center mt-4">
                              <div className="text-sm">
                                <p className="text-gray-900 leading-none">
                                  {item.address}
                                </p>
                                <p className="text-gray-600">{item.timings}</p>
                                <button
                                  onClick={() => notify(item)}
                                  className="bg-purple-500 mt-2 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                  See All Timings
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ToastContainer />
          </InnerLayout>
        </DashboardStyled>
      )}
      {showDoctorDetails && <DoctorDetails DoctorDet={DoctorDet} />}
    </>
  );
}

const DashboardStyled = styled.div`
  .heading h2 {
    font-size: 29px;
    color: darkviolet;
    font-weight: 605;
    margin: 25px -17px;
    padding: 1rem 1.5rem;
    width: 100%;
  }
`;

export default ConsultDoctor;
