import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';

const columns = [
  
    { field: 'material_type', headerName: 'Name', width: 150 },
    { field: 'material', headerName: 'Username', width: 150 },
    { field: 'material_price', headerName: 'E-mail', width: 200 },
];

const userTableStyles = {
    height: '650px',
};

const UserTable = ({ onError }) => {
    const [actions, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch(() => onError())
    },);

    return (
        <DataTable
            rows={actions}
            columns={columns}
            loading={!actions.length}
            sx={userTableStyles}
        />
    );
};

export default UserTable