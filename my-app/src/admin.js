import {useState, useEffect} from "react";
import axios from "axios";

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function Admin() {
  const [authorized, setAuthorized] = useState("not");
  const [passcode, setPasscode] = useState("");

  const [creatingDriver, setCreatingDriver] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [drivers, setDrivers] = useState([]);

  const handleChange = event => {
    setPasscode(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (passcode == "zelensky") {
      setAuthorized("yes");
    }
  }

  const handleDriverCreation = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: name, lastName: surname, phone: phone}),
  };
    let res = await fetch('/createNewDriver', requestOptions)
    setCreatingDriver(false);
 }

 const changeStatus = async (id, status) => {
  setDrivers(drivers.map(driver => {
    return driver._id == id ? {...driver, status: status} : driver
  }))
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: status, id: id}),
};
  let res = await fetch(`/status`, requestOptions)
  setCreatingDriver(false);
}

 useEffect(() => {
  fetch("/getDrivers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => setDrivers(data))
 }, [creatingDriver])



  return (
    authorized == "not" ?
      <div style={{display: "flex", flexDirection: "column"}}>
        <h3>Enter code</h3>
        <Input marginBottom = {"20px"} onChange={handleChange}/>
        <Button onClick={handleSubmit} variant="outlined">Отправить</Button>
      </div> :

      <div>
        <Button onClick={() => setCreatingDriver(true)} variant="outlined">Create a Driver</Button>
        {creatingDriver ?
        <div style={{display: "flex", flexDirection: "column"}}>
            <h3>First Name</h3>
            <Input marginbottom = {"20px"} onChange={(event) => setName(event.target.value)}/>
            <h3>Last Name</h3>
            <Input marginbottom = {"20px"} onChange={(event) => setSurname(event.target.value)}/>
            <h3>Phone</h3>
            <Input onChange={(event) => setPhone(event.target.value)}/>
            <Button onClick={handleDriverCreation} variant="outlined">Create</Button>
        </div> : <></>
        }
        <div>
          {
            drivers.map((driver, index) => {
              return(
              <div>
                <h3>{index}. {driver.firstName} {driver.lastName} {driver.phone} is now {driver.status}</h3>
                <Button onClick={() => {changeStatus(driver._id, "driving")}} color="error">Drive</Button>
                <Button onClick={() => {changeStatus(driver._id, "waiting")}} >Wait</Button>
                <Button onClick={() => {changeStatus(driver._id, "resting")}} color="success">Rest</Button>
              </div>)
            })
          }
        </div>
      </div>
  )
}

export default Admin
