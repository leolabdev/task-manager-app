import { render } from '@testing-library/react';
import { Text, TextTheme } from './Text';

describe('Text component', () => {
    it('renders with the primary theme by default', () => {
        const { getByTestId } = render(<Text />);
        const textContainer = getByTestId('text');
        expect(textContainer).toHaveClass('Text', 'primary');
    });

    it('renders with the specified theme', () => {
        const { getByTestId } = render(<Text theme={TextTheme.SECONDARY} />);
        const textContainer = getByTestId('text');
        expect(textContainer).toHaveClass('Text', 'secondary');
    });

    it('renders the title when it is provided', () => {
        const title = 'Hello, world!';
        const { getByTestId } = render(<Text title={title} />);
        const titleElement = getByTestId('text-title');
        expect(titleElement).toHaveTextContent(title);
    });

    it('renders the text when it is provided', () => {
        const text = 'Lorem ipsum dolor sit amet.';
        const { getByTestId } = render(<Text text={text} />);
        const textElement = getByTestId('text-content');
        expect(textElement).toHaveTextContent(text);
    });

    it('adds custom classes to the container', () => {
        const customClass = 'my-custom-class';
        const { getByTestId } = render(<Text className={customClass} />);
        const textContainer = getByTestId('text');
        expect(textContainer).toHaveClass('Text', 'primary', customClass);
    });

    it('adds custom classes to the container', () => {
        const customClass = 'my-custom-class';
        const { getByTestId } = render(<Text className={customClass} />);
        const textContainer = getByTestId('text');
        expect(textContainer).toHaveClass('Text', 'primary', customClass);
    });

    it('renders with the error theme when specified', () => {
        const { getByTestId } = render(<Text theme={TextTheme.ERROR} />);
        const textContainer = getByTestId('text');
        expect(textContainer).toHaveClass('Text', 'error');
    });


    it('does not render the text when not provided', () => {
        const { queryByTestId } = render(<Text title="Title" text="" />);
        const textElement = queryByTestId('text-content');
        expect(textElement).not.toBeInTheDocument();
    });


    it('memorizes the component', () => {
        const { rerender,getByTestId } = render(<Text text="Hello, world!" />);
        const initialRender = getByTestId('text');
        rerender(<Text text="Hello, world!" />);
        const memoizedRender = getByTestId('text');
        expect(initialRender).toBe(memoizedRender);
    });

});
