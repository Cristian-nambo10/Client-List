import React, { useState } from "react";
import { Table } from "react-bootstrap";

const SearchBar = ({userData}) => {
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    let filteredData = [];
    if (searchInput.length > 0) {
       filteredData = userData.filter((data) => {
            return data.name.first.match(searchInput);
        })
    }

  return (
    <div>
      <input
       type="text"
       placeholder="Search"
       onChange={handleChange}
       value={searchInput}  />

        <Table size="sm" hover>
            <tbody>
            <tr>
            <th>First name</th> 
            <th>Last name</th>
            </tr>
            {filteredData.map((user, index) => {
                return (
                    <tr>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                </tr>
                )
                   
            })}
            </tbody>
        </Table>

    </div>
  );
};

export default SearchBar;
