import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Login from '../../../Pages/Login';
import { GlobalContext } from '../../../Context';
import { useAuth } from '../../../Context/AuthContext';

// Mocks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: vi.fn(),
}));

const mockUseAuth = useAuth as Mock;

describe('Login Component', () => {
  const mockSetLoading = vi.fn();
  const mockRequestLogin = vi.fn();

    beforeEach(() => {
        mockUseAuth.mockReturnValue({
        requestLogin: mockRequestLogin,
        });

        render(
        <BrowserRouter>
            <GlobalContext.Provider value={{ setLoading: mockSetLoading }}>
            <ToastContainer />
            <Login />
            </GlobalContext.Provider>
        </BrowserRouter>
            );
    });

    it('renders the login form', () => {
        const heading = screen.getByText('¡Welcome back!');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('text-center mb-8 font-bold text-3xl');

        const emailLabel = screen.getByText('Email');
        expect(emailLabel).toBeInTheDocument();
        expect(emailLabel).toHaveClass('font-bold mb-1');

        const passwordLabel = screen.getByText('Password');
        expect(passwordLabel).toBeInTheDocument();
        expect(passwordLabel).toHaveClass('font-bold mb-1');

        const forgotPasswordLink = screen.getByText('Have you forgotten your password?');
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveAttribute('href', '/recover-password');

        const signInButton = screen.getByRole('button', { name: 'Sign in' });
        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveClass('bg-black text-white py-2 px-4 rounded-lg hover:font-bold');

        expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();

        const signUpButton = screen.getByRole('button', { name: 'Sign up' });
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveClass('mb-6 bg-gray-300 text-black py-2 px-4 rounded-lg hover:font-bold');

        expect(screen.getByText('Enjoy fast and efficient delivery to your door')).toBeInTheDocument();
        expect(screen.getByText('Shop from the comfort of your home and have your products delivered to you')).toBeInTheDocument();
        expect(screen.getByText('View your order cart')).toBeInTheDocument();
    });

    it('displays error messages for empty fields', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

        await waitFor(() => {
        expect(screen.getAllByText('This field is mandatory')).toHaveLength(2);
        });
    });

    it('shows error messages when required fields are not provided', async () => {
        const submitButton = screen.getByRole('button', { name: /Sign in/i });
        fireEvent.click(submitButton);

        const mandatoryErrors = await screen.findAllByText(/This field is mandatory/i);
        expect(mandatoryErrors).toHaveLength(2); 

    });
});
