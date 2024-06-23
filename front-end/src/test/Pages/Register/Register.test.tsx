import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import Register from "../../../Pages/Register";
import { useAuth } from '../../../Context/AuthContext';

// Mock useAuth hook
vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    requestComplete: vi.fn(),
    isAuthenticated: vi.fn(() => false),
  })),
}));

// Mock methods to always pass verification checks
vi.mock('../../../Context/AuthContext', () => ({
  isRegisterExpired: vi.fn(() => false),
  isTokenExpired: vi.fn(() => false),
  useAuth: vi.fn(() => ({
    requestComplete: vi.fn(),
  })),
}));

describe('Register Page', () => {

    beforeEach(() => {
        render(
        <Router>
            <Register />
        </Router>
        );
    });

    it('renders the component correctly', () => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe("Great to have you here 👏");
    });

    it('renders a submit button', () => {
        const submitButton = screen.getByRole('button', { name: /create account/i });
        expect(submitButton).toBeInTheDocument();
    });

    it('shows error messages when required fields are not provided', async () => {
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);

        const mandatoryErrors = await screen.findAllByText(/This field is mandatory/i);
        expect(mandatoryErrors).toHaveLength(4); 

        const privacyError = await screen.findByText(/Please accept the Privacy Polic/i);
        expect(privacyError).toBeInTheDocument();
    });
  
});
