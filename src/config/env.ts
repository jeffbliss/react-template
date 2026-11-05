const createEnv = () => {
  return {
    API_URL:
      (import.meta.env.VITE_APP_API_URL as string) ??
      'http://localhost:3000/api',
  };
};

export const env = createEnv();
