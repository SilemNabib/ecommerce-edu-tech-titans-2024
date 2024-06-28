/**
 * Test suite for the SendVerificationEmail component
 */

// Import necessary testing utilities and components
import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import SendVerificationEmail from "../../../Pages/EmailVerification";

// Mock the useAuth hook
vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    requestRegister: vi.fn(),
  })),
}));

describe('EmailVerification', () => {
    // Set up the component before each test
    beforeEach(() => {
        render(
        <Router>
            <SendVerificationEmail />
        </Router>
        );
    });

    // Test case: Verify that the component renders correctly
    it('renders the component correctly', () => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe('We will send a verification email 👋');
    });

    // Test case: Check if the submit button is present
    it('renders a submit button', () => {
        const submitButton = screen.getByRole('button', { name: /send/i });
        expect(submitButton).toBeInTheDocument();
    });

    // Test case: Validate email input
    it('validates email input', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const submitButton = screen.getByRole('button', { name: /send email/i });

        // Test empty input
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
        });

        // Test invalid email
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
        });

        // Test valid email
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.queryByText('This field is mandatory')).not.toBeInTheDocument();
        });
    });

    // Test case: Check if loading indicator appears when form is submitted
    it('displays loading indicator when form is submitted', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const submitButton = screen.getByRole('button', { name: /send email/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });
    });
});