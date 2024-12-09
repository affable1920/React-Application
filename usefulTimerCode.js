let times = timeSpan.includes("hr")
  ? timeSpan.replace(/\D+/g, " * 60 * 60")
  : timeSpan.includes("min")
  ? timeSpan.replace(/\D+/g, " * 60")
  : "";

let timeInS = eval(times);
const timeInMs = timeInS * 1000;

const updatedTasks = tasks.map((t) =>
  t.id === task.id
    ? {
        ...t,
        timerState: {
          ...t.timerState,
          isActive: true,
          createdAt: renderCreationtime(),
          endsAt: renderTimerEndTime(timeInMs),
          remainingTime: timeInS,
        },
        history: {
          ...t.history,
          events: [
            ...t.history.events,
            { name: event.name, timeStamp: renderCreationtime() },
          ],
        },
      }
    : t
);
setTasks(updatedTasks);
createNotification(timeInS);
let timeout = setTimeout(() => {
  const { timerState } = tasks.find(t.id === task.id);
  toast.info("Time Up");
  const updatedTasks = tasks.map((t) =>
    t.id === task.id
      ? {
          ...t,
          timerState: {
            ...t.timerState,
            isActive: false,
            createdAt: tns,
            endsAt: tns,
            remainingTime: tns,
          },
        }
      : t
  );
  setTasks(updatedTasks);
}, timeInMs);
return () => clearTimeout(timeout);
