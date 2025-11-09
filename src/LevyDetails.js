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
  Button,
  Collapse,
  Divider,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const LevyDetails = ({ levyTotal, levies }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const monthlyAmount = (levyTotal / 12).toFixed(2);
  const formattedTotal = parseFloat(levyTotal).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedMonthly = parseFloat(monthlyAmount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box className="levy-details-container">
      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6}>
          <Card 
            className="summary-card annual-card"
            sx={{
              background: 'linear-gradient(135deg, rgba(103, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(103, 126, 234, 0.3)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(103, 126, 234, 0.3)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <CalendarIcon sx={{ color: '#667eea', mr: 1 }} />
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  Annual Total
                </Typography>
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.125rem' }
                }}
              >
                ${formattedTotal}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" mt={0.5}>
                Direct Levies & Assessments
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card 
            className="summary-card monthly-card"
            sx={{
              background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(56, 178, 172, 0.2) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(72, 187, 120, 0.3)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(72, 187, 120, 0.3)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PaymentIcon sx={{ color: '#48bb78', mr: 1 }} />
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  Monthly Amount
                </Typography>
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.125rem' }
                }}
              >
                ${formattedMonthly}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" mt={0.5}>
                Estimated Monthly Payment
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Levy Count Badge */}
      {levies && levies.length > 0 && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Chip
            icon={<ReceiptIcon />}
            label={`${levies.length} ${levies.length === 1 ? 'Levy' : 'Levies'} Found`}
            sx={{
              background: 'rgba(103, 126, 234, 0.2)',
              color: '#a5b4fc',
              border: '1px solid rgba(103, 126, 234, 0.3)',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '8px 4px',
            }}
          />
        </Box>
      )}

      {/* Toggle Details Button */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          onClick={handleToggleDetails}
          endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            color: '#667eea',
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            padding: '10px 24px',
            borderRadius: '12px',
            background: 'rgba(103, 126, 234, 0.1)',
            border: '1px solid rgba(103, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(103, 126, 234, 0.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(103, 126, 234, 0.3)',
            },
          }}
        >
          {showDetails ? 'Hide Levy Breakdown' : 'View Levy Breakdown'}
        </Button>
      </Box>

      {/* Detailed Table */}
      <Collapse in={showDetails} timeout={500}>
        <Box mt={2}>
          <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          <TableContainer 
            component={Paper}
            sx={{
              background: 'rgba(20, 20, 35, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '400px',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(103, 126, 234, 0.5)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(103, 126, 234, 0.7)',
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      background: 'rgba(103, 126, 234, 0.15)',
                      color: '#ffffff',
                      fontWeight: 700,
                      borderBottom: '2px solid rgba(103, 126, 234, 0.3)',
                      fontSize: '0.9rem',
                    }}
                  >
                    Levy Number
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      background: 'rgba(103, 126, 234, 0.15)',
                      color: '#ffffff',
                      fontWeight: 700,
                      borderBottom: '2px solid rgba(103, 126, 234, 0.3)',
                      fontSize: '0.9rem',
                    }}
                  >
                    Levy Name
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      background: 'rgba(103, 126, 234, 0.15)',
                      color: '#ffffff',
                      fontWeight: 700,
                      borderBottom: '2px solid rgba(103, 126, 234, 0.3)',
                      fontSize: '0.9rem',
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      background: 'rgba(103, 126, 234, 0.15)',
                      color: '#ffffff',
                      fontWeight: 700,
                      borderBottom: '2px solid rgba(103, 126, 234, 0.3)',
                      fontSize: '0.9rem',
                    }}
                  >
                    Levy CD
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levies && levies.length > 0 ? (
                  levies.map((levy, index) => (
                    <TableRow 
                      key={index}
                      sx={{
                        '&:hover': {
                          background: 'rgba(103, 126, 234, 0.08)',
                        },
                        '&:last-child td': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#e1e1e1', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <Chip 
                          label={levy.LevyNumber}
                          size="small"
                          sx={{
                            background: 'rgba(103, 126, 234, 0.2)',
                            color: '#a5b4fc',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#e1e1e1', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        {levy.LevyName}
                      </TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          color: '#48bb78',
                          fontWeight: 600,
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          fontSize: '1rem',
                        }}
                      >
                        ${parseFloat(levy.LevyAmount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell 
                        align="center" 
                        sx={{ color: '#b8b8b8', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                      >
                        {levy.LevyCD || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={4} 
                      align="center"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        padding: '40px',
                        fontSize: '1rem',
                      }}
                    >
                      <AccountBalanceIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                      <Typography>No levy details available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Info Note */}
          <Box 
            mt={2} 
            p={2}
            sx={{
              background: 'rgba(79, 195, 247, 0.1)',
              border: '1px solid rgba(79, 195, 247, 0.2)',
              borderRadius: '12px',
            }}
          >
            <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
              <strong>Note:</strong> These amounts represent direct levies and assessments including Mello-Roos taxes. 
              The monthly estimate is calculated by dividing the annual total by 12 months. 
              Actual monthly payments may vary based on your mortgage structure.
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default LevyDetails;
