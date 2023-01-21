import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Protected children={<Home />} />} />
      </Routes>
    </>
  );
}

export default App;
