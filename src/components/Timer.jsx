import React, { useEffect, useState } from "react";

const Timer = ({ timerState: { remainingTime, endsAt } }) => {
  const initialTime = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const calculateTime = (timeInS) => {
    const s = timeInS;
    let months = Math.floor(s / (60 * 60 * 24 * 30));
    let days = Math.floor((s / (60 * 60 * 24)) % 30);
    let hours = Math.floor((s / (60 * 60)) % 24);
    let minutes = Math.floor((s / 60) % 60);
    let seconds = Math.floor(s % 60);

    return { months, days, hours, minutes, seconds };
  };

  const units = [
    { key: "months", value: timeLeft.months || 0 },
    { key: "days", value: timeLeft.days || 0 },
    { key: "hours", value: timeLeft.hours || 0 },
    { key: "minutes", value: timeLeft.minutes || 0 },
    { key: "seconds", value: timeLeft.seconds || 0 },
  ];

  useEffect(() => {
    const endTime = new Date(endsAt);
    let interval = setInterval(() => {
      const startTime = Date.now();
      const timeLeftInS = (endTime.getTime() - startTime) / 1000;
      setTimeLeft(calculateTime(timeLeftInS));
    }, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const filteredUnits = units.filter((u) => u.value > 0).slice(0, 2);
  const styles = {
    marginRight: "1rem",
  };

  return (
    <div>
      {filteredUnits.map((unit) => (
        <span style={styles} key={unit.key}>
          {unit.value}
          {unit.key}
        </span>
      ))}
    </div>
  );
};

export default Timer;
