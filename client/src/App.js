import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
    } from "react-router-dom";
import Home from "./Pages/HomePage";
import LogPage from "./Pages/LogPage";

function App() {
  return (
    <div className="App">
     <Router>
     <Routes>       
          <Route index path="/"  element={<Home />}>
          </Route>
          <Route path="log"  element={<LogPage />}>
          </Route>
      </Routes>    
     </Router>
    </div>    
  );
}

export default App;
