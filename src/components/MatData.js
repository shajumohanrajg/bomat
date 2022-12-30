import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
//import Page from "../../components/Page";
import axios from "axios";
import {createBrowserHistory} from 'history';
import { SnackbarProvider,useSnackbar } from 'notistack';
import { useEffect } from "react";

const Branches = (props) => {

  const {enqueueSnackbar} = useSnackbar();
  const history = createBrowserHistory();
  const url="http://10.8.1.170:4545/api/v1/bill_of_meterial";
  const [matData,setMatData]= React.useState([]);

  useEffect(()=> {
    axios.get(url)
    .then((res) => setMatData(res.data));
      // console.log("v",vendorData);
    }, []);

  const deleteVendor = (id) => {
    if(window.confirm("Are you sure you want to delete")){
      axios.delete(`${url}/${id}`).then(()=> {
          // console.log("deleted",res)
          enqueueSnackbar('Successfully deleted' , { variant:'success', anchorOrigin:{horizontal: 'right', vertical: 'top'} } );
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
      })
  }}

  const updateVendor = (id) => {
    // console.log(id) 
    history.push(`/MatUpdate/${id}`)
    window.location.reload();
  }
  
  return (
    <div className="branches">
    
        <div className="branches_head">
          <Typography variant="h4">Bill Of Materials Data</Typography>
          <br />
          <Button
            href="/MatForm"
            variant="contained"
            color="primary"
          >
            Add BOMAT
          </Button>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
        {matData.map((b)=>(
          <Grid item xs={12} md={6} xl={4}>
            <Card 
              elevation={3}
              sx={{ maxWidth:1, borderRadius: 5, minHeight: '25vh', m:'1vh', p:'1vh'}}
            >
              <CardContent>
                <Typography>
                  {b.id}
                </Typography>
              </CardContent>
              <CardContent sx={{ textAlign:'center'}}>
                <Typography variant="h5" component="div">
                {b.material_type}
                </Typography>
                <Typography color="text.secondary">
                {b.material}
                </Typography>
                <Typography color="text.secondary">
                {b.material_price}
                </Typography>
              
              </CardContent>
              <CardActions sx={{justifyContent:'center'}}>
                <Button onClick={()=>updateVendor(b.id) }  size="small">Edit</Button>
                <Button onClick={()=>deleteVendor(b.id)} size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
     
    </div>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Branches />
    </SnackbarProvider>
  );
}

