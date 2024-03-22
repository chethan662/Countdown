import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timerId) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(targetDate).getTime() - now;
        if (distance <= 0) {
          clearInterval(intervalId);
          setCountdown(0);
          setErrorMessage("The countdown is over! What's next on your adventure?");
        } else {
          setCountdown(distance);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [targetDate, timerId]);

  const handleStartTimer = () => {
    if (!targetDate) {
      setErrorMessage('Please select a target date.');
      return;
    }

    const selectedDate = new Date(targetDate).getTime();
    if (isNaN(selectedDate)) {
      setErrorMessage('Please select a valid date and time.');
      return;
    }

    const now = new Date().getTime();
    const daysDifference = Math.ceil((selectedDate - now) / (1000 * 60 * 60 * 24));
    if (daysDifference > 100) {
      setErrorMessage('Selected time is more than 100 days');
      return;
    } else {
      setErrorMessage('');
    }

    if (timerId) {
      clearInterval(timerId);
    }

    const newTimerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = selectedDate - now;
      if (distance <= 0) {
        clearInterval(newTimerId);
        setCountdown(0);
        setErrorMessage('The countdown is over! What is next on your adventure?');
      } else {
        setCountdown(distance);
      }
    }, 1000);

    setTimerId(newTimerId);
  };

  const handleStopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const handleResetTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    setTargetDate('');
    setCountdown(0);
    setErrorMessage('');
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="form-container">
        <input type="datetime-local" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        <div className="button-container">
          <button className="start-button" onClick={handleStartTimer}>Start</button>
          <button className="stop-button" onClick={handleStopTimer}>Stop</button>
          <button className="reset-button" onClick={handleResetTimer}>Reset</button>
        </div>
      </div>
      <div className="message-container">
        {errorMessage && <p className="message">{errorMessage}</p>}
        {countdown > 0 && (
          <div className="timer-container">
            <div className="timer-box">
              <span className="timer-value">{formatTime(countdown).days}</span>
              <span className="timer-label">Days</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{formatTime(countdown).hours}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{formatTime(countdown).minutes}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-box">
              <span className="timer-value">{formatTime(countdown).seconds}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
