import { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = (props) => {
  const [doctorSpec, setDoctorSpec] = useState("");

  const contextValue = {
    doctorSpec,
    setDoctorSpec,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
