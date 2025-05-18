interface DateTimeInfo {
  date: string;        // e.g., "2025-05-18"
  time: string;        // e.g., "14:30:15"
  time_zone: string;   // e.g., "GMT+8 (Asia/Manila)"
}

export const getCurrentDateTime = (): DateTimeInfo => {
  const now = new Date();

  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0]; // HH:MM:SS

  const timeZoneOffset = -now.getTimezoneOffset() / 60;
  const tzSign = timeZoneOffset >= 0 ? '+' : '-';
  const tzLabel = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    date,
    time,
    time_zone: `GMT${tzSign}${Math.abs(timeZoneOffset)} (${tzLabel})`,
  };
};
