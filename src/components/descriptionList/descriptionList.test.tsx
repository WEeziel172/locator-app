import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { DescriptionItem } from '@components/descriptionItem/descriptionItem.tsx';
import { DescriptionList } from '@components/descriptionList/descriptionList.tsx';

describe('Description list', () => {
  it('renders description list with item', () => {
    const title = 'Test';
    const message = 'Message';
    const { getByTestId } = render(
      <DescriptionList>
        <DescriptionItem title={title} description={message} />
      </DescriptionList>,
    );
    const parent = getByTestId('description-list');
    const child = getByTestId('description-item');

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByText(message)).toBeDefined();
    expect(screen.getByTestId('description-list')).toBeDefined();
    expect(parent).toContainElement(child);
  });
});
