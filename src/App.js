import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Transaction from './components/Transaction';
import Home from './components/Home';
import Logs from './components/Logs';
import BlockCard from './components/BlockCard';
import Logout from './components/Logout';
import AtmDetails from './components/AtmDetails';


function App() {
  console.log("Main>>");
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/transaction" element={<Transaction/>} />
        <Route path="/logs" element={<Logs/>} />
        <Route path="/blockcard" element={<BlockCard/>} />
        <Route path="/atmdetails/:id" element={<AtmDetails/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  );
  }

export default App;
