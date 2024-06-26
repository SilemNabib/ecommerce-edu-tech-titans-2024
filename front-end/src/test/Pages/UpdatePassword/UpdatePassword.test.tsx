/**
 * Test suite for the ForgotPassword component
 */

// Import necessary testing utilities and components
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from '../../../Pages/RecoverPassword';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: vi.fn(),
}));

// Mock fetch API
const mockFetch = vi.fn() as Mock;
global.fetch = mockFetch;

describe('ForgotPassword Component', () => {
    // Set up the component before each test
    beforeEach(() => {
        render(
        <BrowserRouter>
            <ToastContainer />
            <ForgotPassword />
        </BrowserRouter>
        );
    });

    // Test case: Verify that the component renders correctly
    it('renders the forgot password form', () => {
        // Check for heading
        const heading = screen.getByText('HAVE YOU FORGOTTEN YOUR PASSWORD?');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('text-center mb-5 font-bold');

        // Check for description
        const description = screen.getByText(/Enter the email address associated with your account/);
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass('text-center mb-5');

        // Check for email input
        const emailLabel = screen.getByLabelText('Email');
        expect(emailLabel).toBeInTheDocument();

        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toBeRequired();

        // Check for submit button
        const sendLinkButton = screen.getByRole('button', { name: 'Send Link' });
        expect(sendLinkButton).toBeInTheDocument();
        expect(sendLinkButton).toHaveClass('bg-black text-white py-2 px-4 rounded-lg hover:font-bold');
    });

    // Test case: Verify email input updates correctly
    it('updates email state when input changes', () => {
        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');
    });

    // Test case: Verify form submission on successful API call
    it('submits the form and shows success toast on successful API call', async () => {
        mockFetch.mockResolvedValueOnce({ ok: true });

        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const sendLinkButton = screen.getByRole('button', { name: 'Send Link' });
        fireEvent.click(sendLinkButton);

        await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/send-reset-link', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com' }),
        });
        expect(toast.success).toHaveBeenCalledWith('Link sent successfully');
        });
    });

    // Test case: Verify error handling on failed API call
    it('shows error toast on failed API call', async () => {
        mockFetch.mockResolvedValueOnce({ ok: false });

        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const sendLinkButton = screen.getByRole('button', { name: 'Send Link' });
        fireEvent.click(sendLinkButton);

        await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to send link');
        });
    });

    // Test case: Verify error handling on network error
    it('shows error toast on network error', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const emailInput = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const sendLinkButton = screen.getByRole('button', { name: 'Send Link' });
        fireEvent.click(sendLinkButton);

        await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('An error occurred');
        });
    });
});