import React from 'react';
import { render, fireEvent, getByTestId, getByLabelText, getAllByAltText, getAllByText, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamTable from './TeamTable';
import user from '@testing-library/user-event'

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

test('test correct headings and buttons are displayed', () => {
  const { getByText } = render(<TeamTable teams={teamsList} />);
  expect(getByText('Esports teams')).toBeInTheDocument()
  expect(getByText('Logo')).toBeInTheDocument()
  expect(getByText('Team Name')).toBeInTheDocument()
  expect(getByText('Region')).toBeInTheDocument()
  expect(getByText('Actions')).toBeInTheDocument()
  expect(getByText('Add new team')).toBeInTheDocument()
});

test('test teams to be displayed', () => {
  const { getByText } = render(<TeamTable teams={teamsList} />);
  expect(getByText('t1')).toBeInTheDocument()
  expect(getByText('t2')).toBeInTheDocument()
});

test('test regions to be displayed', () => {
  const { getAllByText } = render(<TeamTable teams={teamsList} />)
  // Since adding a region piechart we have two items displaying the region, we want the first one
  expect(getAllByText('r1')[0]).toBeInTheDocument()
  expect(getAllByText('r2')[0]).toBeInTheDocument()
})

test('test add new team form subcomponent', () => {
  const { getByText } = render(<TeamTable teams={teamsList} />);
  // get the add team button
  const addButton = getByText('Add new team');
  // click on the button
  fireEvent.click(addButton);
  expect(getByText('Add a new team')).toBeInTheDocument();
  expect(getByText('Save new team')).toBeInTheDocument();
  expect(getByText('Cancel')).toBeInTheDocument();
});

test('test adding a team to the component', () => {
  const { getByText, container, getByTestId, getAllByText } = render(<TeamTable teams={teamsList} />);

  fireEvent.click(getByText('Add new team'));

  // get the form input
  const nameInput = getByTestId('add-name-form-field');
  const regionInput = getByTestId('add-region-form-field');
  const playerNameInput = getByTestId('add-player-name-field');
  const playerPositionInput = getByTestId('add-player-position-field');
  const playerKdaInput = getByTestId('add-player-kda-field');
  const addButton = getByText('Save new team');

  fireEvent.change(nameInput, { target: { value: 'new team name' } });
  fireEvent.change(regionInput, { target: { value: 'new region' } });
  fireEvent.change(playerNameInput, { target: { value: 'new player' } });
  fireEvent.change(playerPositionInput, { target: { value: 'new position' } });
  fireEvent.change(playerKdaInput, { target: { value: 3.14 } });

  fireEvent.click(addButton);

  // check if it was added
  expect(getByText('new team name')).toBeInTheDocument();
  // Since adding a region piechart we have two items displaying the region, we want the first one
  expect(getAllByText('new region')[0]).toBeInTheDocument();
  // click on the third info icon (again, maybe not the best test practice to have this into my 'add test')
  const infoIcons = container.querySelectorAll('#info-icon');
  fireEvent.click(infoIcons[2]);

  expect(getByText('new player')).toBeInTheDocument();
  expect(getByText('new position')).toBeInTheDocument();
  expect(getByText('3.14')).toBeInTheDocument();
});

test('should trigger edit team when edit button is clicked', () => {
  const { getAllByText, getByText } = render(<TeamTable teams={teamsList} />)
  // click the first edit button
  fireEvent.click(getAllByText('Edit')[0]);
  expect(getByText('Edit t1')).toBeInTheDocument();
});

test("test editing a team's fields", () => {
  const { getAllByText, getByText, getByTestId, getAllByTestId, container } = render(<TeamTable teams={teamsList} />)
  // click on the first edit button
  fireEvent.click(getAllByText('Edit')[0]);

  // get the input text fields
  const editNameInput = getByTestId('edit-name-form-field');
  const editRegionInput = getByTestId('edit-region-form-field');
  // get all the input text fields for the players' names, position and kda
  const editPlayerNameInputs = getAllByTestId('edit-player-name-form-field')
  const editPlayerPositionInputs = getAllByTestId('edit-player-position-form-field')
  const editPlayerKdaInputs = getAllByTestId('edit-player-kda-form-field')
  // get the save buttton
  const saveButton = getByText('Save Edit');

  console.log(editPlayerPositionInputs[0])

  fireEvent.change(editNameInput, { target: { value: 'edited team name' } });
  fireEvent.change(editRegionInput, { target: { value: 'edited region name' } });

  // only gonna test the first player to edit
  fireEvent.change(editPlayerPositionInputs[0], { target: { value: 'edited player position' } });
  console.log(editPlayerPositionInputs[0])
  fireEvent.change(editPlayerKdaInputs[0], { target: { value: 3.14 } });
  fireEvent.change(editPlayerNameInputs[0], { target: { value: 'edited player name' } });

  // click save
  fireEvent.click(saveButton);

  // check if everything edited is on screen
  expect(getByText('edited team name')).toBeInTheDocument();
  expect(getAllByText('edited region name')[0]).toBeInTheDocument();
  // now we have to click more info to see these fields (kinda breaking the single responsibility of this test by accessing so many parts)
  const infoIcon = container.querySelector('#info-icon');
  fireEvent.click(infoIcon);
  // now we should have the fields rendered on screen
  expect(getByText('edited player position')).toBeInTheDocument();
  expect(getByText('3.14')).toBeInTheDocument();
  expect(getByText('edited player name')).toBeInTheDocument();
});

test('test search function based on region', () => {
  const teamsList = [
    { id: 1, name: 't1', region: 'europe', players: [] },
    { id: 2, name: 't2', region: 'NORTH AMERICA', players: [] },
    { id: 3, name: 't3', region: 'EUROPEEE', players: [] },
  ];
  const { getByPlaceholderText, getByText } = render(<TeamTable teams={teamsList} />);

  const searchInput = getByPlaceholderText('Search by region...');

  fireEvent.change(searchInput, { target: { value: 'europe' } });
  // t1 and t3 should be on the screen  
  expect(getByText('t1')).toBeInTheDocument();
  expect(getByText('t3')).toBeInTheDocument();
  // t2 should not be on the screen
  expect(() => getByText('t2')).toThrow();
});

test('test delete team', () => {
  const { getAllByText, getByText } = render(<TeamTable teams={teamsList} />)
  // click on the first delete button (deletes the first team)
  fireEvent.click(getAllByText('Delete')[0]);

  // the deleted team should no longer be on screen
  expect(() => getByText('t1')).toThrow();
})

test('test region piechart', () => {
  const { getAllByText, getByText } = render(<TeamTable teams={teamsList} />)
  // regions should be a label in the piechart which is displayed below the teams, so index 1
  expect(getAllByText('r1')[1]).toBeInTheDocument();
  expect(getAllByText('r2')[1]).toBeInTheDocument();
})

test('test pagination', () => {
  // show only one team per page, we should have two pages
  const { getByTestId, getByRole, getByText } = render(<TeamTable teams={teamsList} itemsPerPage={1} />)
  const pagination = getByTestId('pagination')

  // the first team should be in the document, the second one shouldn't be
  expect(getByText('t1')).toBeInTheDocument();
  expect(() => getByText('t2')).toThrow();

  // get the next page button
  const nextPageButton = getByRole("button", {
    name: "Go to next page",
  });

  // click to the next page
  fireEvent.click(nextPageButton);

  // now the first team shouldn't be in the document and the second one should
  expect(() => getByText('t1')).toThrow();
  expect(getByText('t2')).toBeInTheDocument();
})