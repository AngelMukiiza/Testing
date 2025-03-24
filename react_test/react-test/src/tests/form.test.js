import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
    test("renders the form with initial state", () => {
        render(<Form />);

        // Ensure all the fields are rendered correctly
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    test("shows validation errors when submitting an empty form", async () => {
        render(<Form />);

        // Submit the form without filling out any data
        fireEvent.click(screen.getByText(/submit/i));

        // Check if the validation errors are shown
        expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument();
    });

    test("shows email validation error for invalid email", async () => {
        render(<Form />);

        // Fill in the name but provide an invalid email
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "invalidemail" } });

        // Submit the form
        fireEvent.click(screen.getByText(/submit/i));

        // Check that email validation error is shown
        expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument();
    });

    test("does not show errors for valid input and shows form submission", async () => {
        render(<Form />);

        // Provide valid inputs
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });

        // Submit the form
        fireEvent.click(screen.getByText(/submit/i));

        // Check that no validation errors are shown
        expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/email is not valid/i)).not.toBeInTheDocument();

        // Optionally, check if the form submits (e.g., using mock functions)
        expect(window.alert).toHaveBeenCalledWith("Form submitted!");
    });
});
