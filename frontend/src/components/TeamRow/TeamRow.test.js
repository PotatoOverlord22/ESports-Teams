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
    { name: 'Player 1', position: 'Top', kda: '3.5' },
    { name: 'Player 2', position: 'Mid', kda: '4.2' }
  ]
};

test('renders team row with basic info', () => {
  const { getByText, getByAltText } = render(<TeamRow team={team} />);
  
  expect(getByText('Team 1')).toBeInTheDocument();
  expect(getByText('Region 1')).toBeInTheDocument();
  expect(getByAltText('Team 1 logo')).toBeInTheDocument();
});

