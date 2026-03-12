export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? 0 : 30;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});
