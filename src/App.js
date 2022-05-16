import './App.css';
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Coinpage from './pages/Coinpage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Box } from '@mui/material';


function App() {
  
  return (
    <Router>
      <Box sx={{
        backgroundColor: '#14161a',
        color: 'white',
        minHeight:'100vh'}}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
