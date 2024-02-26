import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { Card } from '@components/card/card.tsx';
import Icon from '@assets/icons/starwars-rebel.svg';

describe('Card', () => {
  it('renders details', () => {
    render(<Card image={Icon} details={[<p key={1}>Test</p>]} className={''} selected={false} />);

    expect(screen.getByText('Test')).toBeDefined();
  });

  it('renders image', () => {
    render(<Card image={Icon} details={[<p key={1}>Test</p>]} className={''} selected={false} />);

    expect(screen.getByRole('img')).toBeDefined();
    expect(screen.getByRole('img')).toHaveAttribute('src', Icon);
  });
});
