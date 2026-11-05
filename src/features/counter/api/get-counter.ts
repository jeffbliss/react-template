import { api } from '@/lib/api-client';
import type { CounterState } from '../types';

export const getCounter = (): Promise<CounterState> => {
  return api.get<CounterState>('/counter');
};
