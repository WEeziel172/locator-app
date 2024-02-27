import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { Header } from '@components/header/header.tsx';

describe('Header', () => {
  it('Should render correctly', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeDefined();
  });
});
