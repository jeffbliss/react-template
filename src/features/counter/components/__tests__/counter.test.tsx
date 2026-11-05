import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '@/testing/test-utils';
import { Counter } from '../counter';

describe('Counter', () => {
  it('increments, decrements, and resets the count', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={0} />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
