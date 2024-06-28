import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter, useLocation } from 'react-router-dom';
import CheckoutPayment from "../../../Pages/CheckoutPayment";
import { useAuth } from "../../../Context/AuthContext";

// Mocks
vi.mock("../../../Context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

vi.mock("../../../Components/ProgressBar", () => ({
  default: () => <div data-testid="progress-bar">ProgressBar Component</div>
}));

vi.mock("../../../Components/PaymentInfo", () => ({
  default: () => <div data-testid="payment-info">PaymentInfo Component</div>
}));

vi.mock("../../../Components/OrderSummary", () => ({
  default: () => <div data-testid="order-summary">OrderSummary Component</div>
}));

describe("CheckoutPayment Component", () => {
    
  const mockAuthFetch = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({ authFetch: mockAuthFetch });
  });


  it("renders PaymentInfo and OrderSummary when no order query param", () => {
    (useLocation as ReturnType<typeof vi.fn>).mockReturnValue({
      search: '',
      state: undefined,
      key: "",
      pathname: "",
      hash: "",
    });
    
    render(<BrowserRouter><CheckoutPayment /></BrowserRouter>);
    
    expect(screen.getByTestId("payment-info")).toBeInTheDocument();
    expect(screen.getByTestId("order-summary")).toBeInTheDocument();
  });

  it("shows loading state when order status is being fetched", () => {
    (useLocation as ReturnType<typeof vi.fn>).mockReturnValue({
      search: '?order=123',
      state: undefined,
      key: "",
      pathname: "",
      hash: ""
    });
    mockAuthFetch.mockResolvedValueOnce({ data: null });

    render(<BrowserRouter><CheckoutPayment /></BrowserRouter>);
    
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays order status when fetched successfully", async () => {
    (useLocation as ReturnType<typeof vi.fn>).mockReturnValue({
      search: '?order=123',
      state: undefined,
      key: "",
      pathname: "",
      hash: ""
    });
    mockAuthFetch.mockResolvedValueOnce({ 
      data: { 
        status: "COMPLETED", 
        orderId: "123", 
        paymentId: "pay_123", 
        platformStatus: "paid" 
      } 
    });

    render(<BrowserRouter><CheckoutPayment /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText("Order COMPLETED")).toBeInTheDocument();
      expect(screen.getByText("Order's ID: 123")).toBeInTheDocument();
      expect(screen.getByText("Platforms's ID: pay_123")).toBeInTheDocument();
      expect(screen.getByText("Platforms's status: paid")).toBeInTheDocument();
    });
  });

 
});