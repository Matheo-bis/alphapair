import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';

function App() {
  return (
    <div>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}/>
          <Route path="/signup" element={<SignupComponent/>}/>
          <Route path="/home" element={<HomeComponent/>}/>
          <Route path="*" element={<Navigate to="/home" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
