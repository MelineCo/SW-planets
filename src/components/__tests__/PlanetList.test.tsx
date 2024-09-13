import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import PlanetsList from "../PlanetsList";
import { MemoryRouter } from 'react-router-dom';
import { useGetPlanets } from "../../hooks/useGetPlanets";
import "@testing-library/jest-dom";

vi.mock("../../hooks/useGetPlanets", () => ({
  useGetPlanets: vi.fn(),
}));

describe("PlanetsList Component", () => {
  const renderComponent = () => render(
    <MemoryRouter>
      <PlanetsList />
    </MemoryRouter>);

  it("shows a skeleton while fetching data", () => {
    (useGetPlanets as Mock).mockReturnValue({
      data: undefined,
      isPending: true,
      error: null,
    });

    renderComponent();
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("displays error message if fetching fails", async () => {
    (useGetPlanets as Mock).mockReturnValue({
      data: undefined,
      isPending: false,
      error: new Error('Message d\'erreur'),
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Error: Message d\'erreur')).toBeInTheDocument();
    });
  });

  it("displays planets list when data is successfully fetched", async () => {
    const mockPlanets = [
        {
          name: "Tatooine",
          rotation_period: "23",
          orbital_period: "304",
          diameter: "10465",
          climate: "arid",
          gravity: "1 standard",
          terrain: "desert",
          surface_water: "1",
          population: "200000",
          residents: [],
          films: [],
          created: "2014-12-09T13:50:49.641000Z",
          edited: "2014-12-20T20:58:18.411000Z",
          url: "https://swapi.dev/api/planets/1/",
        },
        {
          name: "Alderaan",
          rotation_period: "24",
          orbital_period: "364",
          diameter: "12500",
          climate: "temperate",
          gravity: "1 standard",
          terrain: "grasslands, mountains",
          surface_water: "40",
          population: "2000000000",
          residents: [],
          films: [],
          created: "2014-12-10T11:35:48.479000Z",
          edited: "2014-12-20T20:58:18.420000Z",
          url: "https://swapi.dev/api/planets/2/",
        },
        {
          name: "Yavin IV",
          rotation_period: "24",
          orbital_period: "4818",
          diameter: "10200",
          climate: "temperate, tropical",
          gravity: "1 standard",
          terrain: "jungle, rainforests",
          surface_water: "8",
          population: "1000",
          residents: [],
          films: ["https://swapi.dev/api/films/1/"],
          created: "2014-12-10T11:37:19.144000Z",
          edited: "2014-12-20T20:58:18.421000Z",
          url: "https://swapi.dev/api/planets/3/",
        },
      ];

    (useGetPlanets as Mock).mockReturnValue({
      data: { "results": mockPlanets },
      isPending: false,
      error: null,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Planet: Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Climate: arid")).toBeInTheDocument();
      expect(screen.getByText("Population: 200000")).toBeInTheDocument();

      expect(screen.getByText("Planet: Alderaan")).toBeInTheDocument();
      expect(screen.getByText("Climate: temperate")).toBeInTheDocument();
      expect(screen.getByText("Population: 2000000000")).toBeInTheDocument();

      expect(screen.getByText("Planet: Yavin IV")).toBeInTheDocument();
      expect(screen.getByText("Climate: temperate, tropical")).toBeInTheDocument();
      expect(screen.getByText("Population: 1000")).toBeInTheDocument();
    });
  });

  it('displays "No results" message when there are no planets', async () => {
    (useGetPlanets as Mock).mockReturnValue({
      data: { results: [] },
      isPending: false,
      error: null,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });
});
