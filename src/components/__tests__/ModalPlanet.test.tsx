import ModalPlanet from '../ModalPlanet';
import { useGetPlanet } from '../../hooks/useGetPlanet';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect  } from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';

vi.mock('../../hooks/useGetPlanet', () => ({
    useGetPlanet: vi.fn(),
  }));

vi.mock('react-router-dom', () => ({
   useNavigate: vi.fn(),
   useParams: vi.fn(),
}));

describe("ModalPlanet Component", () => {
    const mockUseGetPlanet = useGetPlanet as ReturnType<typeof vi.fn>;
    const mockUseNavigate = useNavigate as ReturnType<typeof vi.fn>;
    const mockUseParams = useParams as ReturnType<typeof vi.fn>;

    it("should display planet details when data is fetched successfully", () => {
        mockUseGetPlanet.mockReturnValue({
            planet: {
                name: 'Tatooine',
                climate: 'arid',
                population: '200000',
                orbital_period: '304',
                diameter: '10465',
              },
            isPending: false,
            error: null,
          });

          mockUseNavigate.mockReturnValue(vi.fn())

          mockUseParams.mockReturnValue({ planetId: '1' });

        render(<ModalPlanet />);

        expect(screen.getByText('Planet:')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
        expect(screen.getByText('Climate:')).toBeInTheDocument();
        expect(screen.getByText('arid')).toBeInTheDocument();
        expect(screen.getByText('Population:')).toBeInTheDocument();
        expect(screen.getByText('200000')).toBeInTheDocument();
        expect(screen.getByText('Orbital period:')).toBeInTheDocument();
        expect(screen.getByText('304')).toBeInTheDocument();
        expect(screen.getByText('Diameter:')).toBeInTheDocument();
        expect(screen.getByText('10465')).toBeInTheDocument();
    })
})
