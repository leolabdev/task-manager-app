import {
    act,
    fireEvent,
    queryByTestId,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved
} from "@testing-library/react";
import { Modal } from "./Modal";

const ANIMATION_DELAY = 300;

describe("Modal component", () => {
    it("renders the children when isOpen is true", () => {
        const { getByText } = render(<Modal isOpen={true}>Hello World!</Modal>);
        expect(getByText("Hello World!")).toBeInTheDocument();
    });

    it("calls onClose when the overlay is clicked", () => {
        jest.useFakeTimers();
        const handleClose = jest.fn();
        render(<Modal isOpen={true} onClose={handleClose}>Hello World!</Modal>);
        const overlay = screen.getByTestId("overlay");
        fireEvent.click(overlay);
        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });
        expect(handleClose).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it("calls onClose when the Escape key is pressed", () => {
        jest.useFakeTimers();
        const handleClose = jest.fn();
        render(<Modal isOpen={true} onClose={handleClose}>Hello World!</Modal>);
        fireEvent.keyDown(document, { key: "Escape" });
        act(() => {
            jest.advanceTimersByTime(ANIMATION_DELAY);
        });
        expect(handleClose).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it("does not render the Modal when lazy and not mounted", () => {
        const { queryByTestId } = render(<Modal lazy={true} isOpen={false} />);
        expect(queryByTestId("modal")).not.toBeInTheDocument();
    });

    it("renders the Modal when lazy and mounted", () => {
        const { queryByTestId } = render(<Modal lazy={true} isOpen={true} />);
        expect(queryByTestId("modal")).toBeInTheDocument();
    });

});
