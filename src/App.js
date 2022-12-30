//import logo from './logo.svg';
import './App.css';
//import MatForm from "./components/MatForm"
//import TableData from "./components/TableData"
//import UserTable from "./components/UserTable"
//import MatData from "./components/MatData"
//import MatUpdate from "./components/MatUpdate"
//import TableData1 from "./components/TableData1"
//import TableData2 from "./components/TableData2"
//import TableData3 from "./components/TableData3"
import MatTable from "./components/MatTable"
import {
  

  Container,

} from "@mui/material";

function App() {
  return (
    <Container maxWidth="xl" >
    <div className="App">

     
      <MatTable />
  
     
    </div>
    </Container>
  );
}

export default App;
