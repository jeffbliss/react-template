import { useCounter } from '../hooks/use-counter';

type CounterProps = {
  initialCount?: number;
};

export const Counter = ({ initialCount = 0 }: CounterProps) => {
  const { count, increment, decrement, reset } = useCounter(initialCount);

  return (
    <section aria-label="Counter">
      <p>Count: {count}</p>
      <div>
        <button type="button" onClick={decrement}>
          Decrement
        </button>
        <button type="button" onClick={increment}>
          Increment
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </section>
  );
};
