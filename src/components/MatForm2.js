import Axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

//import Page from "../../components/Page";
import { SnackbarProvider,useSnackbar } from 'notistack';
//import { createBrowserHistory } from 'history';

const BAdd = () => {

 // const history= createBrowserHistory();
  const {enqueueSnackbar} = useSnackbar();
  const baseURL = "http://10.8.1.170:4545/api/v1/bill_of_meterial/type/";
  const url="http://10.8.1.170:4545/api/v1/bill_of_meterial"
  const [materialData,setMaterialData]= useState({
    material_type:"",
    material:"",

    material_price:"",
   
  })
  const [rows, setRows] = useState([]);
  //const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
    });
  }, []);

  const handleChange=(e)=>{
    const newdata={...materialData}
    newdata[e.target.id]=e.target.value
    setMaterialData(newdata)
}

  const handleSave=(e)=>{
    e.preventDefault();
    Axios.post(url,materialData) 
    .then((response) => {
        // console.log(response); 
        enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
        //history.push("/dashboard/branches")
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }, (error) => {
        console.log(error);
        enqueueSnackbar('Check values and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
    });
  }
  return (
  
    
      <Box
          component="form"
          sx={{ paddingRight: 1, paddingLeft: 1,boxShadow:2,padding:10 }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
          <Box sx={{}}>
            <Typography sx={{ paddingTop: 1, fontWeight:'bold' }} variant="h4">Bill Of Materials</Typography></Box>
            <Grid container spacing={3} sx={{ pr: 5 ,}} md={12}>
              <Grid item xs={12} md={4} xl={4}>

           
       
              <Autocomplete
          id="material_type"
          freeSolo
          options={rows}
          value={materialData.material_type}
          
          onChange={(e, v) => handleChange(v)}
          getOptionLabel={(rows) => rows.type || " " }
          renderInput={(params) => (
            <TextField {...params} label="Material Type" type="text" />
          )}
        />
             
          
                <TextField
                  fullWidth
                  id="material_type"
                  label="Material Type" 
                  value={rows.type}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                  color="success"
                />
              </Grid>
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  fullWidth
                  id="material"
                  label="Material"
                  value={materialData.material}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                  color="success" size="small" 
                />
              </Grid>
            {/*    <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="materialcode"
                  label="Material Code"
                  type="text"
                  value={materialData.materialcode}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  color="success"
                /> 
              </Grid> */}
              <Grid item xs={12} md={4} xl={4}>
                <TextField
                  fullWidth
                  id="material_price"
                  label="Price"
                  type="number"
                  value={materialData.material_price}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  color="success" size="small" 
                />
              </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleSave} sx={{ maxWidth: 0.5 }}>
            Submit
          </Button>
        </Box>
          </Stack>
        </Box>
    
  
    
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <BAdd />
    </SnackbarProvider>
  );
}
