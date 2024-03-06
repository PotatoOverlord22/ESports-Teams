import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Student from './Student';

test('renders student with correct initial values and toggles edit mode', () => {
  const student = { id: 1, name: 'John Doe', age: 20 };
  const onDeleteMock = jest.fn();

  const { getByDisplayValue, getByText } = render(
    <Student student={student} onDelete={onDeleteMock} />
  );

  // Check if initial values are rendered correctly
  const nameInput = getByDisplayValue('John Doe');
  const ageInput = getByDisplayValue('20');

  expect(nameInput).toBeInTheDocument();
  expect(ageInput).toBeInTheDocument();

  // Click on edit button and check if inputs become editable
  fireEvent.click(getByText('Edit'));

  expect(nameInput).toBeEnabled();
  expect(ageInput).toBeEnabled();

  // Click on save button and check if inputs become disabled again
  fireEvent.click(getByText('Save'));

  expect(nameInput).toBeDisabled();
  expect(ageInput).toBeDisabled();
});

test('calls onDelete callback when delete button is clicked', () => {
  const student = { id: 1, name: 'John Doe', age: 20 };
  const onDeleteMock = jest.fn();

  const { getByText } = render(
    <Student student={student} onDelete={onDeleteMock} />
  );

  fireEvent.click(getByText('Delete'));

  expect(onDeleteMock).toHaveBeenCalledWith(1);
});
