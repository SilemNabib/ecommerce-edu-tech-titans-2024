import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
import SendVerificationEmail from "../../../Pages/EmailVerification";


vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    requestRegister: vi.fn(),
  })),
}));

describe('EmailVerification', () => {

    beforeEach(() => {
        render(<Router>
            <SendVerificationEmail />
        </Router>)
    });
    
    it('renders the component correctly', () => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading.textContent).toBe('We will send a verification email 👋');
    });

    it('renders a submit button', () => {
        const submitButton = screen.getByRole('button', { name: /send/i });
        expect(submitButton).toBeInTheDocument();
    });
    
    it('validates email input', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const submitButton = screen.getByRole('button', { name: /send email/i });

        // Intenta enviar el formulario vacío
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
        });

        // Ingresa un email inválido
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
        });

        // Ingresa un email válido
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(screen.queryByText('This field is mandatory')).not.toBeInTheDocument();
        });
    });

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

