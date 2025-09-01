import React from "react";
import { useEffect, useState } from "react";

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);

  const getSubBreedsByBreeds = (breed) => {
    setSelectedDog(dogs[breed]);
    console.log(dogs[breed]);
  };

  useEffect(() => {
    const getBreeds = async () => {
      const url = "https://dog.ceo/api/breeds/list/all";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setDogs(result.message);
        localStorage.setItem("dogsData", JSON.stringify(result.message));
      } catch (error) {
        console.error(error.message);
      }
    };

    const data = JSON.parse(localStorage.getItem("dogsData"));
    data ? setDogs(data) : getBreeds();
  }, []);

  return (
    <>
      <div>
        {Object.keys(dogs).map((dog) => (
          <div onClick={() => getSubBreedsByBreeds(dog)}>{dog}</div>
        ))}
      </div>
      {selectedDog.length > 0 && (
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            position: "absolute",
            top:'50%',
            zIndex:'2'
          }}
        >
          {selectedDog.map((subBreed) => (
            <div style={{ color: "red" }}>{subBreed}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dogs;
