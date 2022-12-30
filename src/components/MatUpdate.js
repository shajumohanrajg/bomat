import React from "react";
//import Page from "../../components/Page";
import { Container, Box, Grid, TextField, Typography, Stack, Button, Divider } from "@mui/material";
import Axios from 'axios';
import { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import { SnackbarProvider,useSnackbar } from 'notistack';

const VUpdate=(props) =>{

    let {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();
    const history=createBrowserHistory();
    const url="http://10.8.1.170:4545/api/v1/bill_of_meterial/"

    const [matData,setMatData]= useState({
        material_type:"",
        material:"",
    
        material_price:"",
     
    })

    useEffect(()=>{
      // const id=props.match.params.id
      Axios.get(url+id)
        .then((res) => {
          // console.log(res.data)
          setMatData(res.data)
      }).catch(err=>console.error(err))
  }, [id]);

    const handleUpdate = (e)=> {
      e.preventDefault()
      // const id= props.match.params.id
      Axios.put(url+id,matData)
         .then((response) => {
          // console.log(response);
          if(response.status === 200) {
            history.push("/MatUpdate")
            enqueueSnackbar('Succesfully Updated', { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } ); 
            setTimeout(() => {
              window.location.reload();
            }, 1000); 
          }
        }, (error) => {
          enqueueSnackbar('Check Data and Try Again', { variant:'Error', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          console.log(error);
      });
  }
  const handleChange=(e)=>{
      const newdata={...matData}
      newdata[e.target.id]=e.target.value
      setMatData(newdata)
  }
    return(
      
            <Container maxWidth="xl">
                <Box
                    component="form"
                    sx={{ paddingRight: 3, paddingLeft: 3 }}
                    noValidate
                    autoComplete="off"
                    >
                    <Stack spacing={5}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3 }} variant="h4">Update Material Data {id}</Typography>
            <Grid container spacing={3} sx={{ pr: 5 }}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material_type"
                  label="Material Type"
                  value={matData.material_type}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material"
                  label="Material"
                  value={matData.material}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  fullWidth
                  id="material_price"
                  label="Material price"
                  type="number"
                  value={matData.material_price}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={2} md={6} xl={6}></Grid>
            </Grid>
          </Stack>
        </Box>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" size="large" onClick={handleUpdate} sx={{ maxWidth: 0.5 }}>
            UPDATE
          </Button>
        </Box>
    </Container>
      
    )
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <VUpdate />
    </SnackbarProvider>
  );
}