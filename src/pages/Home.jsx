import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Link to="quiz">
          <Button variant="contained">Lets Start</Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
