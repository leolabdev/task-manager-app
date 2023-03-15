import React from 'react';
import { render, act } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
    it('renders the children into a portal', () => {
        const rootElement = document.createElement('div');
        rootElement.setAttribute('id', 'root');
        document.body.appendChild(rootElement);
        const { getByText } = render(
            <Portal element={document.getElementById('root')}>
                <div>Hello World!</div>
            </Portal>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();
    });

    it('renders the children into the default element (document.body) when no element prop is provided', () => {
        const { getByText } = render(
            <Portal>
                <div>Hello World!</div>
            </Portal>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();
    });

    it('renders the children into the specified wrapper element if a wrapperId prop is provided', () => {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute('id', 'wrapper');
        document.body.appendChild(wrapperElement);
        const { getByText } = render(
            <Portal wrapperId="wrapper">
                <div>Hello World!</div>
            </Portal>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();
    });

    it('renders the children into a new wrapper element if a wrapperId prop is provided and the element does not exist in the DOM', () => {
        const { getByText } = render(
            <Portal wrapperId="non-existent">
                <div>Hello World!</div>
            </Portal>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();
    });

    it('renders the children into the specified element when the element is updated', () => {
        const { getByText, rerender } = render(
            <Portal element={document.body}>
                <div>Hello World!</div>
            </Portal>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();

        const newRootElement = document.createElement('div');
        newRootElement.setAttribute('id', 'new-root');
        document.body.appendChild(newRootElement);
        act(() => {
            rerender(
                <Portal element={document.getElementById('new-root')}>
                    <div>Hello World Again!</div>
                </Portal>
            );
        });
        expect(getByText('Hello World Again!')).toBeInTheDocument();
    });
});
