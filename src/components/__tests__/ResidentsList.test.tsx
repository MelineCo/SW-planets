import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResidentsList from '../ResidentsList';
import { vi } from 'vitest';

vi.mock('../ResidentRow', () => ({
  ResidentRow: ({ url }: { url: string }) => (
    <tr data-testid="resident-row">{url}</tr>
  ),
}));

describe('ResidentsList Component', () => {
  it('should render "No residents found" message when no URLs are passed', () => {
    render(<ResidentsList urls={[]} />);
    
    expect(screen.getByText(/No residents found/i)).toBeInTheDocument();
  });

  it('should render the residents table when URLs are provided', () => {
    const urls = ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'];
    render(<ResidentsList urls={urls} />);

    // expect(screen.getByTestId('all-residents-list')).toBeInTheDocument();
    // expect(screen.getAllByTestId('resident-row')).toHaveLength(urls.length);
    expect(screen.getAllByRole('row')).toHaveLength(urls.length+1)
  });
});
