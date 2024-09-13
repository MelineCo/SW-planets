import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { ResidentRow } from '../ResidentRow';
import { useGetResident } from '../../hooks/useGetResident';

vi.mock('../../hooks/useGetResident');

describe('ResidentRow Component', () => {
  const mockResidentData = {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    height: '172',
    mass: '77',
    hair_color: 'blond',
  };

  it('should display the loading skeleton while fetching data', () => {
    (useGetResident as Mock).mockReturnValue({
      resident: undefined,
      isPending: true,
      error: null,
    });

    render(<ResidentRow url="https://swapi.dev/api/people/1/" />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should display an error message if there is an error', () => {
    (useGetResident as Mock).mockReturnValue({
      resident: undefined,
      isPending: false,
      error: { message: 'Failed to fetch resident' },
    });

    render(<ResidentRow url="https://swapi.dev/api/people/1/" />);

    expect(screen.getByText(/Failed to fetch resident/i)).toBeInTheDocument();
  });

  it('should render resident data when available', () => {
    (useGetResident as Mock).mockReturnValue({
      resident: mockResidentData,
      isPending: false,
      error: null,
    });

    render(<ResidentRow url="https://swapi.dev/api/people/1/" />);

    const residentName = screen.getByText('Luke Skywalker');
    expect(residentName).toBeInTheDocument();

    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  it('should open modal with resident details on row click', async () => {
    (useGetResident as Mock).mockReturnValue({
      resident: mockResidentData,
      isPending: false,
      error: null,
    });

    render(<ResidentRow url="https://swapi.dev/api/people/1/" />);

    const residentRow = screen.getByText('Luke Skywalker');
    fireEvent.click(residentRow);

    expect(screen.getByText('Resident details')).toBeInTheDocument();
    expect(screen.getByText('Birth year : 19BBY')).toBeInTheDocument();
  });

  it('should close the modal when the "Fermer" button is clicked', async () => {
    (useGetResident as Mock).mockReturnValue({
      resident: mockResidentData,
      isPending: false,
      error: null,
    });

    render(<ResidentRow url="https://swapi.dev/api/people/1/" />);

    fireEvent.click(screen.getByText('Luke Skywalker'));

    expect(screen.getByText('Resident details')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Fermer'));

    await waitFor(() => {
      expect(screen.queryByText('Resident details')).not.toBeInTheDocument();
    });
  });
});
