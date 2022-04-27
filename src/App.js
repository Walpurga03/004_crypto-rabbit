import './App.css';
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Coinpage from './pages/Coinpage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  
  return (
    <Router>
      <div
      style={{
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh'
      }}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
