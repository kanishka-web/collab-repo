import React, { useState,useEffect } from "react";
import "./TableForm.css"
import moment from 'moment';

const saveDataToAPI = (data) => {
  return fetch('/api/weekly-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const FillWeeklyData = (props) => {
  const { tableId,weeklyData,weeklyEntry,projects } =
  props;
  console.log(projects);
  // console.log(weeklyData);
  const currentWeek = moment().isoWeek();
  //const selectedWeek = moment().startOf('year').add(colIndex, 'weeks').week();
  const [textareaData, setTextareaData] = useState(
    Array.from({ length: 2 }, () => Array.from({ length: 52 }, () => ""))
  );
  const [tablesData, setTablesData] = useState({});
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [displayData, setDisplayData] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [savedData, setSavedData] = useState({}); 



  const handleTextareaChange = (event, rowIndex, colIndex) => {
    const newData = [...textareaData];
    newData[rowIndex][colIndex] = event.target.value;
    setTextareaData(newData);
  
     const currentWeek = moment().isoWeek();
     const selectedWeek = moment().startOf('year').add(colIndex, 'weeks').week();
  
    // Disable the input field for past week numbers
    // if (selectedWeek < currentWeek) {
    //   event.target.disabled = true;
    // }
  
     localStorage.setItem(`${tableId}_${selectedOption}_textareaData`, JSON.stringify(newData)); // Save data to local storage with unique key
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplayData(true);
    try {
      await saveDataToAPI(textareaData); // Call the saveDataToAPI function with the data to be saved
      setSavedData(textareaData);
      localStorage.setItem(`${tableId}_${selectedOption}_textareaData`, JSON.stringify(textareaData));
    } catch (error) {
      console.error(error);
      alert('Failed to save data to API.');
    }
  };
  
  
  // Retrieve data from local storage on page load
  useEffect(() => {
    const savedData = localStorage.getItem(`${tableId}_${selectedOption}_textareaData`); // Retrieve data with unique key
    if (savedData) {
      setTextareaData(JSON.parse(savedData));
    }
  }, [tableId, selectedOption]);
  
  const handleClear = () => {
    setTextareaData(Array.from({ length: 2 }, () => Array.from({ length: 52 }, () => "")));
    setDisplayData(false);
    //axios.post("/sendData",Data) // Todo
    localStorage.removeItem(`${tableId}_${selectedOption}_textareaData`); // Remove data from local storage with unique key
  };
  
//const handleClear = () => {
//setTextareaData(Array.from({ length: 2 }, () => Array.from({ length: 52 }, () => '')));
//setDisplayData(false);
//localStorage.removeItem(${tableId}_${selectedOption}_textareaData);
//localStorage.removeItem(${tableId}_${selectedOption}_weekNumbers);
const handleOptionSelect = (event) => {
  const selectedValue = event.target.value;
  setSelectedOption(selectedValue);
  if (selectedValue !== '') {
  const newData = { ...tablesData };
  if (!newData[selectedValue]) {
  newData[selectedValue] = Array.from({ length: 2 }, () => Array.from({ length: 52 }, () => ''));
  localStorage.setItem(`${tableId}_${selectedValue}_weekNumbers`, JSON.stringify(Array.from({ length: 52 }, (_, index) => moment().startOf('year').add(index, 'weeks').week())));
  } else {
    const weekNumbers = JSON.parse(localStorage.getItem(`${tableId}_${selectedValue}_weekNumbers`));
    newData[selectedValue] = newData[selectedValue].map((row, rowIndex) => row.map((cell, colIndex) => cell || weekNumbers[colIndex]));
  }
  setTablesData(newData);
  setSelectedTableData(newData[selectedValue] || textareaData);
  setDisplayData(false);
  } else {
  setSelectedTableData([]);
  }
  };

  // const handleOptionSelect = (event) => {
  //   const selectedValue = event.target.value;
  //   setSelectedOption(selectedValue);
  //   if (selectedValue !== "") {
  //     const newData = { ...tablesData };
  //     if (!newData[selectedValue]) {
  //       newData[selectedValue] = Array.from({ length: 2 }, () => Array.from({ length: 52 }, () => ""));
  //     }
  //     setTablesData(newData);
  //     setSelectedTableData(newData[selectedValue] || textareaData);
  //     setDisplayData(false);
  //   } else {
  //     setSelectedTableData([]);
  //   }
  // };
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg" data-bs-theme="dark" style={{ background: "#4da6ff", width: "9100px" }}>
  <div class="container-fluid">
    <h2 class="navbar-brand">Weekly Data</h2>
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <select class="form-select" value={selectedOption} onChange={handleOptionSelect}>
           <option value="">Select an option</option> 
          {
            projects.map((project)=>
            {
              return(
                <option key={project._id} value={project.name}>{project.name}</option>
              )
            }
            )
}
        </select>
      </li>
      <li><h3>{selectedOption !== "" ? `Project: ${selectedOption}` : "Project:"}</h3></li>
    </ul>
  </div>
</nav>
        {selectedOption !== "" && (
        <form onSubmit={handleSubmit}>
          <table id={selectedOption}>
          <thead>
  <tr>
    <th>Week</th>
    {Array.from({ length: 52 }, (_, index) => (
      <th key={index}>#{moment().startOf('year').add(index, 'weeks').week()}</th>
    ))}
  </tr>
</thead>
            <tbody>
              {Array.from({ length: 2 }, (_, rowIndex) => {
                const row = Array.from({ length: 52 }, (_, colIndex) =>
                  textareaData[rowIndex]?.[colIndex] || ""
                );
                return (
                  <tr key={rowIndex}>
                    <td>{rowIndex === 0 ? 'Actual' : 'Planned'}</td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex}>
                        <input
                          value={cell} disabled={currentWeek>colIndex+1}
                          onChange={(event) =>
                            handleTextareaChange(event, rowIndex, colIndex)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="submit">Save Data</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </form>
      )}
     
      {displayData && (
        <div>
          <h2>Saved Data:</h2>
          <table style={{ overflow:'auto', maxWidth:'1200px',maxHeight: '300px' }}>
            <thead>
              <tr>
                <th>Week</th>
                {Array.from({ length: 52 }, (_, index) => (
                  <th key={index}>#{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex === 0 ? 'Actual' : 'Planned'}</td>
                  {savedData[rowIndex]?.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
   
    </div>
    
  );
};
export default FillWeeklyData;
