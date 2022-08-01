import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// import "./App.css";
import Nav from "./componenets/Nav";
import SearchBar from "./componenets/Search";


function App() {
  const [userData, setUserData] = useState([]);

  // API CALL 
  useEffect(() => {
    const url = "https://randomuser.me/api/?results=60";
    axios.get(url).then((res) => {
      setUserData(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  // DELETE USER 
 function removeItem(selectedItem) {
  setUserData(userData.filter((item) => item !== selectedItem))
 }

//  FILTER DATA 
  function filterUsers(filter) {
    if (filter === "Youngest_To_Oldest") {
      setUserData(
        userData
        .slice()
        .sort(
          (a, b) =>
            (a.dob.age) - (b.dob.age)
        )
      )
    }
    if (filter === "Oldest_To_Youngest") {
      setUserData(
        userData
        .slice()
        .sort(
          (a, b) =>
            (b.dob.age) - (a.dob.age)
        )
      )
    }
  }

  return (
    <div className="container">
        <Nav />
        <SearchBar userData={userData} />
          <select id="filter"
           defaultValue="DEFAULT"
           onChange={(event) => filterUsers(event.target.value)}>
            <option value="DEFAULT" disabled>
                  Sort
                </option>
                <option value="Youngest_To_Oldest">Age, Younger to Older</option>
                <option value="Oldest_To_Youngest">Age, Older to Younger</option>
                {/* <option value="Male_To_Female">Gender, Older to Younger</option> */}
            </select>
      {userData.map((item, index) => {
        return (
          <div key={index}>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>FullName</th> 
                  <th>Cell</th> 
                  <th>Gender</th> 
                  <th>Age</th> 
                  <th>Delete</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.name.first} {item.name.last}</td> 
                  <td>{item.cell}</td>
                  <td>{item.gender}</td>
                  <td>{item.dob.age}</td>
                  <td> <Button variant="outline-danger" onClick={() => removeItem(item)}>X</Button>{''} </td>
                </tr>
              </tbody>
              </Table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
