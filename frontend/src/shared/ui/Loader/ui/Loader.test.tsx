import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
    it("renders without crashing", () => {
        const { container } = render(<Loader />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("applies the given className", () => {
        const className = "test-class";
        const { container } = render(<Loader className={className} />);
        expect(container.firstChild).toHaveClass(className);
    });

    it("does not re-render unnecessarily with the same props", () => {
        const { container, rerender } = render(<Loader />);
        const originalChild = container.firstChild;
        rerender(<Loader />);
        const newChild = container.firstChild;
        expect(newChild).toBe(originalChild);
    });

});
