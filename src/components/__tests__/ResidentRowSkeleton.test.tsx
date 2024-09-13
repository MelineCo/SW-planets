import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ResidentRowSkeleton } from '../ResidentRowSkeleton';

describe('ResidentRowSkeleton Component', () => {

  it('should render 3 skeletons for each table cell', () => {
    render(<ResidentRowSkeleton />);

    const tableCells = screen.getAllByRole('cell');
    expect(tableCells).toHaveLength(3);

    tableCells.forEach((cell) => {
      const skeleton = cell.querySelector('span.MuiSkeleton-root');
      expect(skeleton).toBeInTheDocument();
    });
  });
});
