import { Box, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
//import Header from "../../components/Header";
//import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
//import { number } from "yup/lib/locale";
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import MatForm from "./MatForm"
import axios from "axios";
//import { GridFilterItem } from '@mui/x-data-grid';
//import Autocomplete from '@mui/material/Autocomplete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const Contacts = () => {
  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  const [matList, setMatList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(()=> {
    axios.get("http://10.8.1.170:4545/api/v1/bill_of_meterial")
    .then((res) => setMatList(res.data));
      // console.log("v",vendorData);
    }, []);

    const onClickDelete = (id) => {
        if(window.confirm("Are you sure you want to delete")){
          axios.delete(`http://10.8.1.170:4545/api/v1/bill_of_meterial/${id}`).then(()=> {
              // console.log("deleted",res)
              //enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
              setTimeout(() => {
                window.location.reload();
              }, 1000); 
          })
      }}
  const columns = [
   
    {
      field: "id",
      headerName: "Material Code",
      value:"hai"
      // flex: 1,
      // cellClassName: "name-column--cell",

    },
    {
      field: "material_type",
      headerName: "Material Type",
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "material",
        headerName: "Material",
        flex: 1,
      },
    {
      field: "material_price",
      headerName: "Material Price",
      flex: 1,
    },
    
    {
        field: 'action',
        width: 130,
        sortable: false,
    
        renderCell: (params) => {
          const onClickDelete = async () => {
            return alert(JSON.stringify(params.row, null, 4));
          };
        }
    }
  
    
  ]

  useEffect(() => {
    fetch("http://10.8.1.170:4545/api/v1/bill_of_meterial")
    .then((response) => response.json())
    .then((result) => setMatList(result))
    .catch((error) => console.log(error));
  }, []);

  return (
 
      <Box
        m="50px 0 0 0"
        height="45vh"
        sx={{ boxShadow:20,padding:5,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
           
          },
          "& .MuiDataGrid-columnHeaders": {
           
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
           
          },
       
        }}
    
      >    <Stack direction="row" justifyContent="end" >
       
              <Button variant="contained" color="primary" sx={{fontWeight:"bold"}} onClick={handleOpen} >Add Items</Button>
              </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <MatForm />
        </Box>
      </Modal>

        <DataGrid
        showQuickFilter
          rows={matList}
          columns={columns}
          components={{ Toolbar: GridToolbar , }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
        }}
        />
      </Box>
    
  );
};

export default Contacts;