import Home from './pages/home';
import { BrowserRouter as  Router,
Route, Routes, Navigate,} from 'react-router-dom';
import MainPage from "./pages/dashboard_6"

import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="dashboard_6.html" element={<MainPage />}/>
    </Routes>
  </Router>

     
   
    
    
  
  )
}

export default App;
