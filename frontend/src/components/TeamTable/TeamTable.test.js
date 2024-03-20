import React from 'react';
import { render, fireEvent, getByTestId, getByLabelText, getAllByAltText, getAllByText, getByRole } from '@testing-library/react';
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

test('adding a team to the component', () => {
  const { getByText, getByLabelText } = render(<TeamTable teamsList={teamsList} />);
  fireEvent.click(getByText('Add new team'));

  // get the form input
  const nameInput = getByLabelText('Team name');
  const regionInput = getByLabelText('Region');
  const addButton = getByText('Save new team');

  fireEvent.change(nameInput, { target: { value: 'new team' } });
  fireEvent.change(regionInput, { target: { value: 'europe' } });
  fireEvent.click(addButton);

  // check if it was added
  expect(getByText('new team')).toBeInTheDocument();
  expect(getByText('europe')).toBeInTheDocument();
});

test("test edit", () => {
    const { getByText, getAllByText, getByRole } = render(<TeamTable teamsList={teamsList} />);

    const editButtons = getAllByText("Edit");
    // click the first edit button
    fireEvent.click(editButtons[0]);

    const editInput = getByRole("edit-name");
    fireEvent.input(editInput, { target: { value: "New Team Name" } });

    const saveButton = getByText("Save Edit");
    fireEvent.click(saveButton);

    expect(getByText("New Team Name")).toBeInTheDocument();
  });

test('test search function based on region', () => {
    const teamsList = [
      { id: 1, name: 't1', region: 'europe', players: [] },
      { id: 2, name: 't2', region: 'NORTH AMERICA', players: [] },
      { id: 3, name: 't3', region: 'EUROPEEE', players: [] },
    ];
    const { getByPlaceholderText, getByText } = render(<TeamTable teamsList={teamsList} />);
    
    const searchInput = getByPlaceholderText('Search by region...');

    fireEvent.change(searchInput, { target: { value: 'europe' } });
    // t1 and t3 should be on the screen  
    expect(getByText('t1')).toBeInTheDocument();
    expect(getByText('t3')).toBeInTheDocument();
    // t2 should not be on the screen
    expect(() => getByText('t2')).toThrow();
  });