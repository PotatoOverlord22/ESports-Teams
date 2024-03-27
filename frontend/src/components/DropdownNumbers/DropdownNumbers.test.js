import React from 'react';
import { render, fireEvent, getByTestId, getByLabelText, getAllByAltText, getAllByText, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropdownNumbers from './DropdownNumbers';


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

describe('DropdownNumbers tests', () => {

    test('renders menu items correctly', () => {
        const maxLength = 5;
        const step = 2;
        const onChange = jest.fn();
        const title = "test"
        const { getByText } = render(
            <DropdownNumbers maxLength={maxLength} step={step} onChange={onChange} title={title} />
        );

        fireEvent.click(getByText(title));

        // First item should always be there
        expect(getByText('1')).toBeInTheDocument();

        // Check if other items are displayed correctly
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('4')).toBeInTheDocument();

        // Items not divisible by step should not be displayed
        expect(() => getByText('3')).toThrow();
        expect(() => getByText('5')).toThrow();
    });

    test('calls onChange prop when menu item is clicked', () => {
        const maxLength = 5;
        const step = 2;
        const onChange = jest.fn();
        const title = "test"
        const { getByText } = render(
            <DropdownNumbers maxLength={maxLength} step={step} onChange={onChange} title={title} />
        );

        // Click the menu
        fireEvent.click(getByText(title));
        fireEvent.click(getByText('1'));
        expect(onChange).toHaveBeenCalledWith(1);

        // Click the menu
        fireEvent.click(getByText(title));
        fireEvent.click(getByText('2'));
        expect(onChange).toHaveBeenCalledWith(2);

        // Click the menu
        fireEvent.click(getByText(title));
        expect(() => getByText('3')).toThrow();
    });
});

