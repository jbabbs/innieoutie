export function formatTime(ms: number) {
  const seconds: number = ms / 1000;
  return seconds.toFixed(3);
}

export function formatTimeSince(time: number) {
  const diff = (+new Date()) - time;
  return formatTime(diff);
}
