import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamRow from './TeamRow';

// mock team data
const team = {
  id: 1,
  name: 'Team 1',
  region: 'Region 1',
  logo: 'team1_logo.jpg',
  players: [
    { name: 'test-name', position: 'test-position', kda: 0.01 },
    { name: 'p2', position: 'Mid', kda: 4.2 }
  ]
};

test('test team row with basic info', () => {
  const { getByText, getByAltText } = render(<TeamRow team={team} />);
  
  expect(getByText('Team 1')).toBeInTheDocument();
  expect(getByText('Region 1')).toBeInTheDocument();
  expect(getByAltText('Team 1 logo')).toBeInTheDocument();
});

test('test team row with more info', () => {
  const { getByText, container } = render(<TeamRow team={team} />);
  // I couldn't get the image in other ways other than searching for the id
  const infoIcon = container.querySelector('#info-icon');

  fireEvent.click(infoIcon);
  expect(getByText('test-name')).toBeInTheDocument();
  expect(getByText('test-position')).toBeInTheDocument();
  expect(getByText('0.01')).toBeInTheDocument();
  // also check if the other fields still remained
  expect(getByText('Team 1')).toBeInTheDocument();
});


