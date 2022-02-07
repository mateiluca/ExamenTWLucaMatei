import './App.css';
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Article } from './components/Articles';
import { Reference } from './components/References';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" exact element={<h1>EDIT ARTICLES OR REFERENCES</h1>}></Route>
          <Route path="/article" element={<Article/>}></Route>
          <Route path="/reference" element={<Reference/>}></Route>
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
