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
} from '@mui/material';
import LevyDetails from './LevyDetails';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullStreetName = `${streetName} ${streetSuffix}`.trim(); // Concatenate street name and suffix

    fetch(
      `https://sacramento-mello-roos-be.vercel.app/get-tax-details?street_number=${streetNumber}&street_name=${encodeURIComponent(fullStreetName)}&city=${encodeURIComponent(city)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data) {
          setTaxDetails(data);
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
    <>
      <Helmet>
        <title>Sacramento County Mello Roos Tax Information</title>
        <meta
          name="description"
          content="Find Mello Roos property tax information in Sacramento County. Learn about direct levies and assessments."
        />
        <meta
          name="keywords"
          content="Mello Roos, Sacramento, Elk Grove, Folsom, Natomas, West Sacramento, Rancho Cordova, Lincoln, Mello Roos"
        />
        <meta property="og:title" content="Sacramento County Mello Roos Tax Information" />
        <meta property="og:description" content="Find Mello Roos tax information in Sacramento County by address. Learn about direct levies and assessments." />
        <meta property="og:url" content="https://sacramento-mello-roos.vercel.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
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
                placeholder="Main"
              />
            </Box>
            <Box mb={2}>
              <Autocomplete
                options={streetSuffixes}
                value={streetSuffix}
                onChange={(e, newValue) => setStreetSuffix(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Street Suffix"
                    placeholder="St"
                    variant="outlined"
                    fullWidth
                  />
                )}
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
          {taxDetails && (
            <LevyDetails levyTotal={taxDetails.levy_total} levies={taxDetails.levies} />
          )}
        </Paper>
      </Container>
      <Analytics />
    </>
  );
}

export default App;
