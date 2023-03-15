import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();


    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("renders correctly with default props", () => {
        render(<ConfirmDialog isOpen={true} onConfirm={onConfirm} onCancel={onCancel} />);
        expect(screen.getByText("Confirm")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("renders correctly with custom props", () => {
        render(
            <ConfirmDialog
                isOpen={true}
                onConfirm={onConfirm}
                onCancel={onCancel}
                title="Are you sure?"
                message="This action cannot be undone"
                confirmLabel="Yes"
                cancelLabel="No"
            />
        );
        expect(screen.getByText("Are you sure?")).toBeInTheDocument();
        expect(screen.getByText("This action cannot be undone")).toBeInTheDocument();
        expect(screen.getByText("Yes")).toBeInTheDocument();
        expect(screen.getByText("No")).toBeInTheDocument();
    });

    it("calls onCancel when cancel button is clicked", () => {
        render(<ConfirmDialog isOpen={true} onConfirm={onConfirm} onCancel={onCancel} />);
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onConfirm when confirm button is clicked", () => {
        render(<ConfirmDialog isOpen={true} onConfirm={onConfirm} onCancel={onCancel} />);
        const confirmButton = screen.getByText("Confirm");
        fireEvent.click(confirmButton);
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('renders the title', () => {
        render(<ConfirmDialog isOpen title="Test Title" onConfirm={onConfirm} onCancel={onCancel} />);
        const title = screen.getByText('Test Title');
        expect(title).toBeInTheDocument();
    });

    it("renders with title, message and children", () => {
        const { getByText } = render(
            <ConfirmDialog
                onConfirm={onConfirm}
                onCancel={onCancel}
                isOpen={true}
                title="Are you sure?"
                message="This action cannot be undone."
            >
                <div>Custom Content</div>
            </ConfirmDialog>
        );
        expect(getByText("Are you sure?")).toBeInTheDocument();
        expect(getByText("This action cannot be undone.")).toBeInTheDocument();
        expect(getByText("Custom Content")).toBeInTheDocument();
    });

    it('renders the message', () => {
        render(<ConfirmDialog isOpen message="Test Message" onConfirm={onConfirm} onCancel={onCancel} />);
        const message = screen.getByText('Test Message');
        expect(message).toBeInTheDocument();
    });

    it('renders the children', () => {
        render(
            <ConfirmDialog isOpen onConfirm={onConfirm} onCancel={onCancel}>
                <div>Test Children</div>
            </ConfirmDialog>
        );
        const children = screen.getByText('Test Children');
        expect(children).toBeInTheDocument();
    });

    it('renders the cancel button with the correct label', () => {
        render(<ConfirmDialog isOpen onConfirm={onConfirm} onCancel={onCancel} />);
        const cancelButton = screen.getByText('Cancel');
        expect(cancelButton).toBeInTheDocument();
    });

    it('renders the confirm button with the correct label', () => {
        render(<ConfirmDialog isOpen onConfirm={onConfirm} onCancel={onCancel} />);
        const confirmButton = screen.getByText('Confirm');
        expect(confirmButton).toBeInTheDocument();
    });

    it('calls the onConfirm handler when the confirm button is clicked', () => {
        render(<ConfirmDialog isOpen onConfirm={onConfirm} onCancel={onCancel} />);
        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls the onCancel handler when the cancel button is clicked', () => {
        render(<ConfirmDialog isOpen onConfirm={onConfirm} onCancel={onCancel} />);
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onCancel when the user presses the 'Escape' key", () => {
        const onCancel = jest.fn();
        render(
            <ConfirmDialog isOpen={true} onConfirm={onConfirm} onCancel={onCancel} />
        );
        fireEvent.keyDown(document, { key: "Escape" });
        jest.runOnlyPendingTimers();
        expect(onCancel).toHaveBeenCalledTimes(1);
    });


});
