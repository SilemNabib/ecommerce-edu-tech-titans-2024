import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import VerificationCode from "../../../Pages/VerificationCode";

// Mock useAuth hook
vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    requestVerify: vi.fn(),
  })),
}));

describe('VerificationCode', () => {
  beforeEach(() => {
    render(
      <Router>
        <VerificationCode />
      </Router>
    );
  });

  it('renders the component correctly', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Enter the code we've sent 😎");
  });

  it('renders a submit button', () => {
    const submitButton = screen.getByRole('button', { name: /verify code/i });
    expect(submitButton).toBeInTheDocument();
  });
  
  it('shows an error message when the verification code is not provided', async () => {
    const submitButton = screen.getByRole('button', { name: /verify code/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/this field is mandatory/i);
    expect(errorMessage).toBeInTheDocument();
  });

});
