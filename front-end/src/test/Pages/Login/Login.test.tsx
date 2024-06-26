/**
 * Test suite for the Login component
 *
 * This file contains test cases for the Login component, which is responsible for user authentication.
 * It tests the rendering of the login form, form validation, and error handling.
 */

// Import necessary testing utilities and components
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '../../../Pages/Login';
import { GlobalContext } from '../../../Context';
import { useAuth } from '../../../Context/AuthContext';

// Mock dependencies
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

  // Set up the component before each test
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

  // Test case: Verify that the login form renders correctly
  it('renders the login form', () => {
    // Check for heading
    const heading = screen.getByText('¡Welcome back!');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-center mb-8 font-bold text-3xl');

    // Check for email label
    const emailLabel = screen.getByText('Email');
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel).toHaveClass('font-bold mb-1');

    // Check for password label
    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel).toHaveClass('font-bold mb-1');

    // Check for forgot password link
    const forgotPasswordLink = screen.getByText('Have you forgotten your password?');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/recover-password');

    // Check for sign in button
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveClass('bg-black text-white py-2 px-4 rounded-lg hover:font-bold');

    // Check for sign up section
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();

    const signUpButton = screen.getByRole('button', { name: 'Sign up' });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveClass('mb-6 bg-gray-300 text-black py-2 px-4 rounded-lg hover:font-bold');

    // Check for additional information text
    expect(screen.getByText('Enjoy fast and efficient delivery to your door')).toBeInTheDocument();
    expect(screen.getByText('Shop from the comfort of your home and have your products delivered to you')).toBeInTheDocument();
    expect(screen.getByText('View your order cart')).toBeInTheDocument();
  });

  // Test case: Verify error messages for empty fields
  it('displays error messages for empty fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(screen.getAllByText('This field is mandatory')).toHaveLength(2);
    });
  });

  // Test case: Verify error messages when required fields are not provided
  it('shows error messages when required fields are not provided', async () => {
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);

    const mandatoryErrors = await screen.findAllByText(/This field is mandatory/i);
    expect(mandatoryErrors).toHaveLength(2); 
  });
});