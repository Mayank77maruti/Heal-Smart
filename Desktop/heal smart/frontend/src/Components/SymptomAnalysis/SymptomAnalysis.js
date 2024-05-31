import React, { useState, useContext } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import AIConsult from "./AIConsult";
import { notes } from "../../utils/Icons";
import { FilterContext } from "../../context/FilterContext";
import { AIContext } from "../../context/AIContext";

let DiseaseMapping = {
  Psoriasis: "Dermatologist",

  Impetigo: "Dermatologist",

  "Heart Attack": "Cardiologist",

  Hypertension: "Cardiologist",

  Diabetes: "Endocrinologist",

  Hypothyroidism: "Endocrinologist",

  Gastroenteritis: "Gastroenterologist",

  Jaundice: "Gastroenterologist",

  Osteoarthristis: "Rheumatologist",

  "Cervical spondylosis": "Neurologist",

  "(vertigo) Paroymsal  Positional Vertigo": "Neurologist",

  "Bronchial Asthma": "Pulmonologist",
};

function SymptomAnalysis({ updateActive }) {
  const { doctorSpec, setDoctorSpec } = useContext(FilterContext);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [diagnosis, setDiagnosis] = useState("undefined");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [consultAI, setConsultAI] = useState(false);

  // Function to handle selection of symptoms
  const handleSelectSymptom = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Function to handle removal of selected symptom
  const handleRemoveSymptom = (symptomToRemove) => {
    const updatedSymptoms = selectedSymptoms.filter(
      (symptom) => symptom !== symptomToRemove
    );
    setSelectedSymptoms(updatedSymptoms);
  };

  // Function to handle submission
  const handleSubmit = () => {
    console.log("Selected symptoms:", selectedSymptoms);

    const data = {
      symptoms: selectedSymptoms,
    };

    const url = "https://heal-smart-server.onrender.com/predict";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        setDiagnosis(data.prediction);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    setSubmitted(true);
  };

  const handleConsultDoctor = () => {
    console.log("diagnosis : ", diagnosis);
    if (diagnosis != "undefined" || diagnosis != undefined) {
      console.log(DiseaseMapping[diagnosis]);
      setDoctorSpec(DiseaseMapping[diagnosis]);
    }
    updateActive(4);
  };
  const handleConsultAI = () => {
    setConsultAI(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = symptoms.filter((symptom) =>
      symptom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSymptoms(filtered);
  };

  // Mocked symptom data
  const symptoms = [
    "abdominal_pain",
    "abnormal_menstruation",
    "altered_sensorium",
    "back_pain",
    "belly_pain",
    "bladder_discomfort",
    "blister",
    "breathlessness",
    "brittle_nails",
    "burning_micturition",
    "chest_pain",
    "continuous_feel_of_urine",
    "cough",
    "dark_urine",
    "dehydration",
    "depression",
    "diarrhoea",
    "dischromic_patches",
    "enlarged_thyroid",
    "family_history",
    "fatigue",
    "foul_smell_ofurine",
    "headache",
    "hip_joint_pain",
    "increased_appetite",
    "inflammatory_nails",
    "internal_itching",
    "irritability",
    "itching",
    "joint_pain",
    "knee_pain",
    "lack_of_concentration",
    "loss_of_balance",
    "loss_of_smell",
    "mucoid_sputum",
    "muscle_pain",
    "nausea",
    "painful_walking",
    "passage_of_gases",
    "polyuria",
    "red_sore_around_nose",
    "red_spots_over_body",
    "rusty_sputum",
    "silver_like_dusting",
    "skin_peeling",
    "skin_rash",
    "small_dents_in_nails",
    "spinning_movements",
    "spotting_urination",
    "sunken_eyes",
    "swelling_joints",
    "swollen_extremeties",
    "toxic_look_(typhos)",
    "unsteadiness",
    "vomiting",
    "watering_from_eyes",
    "weakness_in_limbs",
    "weakness_of_one_body_side",
    "yellow_crust_ooze",
    "yellowish_skin",
  ];

  return (
    <>
      {!submitted && (
        <SymptomAnalysisStyled>
          <div className="heading">
            <h2>Symptom Analysis</h2>
          </div>
          <div className="desc">
            <p>
              Experience instant clarity with our Symptom Analysis feature. Just
              enter your symptoms, and within moments, receive precise
              recommendations and insights tailored to you.{" "}
            </p>
          </div>
          <div className="boxi">
            <SearchBar
              type="text"
              placeholder="Search your symptoms"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {searchQuery.length > 1 && (
              <SymptomList>
                {filteredSymptoms.map((symptom, index) => (
                  <SymptomItem
                    key={index}
                    onClick={() => handleSelectSymptom(symptom)}
                  >
                    {symptom}
                  </SymptomItem>
                ))}
              </SymptomList>
            )}
            <SelectedSymptoms>
              {selectedSymptoms.map((symptom, index) => (
                <SelectedSymptom key={index}>
                  {symptom}
                  <RemoveButton onClick={() => handleRemoveSymptom(symptom)}>
                    X
                  </RemoveButton>
                </SelectedSymptom>
              ))}
            </SelectedSymptoms>
            <SubmitButton
              className="bg-purple-500 mt-2 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleSubmit}
            >
              Analyze
            </SubmitButton>
          </div>
        </SymptomAnalysisStyled>
      )}
      {submitted && !consultAI && (
        <Divv>
        <div className="head">
        Analysis report:
      </div>
        <Diagnosis>
          <Dig>
            <p>{notes}</p>
            {diagnosis != "undefined" ? (
              <>
                <p>
                  It seems like you may be experiencing symptoms of{" "}
                  <strong>{diagnosis}</strong>.
                </p>
                <p>Please consult a {DiseaseMapping[diagnosis]}.</p>
              </>
            ) : (
              "Your symptoms do not match any disease. Please consult a doctor."
            )}
          </Dig>
          <div className="consultation-options">
            <div className="consultation-option">
              <p>Would you like assistance in finding a doctor nearby?</p>
              <ConsultDoctorButton onClick={handleConsultDoctor}>
                Yes, please find me a doctor
              </ConsultDoctorButton>
            </div>
            <div className="consultation-option">
              <p>Would you like any AI assistance regarding your symptoms?</p>
              <ConsultAI onClick={handleConsultAI}>
                Yes, get me AI assistance
              </ConsultAI>
            </div>
          </div>
        </Diagnosis>
        </Divv>
      )}
      {consultAI && (
        <AIConsult
          symptoms={selectedSymptoms}
          diagnosis={diagnosis}
        ></AIConsult>
      )}
    </>
  );
}

const Divv = styled.div`
  .head{
    color: darkviolet;
    font-size: 25px;
    font-weight: 605;
    margin: 50px 40px;
  }
`;


const SymptomAnalysisStyled = styled.div`
  .heading h2 {
    font-size: 29px;
    color: darkviolet;
    font-weight: 605;
    margin: 25px 20px;
    padding: 1rem 1.5rem;
    width: 100%;
  }

  .desc {
    margin: 45px 45px;
    display: flex;
    align-items: center;
    color: #222260;
    font-weight: 400;
    font-size: 20px;
  }
  .boxi{
    margin:50px 50px;
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  color: purple;
  background-color: #e6d6fa;
  border: 1.3px solid rgb(168 85 247);
  border-radius: 0.375rem;
`;

const SymptomList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: space-around;
  flex-wrap: wrap;
  align-items: center;
`;

const SymptomItem = styled.div`
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  border: 1px solid rgb(165 85 247);
  background-color: darkviolet;
  border-radius: 10px;
  padding: 9px;
  color: white;
  margin: 6px;
`;

const SelectedSymptoms = styled.div`
  min-height: 50px;
  margin: 5px;
  margin-top: 20px;
  color: purple;
  border: 1.3px solid rgb(168 85 247);
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.375rem;
  justify-content: flex-start;
  align-content: space-around;
  align-items: center;
`;

const SelectedSymptom = styled.span`
  margin: 5px;
  padding: 5px;
  font-size: 15px;
  font-weight: 400;
  border: 1px solid rgb(165 85 247);
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  margin-left: 5px;
  padding: 3px;
  /* background-color: green; */
  border: none;
  color: darkblue;
  border-radius: 999px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  margin: 50px auto;
`;

const Diagnosis = styled.div`
  margin: 4px 0px;
  text-align: center;
  color: #222260;
  font-weight: 400;
  font-size: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .consultation-options {
    margin: 60px 25px;
    display: flex;
    justify-content: space-between;
  }

  .consultation-option {
    flex: 1;
    margin-right: 18px; /* Adjust spacing between cards */
    cursor: pointer;
  }
`;

const Dig = styled.div`
  padding: 15px;
  color: white;
  border: 1px solid darkviolet;
  border-radius: 5px;
  font-size: 23px;
  // max-width: 10rem;
  background-color: darkviolet;
  margin: 38px auto;
`;

const ConsultDoctorButton = styled.button`
  padding: 10px 20px;
  background-color: #222260;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: white;
    color: darkviolet;
  }
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ConsultAI = styled.button`
  padding: 10px 20px;
  background-color: #222260;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: white;
    color: darkviolet;
  }
  margin-top: 20px;
`;

export default SymptomAnalysis;
