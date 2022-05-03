import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const [formInfo, setFormInfo] = useState({
    firstname: "",
    race: "",
    age: ""
  })

  useEffect(() => {
  const data = localStorage.getItem("formList")
   if (data) setFormInfo(JSON.parse(data))
  }, [])


  useEffect(() => {
     localStorage.setItem("formInfo", JSON.stringify(formList))
    }, [formInfo])
  

  const [formList, setFormList] = useState([])

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
  }



  const handleSubmit = (e) => {
    e.prevenDefault();
    setFormList([...formList, formInfo]);

    setFormInfo({
      firstname: "",
      race: "",
      age: ""
    })

  }
  return (
    <div className="App">
      <h1>CAPTURE DATA APP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>FIRST NAME: </label>
          <input type="text"
            placeholder="First Name"
            name="firstname"
            value={formInfo.firstname}
            onChange={handleChange}
          />

        </div>
        <div>
          <label>RACE: </label>

          <input type="text"
            placeholder="Race"
            name="race"
            value={formInfo.race}
            onChange={handleChange}
          />

        </div>
        <div>
          <label>AGE: </label>

          <input type="number"
            placeholder="Age"
            name="age"
            value={formInfo.age}
            onChange={handleChange}
          />

        </div>

        <button type="submit">Submit</button>
      </form>

      {formList.map((item, index) => {
        return (
          <ul key={index}>
            <li>FIRST NAME:{item.firstname}</li>
            <li>RACE:{item.race}</li>
            <li>AGE: {item.age}</li>


          </ul>
        )
      })}

    </div>
  );
}

export default App;
