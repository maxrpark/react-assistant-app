import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Todo from './Todo';
import Home from './Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
