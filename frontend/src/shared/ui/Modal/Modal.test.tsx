import {fireEvent, queryByTestId, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import { Modal } from "./Modal";

const ANIMATION_DELAY = 300;

describe("Modal component", () => {
    it("renders the children when isOpen is true", () => {
        const { getByText } = render(<Modal isOpen={true}>Hello World!</Modal>);
        expect(getByText("Hello World!")).toBeInTheDocument();
    });

    // todo fix this test
    // it("does not render the children when isOpen is false", async () => {
    //     const { getByText, queryByText } = render(
    //         <Modal isOpen={false}>Hello World!</Modal>
    //     );
    //     const element = getByText("Hello World!");
    //     expect(element).toBeInTheDocument();
    //     fireEvent.click(screen.getByTestId("overlay"));
    //     await waitForElementToBeRemoved(() => queryByText("Hello World!"));
    //     expect(queryByText("Hello World!")).not.toBeInTheDocument();
    // });

    it("calls onClose when the overlay is clicked", () => {
        jest.useFakeTimers();
        const handleClose = jest.fn();
        render(<Modal isOpen={true} onClose={handleClose}>Hello World!</Modal>);
        const overlay = screen.getByTestId("overlay");
        fireEvent.click(overlay);
        jest.advanceTimersByTime(ANIMATION_DELAY);
        expect(handleClose).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it("calls onClose when the Escape key is pressed", () => {
        jest.useFakeTimers();
        const handleClose = jest.fn();
        render(<Modal isOpen={true} onClose={handleClose}>Hello World!</Modal>);
        fireEvent.keyDown(document, { key: "Escape" });
        jest.advanceTimersByTime(ANIMATION_DELAY);
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
