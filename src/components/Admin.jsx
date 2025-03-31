import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ref, push, remove, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useEffect } from 'react';

function Admin() {
  const [title, setTitle] = useState('');
  const [targetNumber, setTargetNumber] = useState('');
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const countersRef = ref(db, 'counters');
    const unsubscribe = onValue(
      countersRef,
      (snapshot) => {
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
      },
      (error) => {
        console.error('Database error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !targetNumber) return;

    try {
      const counterRef = ref(db, 'counters');
      await push(counterRef, {
        title,
        targetNumber: parseInt(targetNumber),
        currentNumber: 0,
      });

      setTitle('');
      setTargetNumber('');
    } catch (error) {
      console.error('Error adding counter:', error);
    }
  };

  const handleDelete = async (counterId) => {
    const counterRef = ref(db, `counters/${counterId}`);
    await remove(counterRef);
  };

  return (
    <Container maxWidth='md'>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Admin Dashboard
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}
          >
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin='normal'
              />
              <TextField
                fullWidth
                label='Target Number'
                type='number'
                value={targetNumber}
                onChange={(e) => setTargetNumber(e.target.value)}
                margin='normal'
              />
              <Button variant='contained' type='submit' sx={{ mt: 2 }}>
                Add Counter
              </Button>
            </Box>

            <List sx={{ ml: 2, mt: 3, width: '100%' }}>
              {counters.map((counter) => (
                <ListItem
                  key={counter.id}
                  secondaryAction={
                    <IconButton
                      edge='end'
                      onClick={() => handleDelete(counter.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={counter.title}
                    secondary={
                      counter.currentNumber === counter.targetNumber
                        ? 'Done'
                        : `Current: ${counter.currentNumber} / Target: ${counter.targetNumber}`
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Admin;
