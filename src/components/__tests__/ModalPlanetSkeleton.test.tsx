import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ModalPlanetSkeleton } from '../ModalPlanetSkeleton';
import '@testing-library/jest-dom';

// Test l'affichage des labels + nombre de skeletons + style des skeletons

describe('ModalPlanetSkeleton', () => {
    it('renders the Skeleton components for each label', () => {
        render(<ModalPlanetSkeleton />);
        
        expect(screen.getByText('Planet:')).toBeInTheDocument();
        expect(screen.getByText('Climate:')).toBeInTheDocument();
        expect(screen.getByText('Population:')).toBeInTheDocument();
        expect(screen.getByText('Orbital period:')).toBeInTheDocument();
        expect(screen.getByText('Diameter:')).toBeInTheDocument();
        
        const skeletons = screen.getAllByTestId('skeleton');
        expect(skeletons).toHaveLength(5);

        skeletons.forEach((skeleton) => {
            expect(skeleton).toHaveStyle({ width: '100px', height: '30px' });
        });
    });
});
