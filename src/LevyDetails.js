import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from '@mui/material';

const LevyDetails = ({ levyTotal, levies }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const monthlyAmount = (levyTotal / 12).toFixed(2); // Calculate monthly amount

  return (
    <Box mt={2}>
      <Typography variant="h6">
        TOTAL ANNUAL DIRECT LEVIES & ASSESSMENTS (Inclusive of Mello Roos): ${levyTotal}
      </Typography>
      <Typography variant="subtitle1">
        Monthly Amount: ${monthlyAmount}
      </Typography>
      <Box mt={1}>
        <Link component="button" variant="body2" onClick={handleToggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Link>
      </Box>
      {showDetails && (
        <TableContainer component={Paper} style={{ marginTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Levy Number</TableCell>
                <TableCell>Levy Name</TableCell>
                <TableCell>Levy Amount</TableCell>
                <TableCell>Levy CD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levies && levies.length > 0 ? (
                levies.map((levy, index) => (
                  <TableRow key={index}>
                    <TableCell>{levy.LevyNumber}</TableCell>
                    <TableCell>{levy.LevyName}</TableCell>
                    <TableCell>${levy.LevyAmount}</TableCell>
                    <TableCell>{levy.LevyCD || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No levies found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default LevyDetails;
