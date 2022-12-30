import { Box,  Typography, } from "@mui/material";
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

//import { fontWeight } from "@mui/system";
//import { Typography } from "@material-ui/core";
//import { GridFilterItem } from '@mui/x-data-grid';
//import Autocomplete from '@mui/material/Autocomplete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
   borderBottom:2,
   borderBottomColor: 'green',
    boxShadow: 25,
    borderTopLeftRadius: 50,
  
    borderBottomRadius: 8,
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


  const columns = [
   
    {
      field: "id",
      headerName: "Material Code",
     
      headerClassName: 'super-app-theme--header',
      flex: 1,
      // cellClassName: "name-column--cell",

    },
    {
      field: "material_type",
      headerName: "Material Type",
      headerClassName: 'super-app-theme--header',
      // type: "number",
      // headerAlign: "left",
      // align: "left",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
        field: "material",
        headerName: "Material",
        headerClassName: 'super-app-theme--header',
        flex: 1,
      },
    {
      field: "material_price",
      headerName: "Material Price",
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    
  
  
    
  ]

  useEffect(() => {
    fetch("http://10.8.1.170:4545/api/v1/bill_of_meterial")
    .then((response) => response.json())
    .then((result) => setMatList(result))
    .catch((error) => console.log(error));
  }, []);
 
  return (
 <Box  m="30px 0 0 0"
 sx={{boxShadow:20,padding:5,}}>
    <Stack direction="row" >
       
      <Typography variant="h5" color="initial"><Box sx={{ fontWeight: 'bold', m: 1 }}>Bill of Materials Table</Box></Typography>
       </Stack>
      <Box
       height="80vh"  fontWeight={10}
        sx={{ 
          "& .MuiDataGrid-root": {
            border: "none", 
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
         
          },
          "& .MuiDataGrid-columnHeaders": {
           
           borderBottom:"1px solid grey",

           fontWeight: "bold !important"

          },
          "& .MuiDataGrid-virtualScroller": {
            
          },
          "& .MuiDataGrid-footerContainer": {
          
           
          },
       
        }}
    
        
      >  <Stack direction="row" justifyContent="end" >
       
              <Button variant="contained" color="success" sx={{fontWeight:"bold"}} onClick={handleOpen} >Add Items</Button>
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
          components={{ Toolbar: GridToolbar ,color:"secondary", }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
        }}
        />
       
        </Box>
        </Box>
    
  );
};

export default Contacts;