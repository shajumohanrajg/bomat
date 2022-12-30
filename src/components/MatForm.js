import Axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  
  
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
//import axios from "axios";
//import { useEffect } from "react";

//import Page from "../../components/Page";
import { SnackbarProvider,useSnackbar } from 'notistack';
//import { createBrowserHistory } from 'history';

const BAdd = () => {

 // const history= createBrowserHistory();
  const {enqueueSnackbar} = useSnackbar();

  const url="http://10.8.1.170:4545/api/v1/bill_of_meterial"
  const [materialData,setMaterialData]= useState({
    material_type:"",
    material:"",

    material_price:"",
   
  })

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
          sx={{ paddingRight: 1, paddingLeft: 1,boxShadow:20,padding:10,borderBottom:3,borderBottomColor:'green',borderRadius:8 }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
         
            <Grid container spacing={2} sx={{ }} md={12} xs={12} sm={12}>
              <Grid item xs={12} md={12} xl={12}>

              <Box sx={{alignItems:"center",padding:2}}>
            <Typography sx={{  fontWeight:'bold' }} variant="h5">Bill Of Materials</Typography></Box> 
       
             
          
                <TextField
                  fullWidth
                  id="material_type"
                  label="Material Type" 
                  value={materialData.type}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                  color="success"  size="small"
                />
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
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
              <Grid item xs={12} md={12} xl={12}>
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
          <Button variant="contained" size="large" onClick={handleSave} sx={{ maxWidth: 0.5,backgroundColor:"green",color:'white',fontWeight:'bold' }}>
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
