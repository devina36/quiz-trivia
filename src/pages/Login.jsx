import { Button, Container, createTheme, Alert, Grid, TextField, ThemeProvider, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const theme = createTheme({
  palette: {
    blaxk: {
      main: '#000',
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const login = async () => {
      try {
        const res = await axios.post('https://reqres.in/api/login', {
          email: values.email,
          password: values.pass,
        });
        localStorage.setItem('token-quiz', res.data.token);
        navigate('/');
      } catch (err) {
        setOpen(true);
        console.log(err);
      }
    };

    login();
  };

  return (
    <main className="main-login">
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" sx={{ position: 'relative' }}>
          <Alert
            severity="error"
            sx={{
              position: 'absolute',
              top: `${open ? '75px' : '-100px'}`,
              left: '50%',
              transform: 'translateX(-50%)',
              transition: 'top 200ms ease-in-out',
              width: '80%',
            }}
            onClose={() => {
              setOpen(false);
            }}
          >
            The email address or password is incorrect
          </Alert>
          <Grid direction="column" justifyContent="center" minHeight="100vh" container>
            <form onSubmit={handleSubmit}>
              <Paper elevation={5} sx={{ padding: 5, borderRadius: 2 }}>
                <Grid container rowSpacing={5} direction="column" justifyContent="center">
                  <Grid item>
                    <TextField
                      fullWidth
                      required
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      color="blaxk"
                      type="email"
                      label="Email"
                      variant="standard"
                      focused
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      required
                      onChange={(e) => setValues({ ...values, pass: e.target.value })}
                      color="blaxk"
                      type="password"
                      label="Password"
                      variant="standard"
                      focused
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: '#4D5B9E',
                        borderRadius: 2,
                        border: '2px solid #000',

                        ':hover': {
                          backgroundColor: 'transparent',
                          color: '#000',
                          border: '2px solid #4D5B9E',
                        },
                      }}
                      fullWidth
                      variant="contained"
                    >
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Container>
      </ThemeProvider>
    </main>
  );
};

export default Login;
