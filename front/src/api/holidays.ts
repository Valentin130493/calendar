import axios from 'axios';
import type { Holiday } from '../types';

const API_BASE = 'https://date.nager.at/api/v3';

export const fetchHolidays = (year: number, countryCode = 'US') =>
  axios.get<Holiday[]>(`${API_BASE}/PublicHolidays/${year}/${countryCode}`);
