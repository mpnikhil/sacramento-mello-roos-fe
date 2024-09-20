import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Container,
  Paper,
} from '@mui/material';

function App() {
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [taxBill, setTaxBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const addressData = {
      streetNumber,
      streetName,
      city
    };

    fetch('https://your-backend-url.vercel.app/get-tax-bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          setTaxBill(data.message);
        } else {
          setError('No tax bill found.');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching tax bill.');
        console.error(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1e1e1e' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sacramento County Mello Roos
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Street Number"
              variant="outlined"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              required
              placeholder="1234"
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Street Name"
              variant="outlined"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              required
              placeholder="Main St"
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Sacramento"
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Go'}
          </Button>
        </form>
        {loading && (
          <Box mt={2} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {taxBill && (
          <Box mt={2}>
            <Alert severity="success">{taxBill}</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
