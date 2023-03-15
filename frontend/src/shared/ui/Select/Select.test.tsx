import { fireEvent, render, screen } from "@testing-library/react";
import { Select, SelectSize, SelectTheme } from "./Select";

describe("Select", () => {
    it("renders with options", () => {
        const options = [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
        ];
        render(<Select options={options} />);
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
        expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("renders with a custom theme classname", () => {
        const options = [{ label: "Option 1", value: "1" }];
        render(<Select options={options} theme={SelectTheme.CLEAR} />);
        expect(screen.getByRole("combobox")).toHaveClass("clear");
    });

    it("renders with a custom size classname", () => {
        const options = [{ label: "Option 1", value: "1" }];
        render(<Select options={options} selectSize={SelectSize.L} />);
        expect(screen.getByRole("combobox")).toHaveClass("sizeL");
    });

    it("renders as disabled", () => {
        const options = [{ label: "Option 1", value: "1" }];
        render(<Select options={options} disabled />);
        expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("calls onChange handler when an option is selected", () => {
        const options = [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
        ];
        const handleChange = jest.fn();
        render(<Select options={options} onChange={handleChange} />);
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "2" },
        });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it("applies additional className", () => {
        const options = [{ label: "Option 1", value: "1" }];
        render(<Select options={options} className="custom" />);
        expect(screen.getByRole("combobox")).toHaveClass("custom");
    });

    it("memorizes the component", () => {
        const options = [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
        ];
        const { rerender, getByText } = render(<Select options={options} />);
        const initialRender = getByText("Option 1");
        rerender(<Select options={options} />);
        const memoizedRender = getByText("Option 1");
        expect(initialRender).toBe(memoizedRender);
    });
});
