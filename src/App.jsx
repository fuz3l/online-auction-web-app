import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import ItemDetails from './components/DetailsPage.jsx'; // Import the new details page
import './App.css';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:title/:startingBid/:details/:image" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
