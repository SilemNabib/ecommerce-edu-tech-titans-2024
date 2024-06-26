/**
 * Test suite for the VerificationCode component
 *
 * This file contains test cases for the VerificationCode component, which is responsible for
 * handling the verification code input process.
 */

// Import necessary testing utilities and components
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import VerificationCode from "../../../Pages/VerificationCode";

// Mock the useAuth hook
vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    requestVerify: vi.fn(),
  })),
}));

describe('VerificationCode', () => {
  // Set up the component before each test
  beforeEach(() => {
    render(
      <Router>
        <VerificationCode />
      </Router>
    );
  });

  // Test case: Verify that the component renders correctly
  it('renders the component correctly', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Enter the code we've sent 😎");
  });

  // Test case: Check if the submit button is present
  it('renders a submit button', () => {
    const submitButton = screen.getByRole('button', { name: /verify code/i });
    expect(submitButton).toBeInTheDocument();
  });
  
  // Test case: Verify error message for empty verification code
  it('shows an error message when the verification code is not provided', async () => {
    const submitButton = screen.getByRole('button', { name: /verify code/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/this field is mandatory/i);
    expect(errorMessage).toBeInTheDocument();
  });
});