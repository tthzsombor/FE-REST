import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menetrendek from './Components/Menetrend';
import Urlap from './Components/Urlap';


export function App(){
  const [reload, setReload] = useState<boolean>(false); 

  return (
    <Router>
      <div>
        <nav> 
          <div>
            <Link to="/">Menetrend</Link>
            <Link to="/hozzaadas">Hozzáadása</Link>
          </div>
        </nav>
        <div> 
        <Routes>
            <Route path="/hozzaadas" element={<Menetrendek reload={setReload()} />} />
            <Route path="/" element={<Urlap reload={reload} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;