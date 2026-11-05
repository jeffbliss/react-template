import { http, HttpResponse } from 'msw';
import { env } from '@/config/env';

export const handlers = [
  http.get(`${env.API_URL}/healthcheck`, () => {
    return HttpResponse.json({ ok: true });
  }),
];
