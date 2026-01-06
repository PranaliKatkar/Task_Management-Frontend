import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/mainPage' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App
