function secondsToHms(d: number): string {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) : '00';
  const mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) : '00';
  const sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hDisplay}:${mDisplay}:${sDisplay}`;
}

function secondsToHmsDescription(d: number): string {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? `${h}h ` : '';
  const mDisplay = m > 0 ? `${m}min ` : '';
  const sDisplay = s > 0 ? `${s}seg ` : '';
  return hDisplay + mDisplay + sDisplay;
}

export { secondsToHms, secondsToHmsDescription };
