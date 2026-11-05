export const MainErrorFallback = () => {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <button
        type="button"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};
