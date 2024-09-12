import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Planet from '../Planet'; 
import { Planet as PlanetType } from '../../types/planets'
import '@testing-library/jest-dom';

const mockPlanet: PlanetType = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
        "https://swapi.dev/api/people/4/",
        "https://swapi.dev/api/people/6/",
        "https://swapi.dev/api/people/7/",
        "https://swapi.dev/api/people/8/",
        "https://swapi.dev/api/people/9/",
        "https://swapi.dev/api/people/11/",
        "https://swapi.dev/api/people/43/",
        "https://swapi.dev/api/people/62/"
      ],
    films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: 'https://swapi.dev/api/planets/1/',
};

describe('Planet Component', () => {
    const renderComponent = (children?: React.ReactNode) => {
        return render(
            <BrowserRouter>
                <Planet planet={mockPlanet}>
                    {children}
                </Planet>
            </BrowserRouter>
        );
    };

    it('renders planet details correctly', () => {
        renderComponent();

        expect(screen.getByText('Planet: Tatooine')).toBeInTheDocument();
        expect(screen.getByText('Climate: arid')).toBeInTheDocument();
        expect(screen.getByText('Population: 200000')).toBeInTheDocument();
    });

    it('renders the correct link to the planet page', () => {
        renderComponent();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', expect.stringMatching(/^\/planets\/1\/?$/));
    });
});
