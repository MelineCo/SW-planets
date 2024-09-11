import { useState, useEffect } from 'react';

interface Time { days: number; hours: number; minutes: number; seconds: number }

const getTimeRemaining = (endDate: Date): Time => {
    const now = new Date();
    const diffInMillis = endDate.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diffInMillis / 1000);
    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = diffInSeconds % 60;

    return { days, hours, minutes, seconds };
};

export const useTimer = (expirationDate: string) => {

    const [timeRemaining, setTimeRemaining] = useState<Time>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    
    useEffect(() => {
        const intervalId = setInterval(() => setTimeRemaining(getTimeRemaining(new Date(expirationDate))), 1000);
    
        return () => clearInterval(intervalId);
      }, [expirationDate]);

      return timeRemaining;
}



