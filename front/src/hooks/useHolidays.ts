import { useQuery } from '@tanstack/react-query';
import { fetchHolidays } from '../api/holidays';
import type { Holiday } from '../types';

export const useHolidays = (year: number, countryCode: string = import.meta.env.VITE_REACT_APP_COUNTRY_CODE || 'US') => {
  return useQuery({
    queryKey: ['holidays', year, countryCode],
    queryFn: () => fetchHolidays(year, countryCode).then(res => res.data as Holiday[])
  });
};
