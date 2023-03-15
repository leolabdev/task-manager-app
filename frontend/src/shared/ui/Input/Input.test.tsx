import { fireEvent, render, screen } from '@testing-library/react';
import { Input, InputSize, InputTheme } from './Input';

describe('Input', () => {
    it('renders with a placeholder', () => {
        render(<Input placeholder="Type something..." />);
        expect(screen.getByPlaceholderText('Type something...')).toBeInTheDocument();
    });

    it('renders with a custom theme classname', () => {
        render(<Input theme={InputTheme.CLEAR} />);
        expect(screen.getByRole('textbox')).toHaveClass('clear');
    });

    it('renders with a custom size classname', () => {
        render(<Input inputSize={InputSize.L} />);
        expect(screen.getByRole('textbox')).toHaveClass('sizeL');
    });

    it('renders as disabled', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies additional className', () => {
        render(<Input className="custom" />);
        expect(screen.getByRole('textbox')).toHaveClass('custom');
    });

    it('renders with default props', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toHaveClass('Input', 'sizeM');
        expect(screen.getByRole('textbox')).not.toBeDisabled();
    });

    it('memorizes the component', () => {
        const { rerender, getByRole } = render(<Input />);
        const initialRender = getByRole('textbox');
        rerender(<Input />);
        const memoizedRender = getByRole('textbox');
        expect(initialRender).toBe(memoizedRender);
    });


    it('calls onChange handler when text is entered', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input.value).toBe('test');
    });

    it('calls onBlur handler when input loses focus', () => {
        const handleBlur = jest.fn();
        render(<Input onBlur={handleBlur} />);
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus handler when input gains focus', () => {
        const handleFocus = jest.fn();
        render(<Input onFocus={handleFocus} />);
        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onKeyDown handler when a key is pressed down', () => {
        const handleKeyDown = jest.fn();
        render(<Input onKeyDown={handleKeyDown} />);
        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });

    it('calls onKeyUp handler when a key is released', () => {
        const handleKeyUp = jest.fn();
        render(<Input onKeyUp={handleKeyUp} />);
        const input = screen.getByRole('textbox');
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
        expect(handleKeyUp).toHaveBeenCalledTimes(1);
    });

});
