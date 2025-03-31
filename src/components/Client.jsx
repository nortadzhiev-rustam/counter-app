import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';

function Client() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const countersRef = ref(db, 'counters');
    const unsubscribe = onValue(countersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const countersList = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setCounters(countersList);
      } else {
        setCounters([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleIncrement = async (counter) => {
    if (counter.currentNumber < counter.targetNumber) {
      const counterRef = ref(db, `counters/${counter.id}`);
      await update(counterRef, {
        currentNumber: counter.currentNumber + 1,
      });
    }
  };

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <Container maxWidth="lg" sx={{ width: '100%', py: 3 }}>
     
      <Grid container spacing={3}>
        {counters.map((counter) => (
          <Grid size={12} key={counter.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {counter.title}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(
                      counter.currentNumber,
                      counter.targetNumber
                    )}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Progress: {counter.currentNumber} / {counter.targetNumber}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => handleIncrement(counter)}
                  disabled={counter.currentNumber >= counter.targetNumber}
                >
                  {counter.currentNumber >= counter.targetNumber ? "Done" : "+"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Client;
