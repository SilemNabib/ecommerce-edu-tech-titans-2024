import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi} from "vitest";
import { BrowserRouter as Router } from 'react-router-dom';
// @ts-ignore
import SendVerificationEmail from "../../../Pages/EmailVerification";

describe('EmailVerification', () => {


    beforeEach(() => {
        render(<Router>
            <SendVerificationEmail  />
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
    

});
