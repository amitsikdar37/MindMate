const isLocal = window.location.hostname === 'localhost';

export const BACKEND_URL = isLocal
  ? 'http://localhost:5000'
  : 'https://mindmate-t4nu.onrender.com';


