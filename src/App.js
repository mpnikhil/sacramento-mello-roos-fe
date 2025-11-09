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
  Autocomplete,
  Chip,
  InputAdornment,
  Fade,
  Zoom,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LocationCity as CityIcon,
  InfoOutlined as InfoIcon,
  Coffee as CoffeeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import LevyDetails from './LevyDetails';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';
import './App.css';

const streetSuffixes = [
  'ALY', 'ANX', 'ARC', 'AVE', 'BYU', 'BCH', 'BND', 'BLF', 'BLFS', 'BTM',
  'BLVD', 'BR', 'BRG', 'BRK', 'BRKS', 'BG', 'BGS', 'BYP', 'CP', 'CYN', 'CPE',
  'CSWY', 'CTR', 'CTRS', 'CIR', 'CIRS', 'CLF', 'CLFS', 'CLB', 'CMN', 'CMNS',
  'COR', 'CORS', 'CRSE', 'CT', 'CTS', 'CV', 'CVS', 'CRK', 'CRES', 'CRST',
  'XING', 'XRD', 'XRDS', 'CURV', 'DL', 'DM', 'DV', 'DR', 'DRS', 'EST', 'ESTS',
  'EXPY', 'EXTS', 'FLS', 'FRY', 'FLD', 'FLDS', 'FLT', 'FLTS', 'FRD', 'FRDS',
  'FRST', 'FRG', 'FRGS', 'FRK', 'FRKS', 'FT', 'FWY', 'GDN', 'GDNS', 'GTWY',
  'GLN', 'GLNS', 'GRN', 'GRNS', 'GRV', 'GRVS', 'HBR', 'HBRS', 'HVN', 'HTS',
  'HWY', 'HL', 'HLS', 'HOLW', 'INLT', 'IS', 'ISS', 'KY', 'KYS', 'KNL', 'KNLS',
  'LK', 'LKS', 'LAND', 'LNDG', 'LN', 'LGT', 'LGTS', 'LF', 'LCK', 'LCKS',
  'LDG', 'LOOP', 'MALL', 'MNR', 'MNRS', 'MDW', 'MDWS', 'MEWS', 'ML', 'MLS',
  'MSN', 'MTWY', 'MT', 'MTN', 'MTNS', 'NCK', 'ORCH', 'OVAL', 'OPAS', 'PARK',
  'PKWY', 'PKWYS', 'PASS', 'PSGE', 'PATH', 'PIKE', 'PNE', 'PL', 'PLN', 'PLNS',
  'PLZ', 'PT', 'PTS', 'PRT', 'PRTS', 'PR', 'RADL', 'RAMP', 'RNCH', 'RNCHS',
  'RPD', 'RPDS', 'RST', 'RDG', 'RDGS', 'RIV', 'RD', 'RDS', 'RTE', 'ROW',
  'RUE', 'RUN', 'SHL', 'SHLS', 'SHR', 'SHRS', 'SKWY', 'SPG', 'SPGS', 'SPUR',
  'SQ', 'SQS', 'STA', 'STRM', 'ST', 'STS', 'SMT', 'TER', 'TRCE', 'TRAK',
  'TRKS', 'TRFY', 'TRL', 'TRLS', 'TRLR', 'TUNL', 'TPKE', 'UPAS', 'UN', 'UNS',
  'VLY', 'VLYS', 'VIA', 'VW', 'VWS', 'VLG', 'VLGS', 'VL', 'VIS', 'WALK',
  'WALL', 'WY', 'WAY', 'WAYS', 'WL', 'WLS',
];

function App() {
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetSuffix, setStreetSuffix] = useState('');
  const [city, setCity] = useState('');
  const [taxDetails, setTaxDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTaxDetails(null);

    const fullStreetName = `${streetName} ${streetSuffix}`.trim();

    fetch(
      `https://sacramento-mello-roos-be.vercel.app/get-tax-details?street_number=${streetNumber}&street_name=${encodeURIComponent(fullStreetName)}&city=${encodeURIComponent(city)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data && data.levy_total !== undefined) {
          setTaxDetails(data);
        } else {
          setError('No tax information found for this address.');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching tax information. Please try again.');
        console.error(error);
      });
  };

  const handleReset = () => {
    setStreetNumber('');
    setStreetName('');
    setStreetSuffix('');
    setCity('');
    setTaxDetails(null);
    setError(null);
  };

  return (
    <>
      <Helmet>
        <title>Sacramento County Mello-Roos Tax Lookup | Property Tax Information</title>
        <meta
          name="description"
          content="Free Mello-Roos tax lookup tool for Sacramento County. Find property tax levies, assessments, and annual amounts for any address in Sacramento, Elk Grove, Folsom, Natomas, West Sacramento, Rancho Cordova, and Lincoln."
        />
        <meta
          name="keywords"
          content="Mello Roos, Sacramento County, property tax, tax lookup, Sacramento tax, Elk Grove tax, Folsom tax, Natomas tax, West Sacramento tax, Rancho Cordova tax, Lincoln tax, property assessment, direct levies, tax calculator, Sacramento County property tax"
        />
        <meta property="og:title" content="Sacramento County Mello-Roos Tax Lookup | Property Tax Information" />
        <meta property="og:description" content="Free Mello-Roos tax lookup tool for Sacramento County. Find property tax levies, assessments, and annual amounts for any address." />
        <meta property="og:url" content="https://sacramento-mello-roos.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sacramento-mello-roos.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sacramento County Mello-Roos Tax Lookup" />
        <meta name="twitter:description" content="Free Mello-Roos tax lookup tool for Sacramento County. Find property tax levies and assessments." />
        <link rel="canonical" href="https://sacramento-mello-roos.vercel.app/" />
      </Helmet>
      
      <div className="app-background">
        <div className="animated-gradient"></div>
        
        <Container component="main" maxWidth="md" className="main-container">
          {/* Hero Section */}
          <Fade in={true} timeout={800}>
            <Box className="hero-section" mb={4}>
              <HomeIcon className="hero-icon" />
              <Typography variant="h3" component="h1" className="hero-title">
                Sacramento County
              </Typography>
              <Typography variant="h4" component="h2" className="hero-subtitle">
                Mello-Roos Tax Lookup
              </Typography>
              <Typography variant="body1" className="hero-description">
                Discover property tax levies and assessments for any address in Sacramento County
              </Typography>
              <Box className="info-chip-container">
                <Tooltip title="Click to learn more about Direct Levies & Assessments" arrow>
                  <Chip 
                    icon={<InfoIcon />} 
                    label="Direct Levies & Assessments" 
                    className="info-chip"
                    variant="outlined"
                    onClick={() => setInfoDialogOpen(true)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  />
                </Tooltip>
              </Box>
              
              {/* Info Dialog */}
              <Dialog
                open={infoDialogOpen}
                onClose={() => setInfoDialogOpen(false)}
                PaperProps={{
                  sx: {
                    background: 'rgba(30, 30, 47, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                  },
                }}
              >
                <DialogTitle sx={{ color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="span">
                    Direct Levies & Assessments
                  </Typography>
                  <IconButton
                    onClick={() => setInfoDialogOpen(false)}
                    sx={{ color: '#ffffff' }}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                    <Typography variant="body1" paragraph>
                      <strong>Direct Levies & Assessments</strong> refer to special taxes and fees that are assessed on properties in certain areas, including Mello-Roos taxes.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      These levies are typically used to finance public infrastructure improvements such as:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                      <li>Roads and highways</li>
                      <li>Schools and educational facilities</li>
                      <li>Parks and recreational facilities</li>
                      <li>Water and sewer systems</li>
                      <li>Public safety facilities</li>
                    </Box>
                    <Typography variant="body1" paragraph>
                      <strong>Mello-Roos taxes</strong> are a type of special tax authorized under California law (Community Facilities Act of 1982) that allows local governments to finance public improvements and services.
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>
                      The amounts shown represent annual totals. Monthly estimates are calculated by dividing the annual amount by 12 months.
                    </Typography>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </Box>
          </Fade>

          {/* Search Form */}
          <Zoom in={true} timeout={600}>
            <Paper elevation={6} className="search-paper">
              <Typography variant="h6" className="form-title" gutterBottom>
                Enter Property Address
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Box className="form-grid">
                  <Box className="form-field">
                    <TextField
                      fullWidth
                      label="Street Number"
                      variant="outlined"
                      value={streetNumber}
                      onChange={(e) => setStreetNumber(e.target.value)}
                      required
                      placeholder="e.g., 1234"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      className="styled-input"
                    />
                  </Box>

                  <Box className="form-field">
                    <TextField
                      fullWidth
                      label="Street Name"
                      variant="outlined"
                      value={streetName}
                      onChange={(e) => setStreetName(e.target.value)}
                      required
                      placeholder="e.g., Main"
                      className="styled-input"
                    />
                  </Box>

                  <Box className="form-field">
                    <Autocomplete
                      options={streetSuffixes}
                      value={streetSuffix}
                      onChange={(e, newValue) => setStreetSuffix(newValue || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Street Suffix (Optional)"
                          placeholder="e.g., St, Ave, Dr"
                          variant="outlined"
                          fullWidth
                          className="styled-input"
                        />
                      )}
                      className="styled-autocomplete"
                    />
                  </Box>

                  <Box className="form-field">
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="e.g., Sacramento"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CityIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      className="styled-input"
                    />
                  </Box>
                </Box>

                <Box className="button-group">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    className="search-button"
                    startIcon={loading ? null : <SearchIcon />}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Property'}
                  </Button>
                  
                  {(taxDetails || error) && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleReset}
                      className="reset-button"
                    >
                      New Search
                    </Button>
                  )}
                </Box>
              </form>

              {/* Results Section */}
              {error && (
                <Fade in={true}>
                  <Box mt={3}>
                    <Alert severity="error" className="alert-message">
                      {error}
                    </Alert>
                  </Box>
                </Fade>
              )}

              {taxDetails && (
                <Fade in={true} timeout={800}>
                  <Box mt={3}>
                    <LevyDetails levyTotal={taxDetails.levy_total} levies={taxDetails.levies} />
                  </Box>
                </Fade>
              )}
            </Paper>
          </Zoom>

          {/* Footer */}
          <Box className="footer">
            {/* Disclaimer */}
            <Box className="disclaimer-box">
              <Typography variant="body2" className="disclaimer-text">
                This project is independently developed and not affiliated with the County of Sacramento. Data is derived from public records available under the California Public Records Act. Support links are voluntary and go toward hosting and data update costs.
              </Typography>
            </Box>
            
            {/* Donation Links */}
            <Box className="donation-links" mt={3}>
              <Typography variant="body2" className="donation-text" mb={1}>
                Support this project:
              </Typography>
              <Box className="donation-buttons">
                <Button
                  component="a"
                  href="https://buymeacoffee.com/helpfultools"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  startIcon={<CoffeeIcon />}
                  className="donation-button bmc-button"
                  sx={{
                    color: '#FFDD00',
                    borderColor: '#FFDD00',
                    '&:hover': {
                      borderColor: '#FFDD00',
                      background: 'rgba(255, 221, 0, 0.1)',
                    },
                  }}
                >
                  Buy Me a Coffee
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
      <Analytics />
    </>
  );
}

export default App;
