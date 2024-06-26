/**
 * Test suite for the Register component
 */

// Import necessary testing utilities and components
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import Register from "../../../Pages/Register";

// Mock the useAuth hook
vi.mock('../../../Context/AuthContext', async () => {
  const actual = await vi.importActual('../../../Context/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      requestComplete: vi.fn(),
      isAuthenticated: vi.fn(() => false),
    })),
  };
});

describe('Register Page', () => {
  // Set up the component before each test
  beforeEach(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  // Test case: Verify that the component renders correctly
  it('renders the component correctly', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Great to have you here 👏");
  });

  // Test case: Check if the submit button is present
  it('renders a submit button', () => {
    const submitButton = screen.getByRole('button', { name: /create account/i });
    expect(submitButton).toBeInTheDocument();
  });

  // Test case: Verify error messages for empty required fields
  it('shows error messages when required fields are not provided', async () => {
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    // Check for mandatory field error messages
    const mandatoryErrors = await screen.findAllByText(/This field is mandatory/i);
    expect(mandatoryErrors).toHaveLength(4); 

    // Check for privacy policy error message
    const privacyError = await screen.findByText(/Please accept the Privacy Polic/i);
    expect(privacyError).toBeInTheDocument();
  });
});