import './App.css';
import React, { useState, useEffect } from 'react'


function App() {
  const [formInfo, setFormInfo] = useState({
    firstname: "",
    race: "",
    age: ""
  })

  useEffect(() => {
    getItems()
  }, []);

  const [formList, setFormList] = useState([])
  const [dropDown, setDropDown] = useState('')

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
  }


  const handleDropDown = (e) => {
    const value = e.target.value
    setDropDown(value)
  }

  const getItems = () => {
    const storedValues = localStorage.getItem("formInfo");
    if (storedValues) {
      return setFormList(JSON.parse(storedValues))
    } else {
      return []
    }
  }

  const deleteItem = (i) => {
    var removedItem = JSON.parse(localStorage.getItem("formInfo"))
    removedItem.splice(i, 1)
    localStorage.setItem("formInfo", JSON.stringify(removedItem));
    setFormList(removedItem)
  }


  const handleSubmit = (e) => {

    e.preventDefault()
    if (formInfo.firstname === "" || formInfo.race === "" || formInfo.age === "") {
      return
    } else {

      localStorage.setItem("formInfo", JSON.stringify([...formList, formInfo]));
      const storedValues = localStorage.getItem("formInfo");

      setFormList(JSON.parse(storedValues))

      setFormInfo({
        firstname: "",
        race: "",
        age: ""
      })

    }
  }


  return (
    <div className="App">
      <h1>CAPTURE DATA APP</h1>

      <div className='dropdown'>

        <select name="dropdown" onChange={(e) => (handleDropDown(e))}>
          <option disabled selected value="">--Select Based On--</option>
          <option value="firstname">First Name</option>
          <option value="race">Race</option>
          <option value="age">Age</option>
        </select>
      </div>


      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleFirstName">FIRST NAME: </label>
          <input type="text" class='form-control'
            placeholder="First Name"
            name="firstname"
            value={formInfo.firstname}
            onChange={handleChange}
          />

        </div>
        <div class="form-group">
          <label for="exampleRace">RACE: </label>

          <input type="text" class='form-control'
            placeholder="Race"
            name="race"
            value={formInfo.race}
            onChange={handleChange}
          />

        </div>
        <div class="form-group">
          <label for="exampleAge">AGE: </label>

          <input type="number" class='form-control'
            placeholder="Age"
            name="age"
            max="122"
            value={formInfo.age}
            onChange={handleChange}
          />

        </div>

        <button type="submit" className="btn btn-outline-success">Submit</button>
      </form>
      {dropDown ? formList.map((item, index) => {
        return (
          <ul key={index}>
            {dropDown === "firstname" ? <li>FIRST NAME:{item.firstname}</li> : null}
            {dropDown === "race" ? <li>RACE: {item.race}</li> : null}
            {dropDown === "age" ? <li>AGE: {item.age}</li> : null}

          </ul>
        )
      }) : formList.map((item, index) => {
        return (
          <ul key={index}>
            <li>FIRST NAME: {item.firstname}</li>
            <li>RACE: {item.race}</li>
            <li>AGE: {item.age}</li>
            <button type="delete" onClick={(e) => deleteItem(index)} className='btn btn-outline-primary' style={{ width: "7%", padding: ".4rem" }}>Delete</button>


          </ul>
        )
      })}
    </div>
  );
}

export default App;
