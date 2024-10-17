import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft () {
    const difference = +new Date("2024-10-20") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-orange-400" key={index}>
        {timeLeft[interval]} {interval} {""}
      </span>
    );
  });

  console.log(Object.keys(timeLeft))

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-500 text-[25px]">Time's up</span>
      )}
    </div>
  );
};
export default CountDown;
