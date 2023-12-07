
import './App.css';
import CoastersDetails from './pages/CoasterDetails/CoasterDetails';
import CoastersPage from './pages/CoastersPage/CoastersPage';


import {Routes, Route} from 'react-router-dom'
import ParaderoForm from './pages/Paradero/ParaderoForm';


function App() {
  return (
    <div className='container'>
      <Routes>

        <Route path="/galeria" element={<CoastersPage />}/>
        <Route path="/detalles/:coaster_id" element={<CoastersDetails />}/>
        <Route path="/" element={<ParaderoForm />}/>
      </Routes>
    
    
    </div>
  );
}

export default App;
