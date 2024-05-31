import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const times = [
    { "id": 1, "time": "10:00 AM", "available": true },
    { "id": 2, "time": "11:00 AM", "available": false },
    { "id": 3, "time": "12:00 PM", "available": true },
    { "id": 4, "time": "01:00 PM", "available": true },
    { "id": 5, "time": "02:00 PM", "available": false }
  ]
  

function DoctorDetails({ DoctorDet }) {
  const [disable, setDisable] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBookNow = (time) => {
    setSelectedTime(time);
    console.log("Book Now clicked for time:", time);
  };

  return (
    <MentStyled>
      <InnerLayout className="main">
        <div class="w-full max-w-sm bg-white border mx-auto my-auto border-gray-200 rounded-lg shadow dark:bg-white dark:border-white-700">
          <div class="flex justify-end px-4 pt-4"></div>
          <div class="flex flex-col items-center pb-10">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={DoctorDet.imageUri}
              alt="Bonnie image"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900">
              {DoctorDet.name}
            </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {DoctorDet.specialisation}
            </span>

            <p className="text-gray-700 text-base">
              {" "}
              Experience: {DoctorDet.experience}
            </p>

            <p className="text-gray-900 leading-none">{DoctorDet.address}</p>
            <div class="flex mt-4 md:mt-6">
              
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-8 rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Availability
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time.id} className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap">{time.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {time.available ? "Available" : "Not Available"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {time.available && (
                  <button
                    onClick={() => handleBookNow(time)}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Book Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </InnerLayout>
    </MentStyled>
  );
}

const MentStyled = styled.nav`
  .nav h3 {
    color: #494949;
  }
  .main {
    flex: 1;
    min-height: 100vh;
    padding-bottom: 15vh;
    position: relative;
  }

  .main .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    padding: 20px;
    /* color: white; */
  }

  .main-container {
    max-width: 900px;
    /* padding: -70px; */
    margin: -33px 88px;
    color: black;
  }

  .main .greet {
    margin: 50px 0px;
    font-size: 40px;
    color: #928989;
    font-weight: 540;
    padding: 20px;
  }

  .main .greet span {
    background: -webkit-linear-gradient(16deg, #4b90ff, #ff5546);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 900px;
    padding: 0px 20px;
    margin: 60px -48px;
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: #f0f4f9;
    margin: 10px 40px;
    padding: 7px 17px;
    border-radius: 50px;
    /* margin-right: 70px */
  }

  .search-box img {
    width: 24px;
    cursor: pointer;
  }

  .search-box input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 9px;
    font-size: 18px;
  }

  .search-box div {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .main .bottom-info {
    font-size: 13px;
    margin: 15px;
    text-align: center;
    font-weight: 300px;
  }

  .result {
    padding: 0px 5%;
    max-height: 70vh;
    overflow-y: scroll;
  }

  .result::-webkit-scrollbar {
    display: none;
  }

  .result-title {
    margin: 40px 0px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .result img {
    width: 40px;
    border-radius: 50%;
  }

  .result-data {
    display: flex;
    align-items: start;
    gap: 20px;
  }

  .loader {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .loader hr {
    border-radius: 4px;
    border: none;
    background-color: #f6f7f8;
    background: linear-gradient(to right, #d5a8ff, #f6f7f8, #d5a8ff);
    background-size: 800px 50px;
    height: 20px;
    animation: loader 3s infinite linear;
  }
  @keyframes loader {
    0% {
      background-position: -800px 0px;
    }
    100% {
      background-position: 800px 0px;
    }
  }
  .result-data p {
    font-size: 17px;
    font-weight: 300;
    line-height: 1.8;
  }
`;

export default DoctorDetails;
