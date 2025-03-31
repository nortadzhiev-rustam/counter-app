import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import ExpandableCounter from './ExpandableCounter';

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

  return (
    <ExpandableCounter counters={counters} onIncrement={handleIncrement} />
  );
}

export default Client;
