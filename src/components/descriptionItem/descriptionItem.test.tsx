import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { DescriptionItem } from '@components/descriptionItem/descriptionItem.tsx';

describe('Description item', () => {
  it('renders item', () => {
    const title = 'Test';
    const message = 'Message';
    render(<DescriptionItem title={title} description={message} />);

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByText(message)).toBeDefined();
  });
});
