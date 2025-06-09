export function timeAgo(timestamp) {
  const now = Date.now() - 3000000;
  const seconds = Math.floor((now - timestamp) / 1000);

  const intervals = {
    y: 31536000,   // 365 days
    mo: 2592000,   // 30 days
    w: 604800,     // 7 days
    d: 86400,      // 1 day
    h: 3600,       // 1 hour
    min: 60,       // 1 minute
    s: 1           // 1 second
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count > 0) {
      return `${count}${unit} ago`;
    }
  }

  return 'just now';
}