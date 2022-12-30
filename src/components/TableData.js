import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import TablePagination from '@mui/material/TablePagination';
//import TableRow from '@mui/material/TableRow';
//import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DataTable from './DataTable';
import {
    Box,Typography

  } from "@mui/material";
//import {TextField} from '@mui/material'
import Input from '@mui/material/Input';
//import boxShadow from '../assets/theme/functions/boxShadow'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const columns = [
  { field: 'id', headerName: ' Material Code', width: 150 },
  { field: 'material_type', headerName: 'Type', width: 150 },
  { field: 'material', headerName: 'Material', width: 150 },
  { field: 'material_price', headerName: 'Price', width: 200 },
];

const userTableStyles = {
  height: '650px',
};


const App = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;

 

  const classes = useStyles();
  const [material_code, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get(
        "http://10.8.1.170:4545/api/v1/bill_of_meterial"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
     <Box sx={{boxShadow:20,padding:10}}>
     <Box sx={{}}>
            <Typography sx={{ paddingTop: 3, paddingLeft:3,fontWeight:'bold' }} variant="h4">Bill Of Materials</Typography></Box>
            <Box align="right">
      <Input placeholder="Search here"   onChange={(e) => {
          setSearch(e.target.value);
        }} /></Box>
  
 <br></br>

       {material_code
        .filter((item) => {
          if (search === "") {
            return item;
          } else if (item.material_type.toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        })
        .map((item) => {
          return (
            <p>
            {item.material_type} - {item.material_type}
            </p>
          );
        })} 

      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Product Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {material_code
              // eslint-disable-next-line array-callback-return
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.price}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <DataTable
            rows={material_code}
            columns={columns}
            loading={!material_code.length}
            sx={userTableStyles}
            getRowId={(row) =>"m"-row._id}
        /></Box>
    </div>
  );
};

export default App;