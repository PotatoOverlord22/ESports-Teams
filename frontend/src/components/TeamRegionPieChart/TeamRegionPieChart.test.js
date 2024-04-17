import React from 'react';
import { render, fireEvent, getByTestId, getByLabelText, getAllByAltText, getAllByText, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegionPieChart from './RegionPieChart';

// NOTE TO SELF: stop using jest, too many issues
// this fixes an issue with jest and render() function
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
})

// mock
const teamsList = [
    { id: 1, name: 't1', region: 'r1', players: [{ name: "test-name", position: "test-position", kda: 0.01 }, { name: "test-name2", position: "test-position2", kda: 0.02 }] },
    { id: 2, name: 't2', region: 'r2', players: [] }
];

describe("Region pie chart tests", () => {
    test('test region piechart legend', () => {
        const { getAllByText, getByText } = render(<RegionPieChart listOfTeams={teamsList} />)
        // this piechart generates multiple elements that have the name of the regions, one of them should suffice
        expect(getAllByText('r1')[0]).toBeInTheDocument();
        expect(getAllByText('r2')[0]).toBeInTheDocument();
    })

})