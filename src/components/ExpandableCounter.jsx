import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Backdrop,
} from '@mui/material';

function ExpandableCounter({ counters, onIncrement }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedId(id);
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  if (selectedId !== null) {
    const selectedCounter = counters.find(
      (counter) => counter.id === selectedId
    );
    if (!selectedCounter) return null;
    const progress =
      (selectedCounter.currentNumber / selectedCounter.targetNumber) * 100;
    return (
      <Backdrop
        open={true}
        onClick={handleClose}
        sx={{
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            width: '90%',
            maxWidth: 600,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                {selectedCounter.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 2,
                  mb: 1,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CircularProgress
                    variant='determinate'
                    value={progress}
                    size={250}
                  />
                  <Box
                    onClick={() => {
                      if (
                        selectedCounter.currentNumber <
                        selectedCounter.targetNumber
                      ) {
                        onIncrement(selectedCounter);
                      }
                    }}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor:
                        selectedCounter.currentNumber <
                        selectedCounter.targetNumber
                          ? 'pointer'
                          : 'default',
                    }}
                  >
                    <Typography variant='h6'>
                      {selectedCounter.currentNumber >=
                      selectedCounter.targetNumber
                        ? 'Done'
                        : `${selectedCounter.currentNumber} / ${selectedCounter.targetNumber}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography align='center' variant='body2' color='text.secondary'>
                Progress: {selectedCounter.currentNumber} /{' '}
                {selectedCounter.targetNumber}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Backdrop>
    );
  }

  return (
    <Container
      sx={{
        width: { xs: '100vw', md: '100vw', lg: '50vw', xl: '50vw' },
        mx: 'auto',
        py: 3,
      }}
    >
      <Grid container spacing={3}>
        {counters.map((counter) => (
          <Grid size={12} key={counter.id}>
            <Card
              onClick={() => handleCardClick(counter.id)}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  {counter.title}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <LinearProgress
                    variant='determinate'
                    value={(counter.currentNumber / counter.targetNumber) * 100}
                  />
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Progress: {counter.currentNumber} / {counter.targetNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExpandableCounter;
