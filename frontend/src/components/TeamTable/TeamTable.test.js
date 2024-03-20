import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamTable from './TeamTable';

// mock
const teamsList = [
    { id: 1, name: 't1', region: 'r1', players: [{name: "test-name", position: "test-position", kda: 0.01}] },
    { id: 2, name: 't2', region: 'r2', players: [] }
];

test('test correct headings and buttons are displayed', () => {
    const { getByText } = render(<TeamTable teamsList={teamsList} />);
    expect(getByText('Esports teams')).toBeInTheDocument()
    expect(getByText('Logo')).toBeInTheDocument()
    expect(getByText('Team Name')).toBeInTheDocument()
    expect(getByText('Region')).toBeInTheDocument()
    expect(getByText('Actions')).toBeInTheDocument()
    expect(getByText('Add new team')).toBeInTheDocument()
});

test('test teams to be displayed', () => {
    const { getByText } = render(<TeamTable teamsList={teamsList} />);
    expect(getByText('t1')).toBeInTheDocument()
    expect(getByText('t2')).toBeInTheDocument()
});

test('test regions to be displayed', () => {
    const { getByText } = render(<TeamTable teamsList={teamsList}/>)
    expect(getByText('r1')).toBeInTheDocument()
    expect(getByText('r2')).toBeInTheDocument()
})

test('test add new team form subcomponent', () => {
    const { getByText } = render(<TeamTable teamsList={teamsList} />);
    // get the add team button
    const addButton = getByText('Add new team');
    // click on the button
    fireEvent.click(addButton);
    expect(getByText('Add a new team')).toBeInTheDocument();
    expect(getByText('Save new team')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
});

test('test more info', () => {
    const { getByText, container } = render(<TeamTable teamsList={teamsList} />);
    // I couldn't get the image in other ways other than searching for the id
    const infoIcon = container.querySelector('#info-icon');

    fireEvent.click(infoIcon);
    expect(getByText('test-name')).toBeInTheDocument();
    expect(getByText('test-position')).toBeInTheDocument();
    expect(getByText('0.01')).toBeInTheDocument();
});
