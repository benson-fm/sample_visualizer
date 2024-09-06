import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [location, setLocation] = useState("");
  const [dataloc, setDataLoc] = useState([]);

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return alert("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      console.log(parsedData);
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  // Function to filter data based on location
  // const dataFromIndex = () => {
  //   const filteredData = data.filter(item => item["Shipping Box Number"] === location);
  //   setDataLoc(filteredData);
  // };

  // Update dataloc whenever data or location changes
  // useEffect(() => {
  //   if (data.length > 0 && location) {
  //     dataFromIndex();
  //     console.log(dataloc)
  //   }
  // }, [data, location]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="App">
      <div className="flex-col flex justify-center items-center gap-5">
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File | 599-599-0 no circle
        </label>
        <input
          className="flex items-center"
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <input
            className="border"
            name="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleParse}>Parse</button>
        </div>
        <div className="h-48" style={{ marginTop: "3rem" }}>
          {error
            ? error
            : data.length > 0 && (
                <div className="flex flex-col justify-center w-full h-auto text-8xl gap-20">
                  <p
                    onClick={() =>
                      navigator.clipboard.writeText(data[currentIndex]["PMGRC"])
                    }
                  >
                    {data[currentIndex]["PMGRC"]}
                  </p>
                  {/* <p>{dataloc[currentIndex]["Location"]}</p> "Patient ID 1 (First Name)"*/}
                </div>
              )}
        </div>
        <div className="flex flex-row gap-10 justify-center">
          <button
            onClick={handlePrev}
            // disabled={currentIndex <= 0}
            className="h-12 w-32 rounded-lg bg-blue-300 text-lg"
          >
            PREVIOUS
          </button>
          <button
            onClick={handleNext}
            // disabled={currentIndex >= dataloc.length - 1}
            className="h-12 w-24 rounded-lg bg-blue-300 text-lg"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
