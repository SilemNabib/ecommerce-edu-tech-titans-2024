import { render, screen } from "@testing-library/react";
import CheckoutShipping from "../../../Pages/CheckoutShipping";
import { describe, it, vi, expect } from 'vitest';

/**
 * Mocks for ProgressBar and ShippingInfo components
 * These mocks replace the actual components with simple div elements
 * containing text to indicate which component they represent.
 */
vi.mock("../../../Components/ProgressBar", () => ({
  default: () => <div>ProgressBar Component</div>
}));
vi.mock("../../../Components/ShippingInfo", () => ({
  default: () => <div>ShippingInfo Component</div>
}));

/**
 * Test suite for the CheckoutShipping component
 */
describe("CheckoutShipping component", () => {
  /**
   * Test case: Verify that the ProgressBar component is rendered
   */
  it("renders ProgressBar component", () => {
    render(<CheckoutShipping />);
    expect(screen.getByText("ProgressBar Component")).toBeInTheDocument();
  });

  /**
   * Test case: Verify that the ShippingInfo component is rendered
   */
  it("renders ShippingInfo component", () => {
    render(<CheckoutShipping />);
    expect(screen.getByText("ShippingInfo Component")).toBeInTheDocument();
  });

  /**
   * Test case: Verify the correct structure of the CheckoutShipping component
   * This test checks for the presence of specific CSS classes that define the layout
   */
  it("renders the correct structure", () => {
    const { container } = render(<CheckoutShipping />);
    
    // Check for the main container with flex column layout and centered items
    expect(container.querySelector('.flex.flex-col.items-center')).toBeInTheDocument();
    
    // Check for the responsive flex container with column layout on mobile and row layout on medium screens
    expect(container.querySelector('.flex.flex-col.md\\:flex-row.justify-around.items-center.mt-10.w-full')).toBeInTheDocument();
    
    // Check for the shipping info container with responsive width and padding
    expect(container.querySelector('.md\\:w-3\\/5.mb-4.md\\:mb-0.p-4')).toBeInTheDocument();
  });
});