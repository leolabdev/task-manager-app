import {fireEvent, render, screen} from "@testing-library/react";
import {Button, ButtonSize, ButtonTheme} from "./Button";

describe("Button", () => {
    it("renders with children", () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it("renders with a custom theme classname", () => {
        render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });

    it("renders with a custom size classname", () => {
        render(<Button  size={ButtonSize.L}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('sizeL');
    });

    it("renders with square styling", () => {
        render(<Button square>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('square');
    });

    it("renders as disabled", () => {
        render(<Button disabled>Test</Button>);
        expect(screen.getByText('Test')).toBeDisabled();
    });

    it("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Test</Button>);
        fireEvent.click(screen.getByText('Test'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies additional className", () => {
        render(<Button className="custom">Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('custom');
    });

    it("renders with default props", () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('Button', 'sizeM');
        expect(screen.getByRole('button')).not.toBeDisabled();
        expect(screen.getByRole('button')).not.toHaveClass('square');
    });

});

