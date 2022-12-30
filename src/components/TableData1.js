import React, { useState, useEffect } from 'react';
//import './App.css';
import MaterialTable from 'material-table'


function TableData1() {

  const [data, setData] = useState([])
  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Web Link", field: 'website' }
  ]
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
      })
  }, [])

  return (
    <div className="TableData1">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Material Table</h4>
      <MaterialTable
        title="Employee Data"
        data={data}
        columns={columns}
      > </MaterialTable>
    </div>
  );
}

export default TableData1