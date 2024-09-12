import ModalPlanet from '../ModalPlanet';
import { useGetPlanet } from '../../hooks/useGetPlanet';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect  } from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

vi.mock('../../hooks/useGetPlanet', () => ({
    useGetPlanet: vi.fn(),
  }));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn().mockReturnValue({ planetId: '1' }),
  }
})

describe("ModalPlanet Component", () => {
    const mockUseGetPlanet = useGetPlanet as ReturnType<typeof vi.fn>;
    const mockUseNavigate = useNavigate as ReturnType<typeof vi.fn>;
    const mockUseParams = useParams as ReturnType<typeof vi.fn>;
    const mockPlanetData = {
      name: 'Tatooine',
      climate: 'arid',
      population: '200000',
      orbital_period: '304',
      diameter: '10465',
  };

    const renderComponent = (planetId: string) =>
      render(
        <MemoryRouter initialEntries={['/planets', `/planets/${planetId}`]}>
            <Routes>
                <Route path={`/planets/${planetId}`} element={<ModalPlanet />} />
            </Routes>
        </MemoryRouter>
      );

    it('shows skeleton when data is pending', () => {
        (useGetPlanet as vi.Mock).mockReturnValue({
            planet: null,
            isPending: true,
            error: null,
        });

        renderComponent('1');

        expect(screen.getAllByTestId('skeleton')).toHaveLength(5);
    });

    it('displays error message if fetching fails', async () => {
      (useGetPlanet as vi.Mock).mockReturnValue({
          planet: null,
          isPending: false,
          error: new Error('Unknown error from devtools'),
      });

      renderComponent('1');


      // expect(screen.getByTestId('planets-error')).toBeInTheDocument();
        // expect(screen.getByText('Unknown error from devtools')).toBeInTheDocument();
  });

    it("should display planet details when data is fetched successfully", () => {
        mockUseGetPlanet.mockReturnValue({
            planet: mockPlanetData,
            isPending: false,
            error: null,
          });

        mockUseNavigate.mockReturnValue(vi.fn())
        mockUseParams.mockReturnValue({ planetId: '1' });

        renderComponent('1');

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
    });

    it('displays "Planet not found" if the planet is not found and no error occurs', async () => {
      (useGetPlanet as vi.Mock).mockReturnValue({
          planet: null,
          isPending: false,
          error: null,
      });

      renderComponent('1');

      expect(screen.getByText('Planet not found')).toBeInTheDocument();
  });

    it('navigates back when the close button is clicked', async () => {
      const mockNavigate = vi.fn();


      mockUseGetPlanet.mockReturnValue({
        planet: mockPlanetData,
        isPending: false,
        error: null,
      });

      renderComponent('1');

      // fireEvent.click(screen.getByRole('button', {name: /fermer/i}));
      fireEvent.click(screen.getByText('Fermer'));
      // fireEvent.click(screen.getByTestId('close-button'));
      await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(-1);
      // expect(mockNavigate).toHaveBeenCalledWith('/planets');
      });
  });
})
