import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form'; // Same directory as Form.test.js

describe('Form Component', () => {
    test('renders form and validation error message for invalid email', () => {
        render(<Form />);

        const emailInput = screen.getByLabelText(/email-input/i);
        const submitButton = screen.getByText(/submit/i);

        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(submitButton);

        expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    });

    test('renders no error message when email is valid', () => {
        render(<Form />);

        const emailInput = screen.getByLabelText(/email-input/i);
        const submitButton = screen.getByText(/submit/i);

        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);

        const errorMessage = screen.queryByRole('alert');
        expect(errorMessage).toBeNull();
    });
});
