import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Todo from './Todo';
import Home from './Home';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
