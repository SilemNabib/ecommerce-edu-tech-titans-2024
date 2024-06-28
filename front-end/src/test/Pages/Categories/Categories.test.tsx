/**
 * Test suite for the Categories component
 */

// Import necessary testing utilities and components
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from "vitest"
import Categories from '../../../Pages/Categories'

// Mock product response to simulate API
const mockProductsResponse = {
  _embedded: {
    productList: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ],
  },
  page: {
    totalPages: 1,
  },
}

// Mock components to isolate Categories component testing
vi.mock('../../Components/SortBy', () => ({
  default: () => <div data-testid="sort-by">Sort By Mock</div>,
}));

vi.mock('../../Components/Pagination', () => ({
  default: () => <div data-testid="pagination">Pagination Mock</div>,
}));

vi.mock('../../../Components/Card', () => ({
  default: ({ data }: { data: { name: string } }) => <div data-testid="product-card">{data.name}</div>
}))

describe('Categories Component', () => {

    // Test case: Verify that the component renders initial components correctly
    it('renders initial components correctly', () => {
        render(
            <MemoryRouter initialEntries={['/category/male/clothing/denim']}>
            <Routes>
                <Route path="/category/:category/:section/:item" element={<Categories />} />
            </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Filter by Color')).toBeInTheDocument();
        expect(screen.getByText('Filter by Size')).toBeInTheDocument();
        expect(screen.getByText('Sort By')).toBeInTheDocument();
    });

    // Test case: Check if products render correctly after loading
    it('renders products correctly', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
        json: async () => mockProductsResponse,
        })

        render(
        <MemoryRouter initialEntries={['/category/male/clothing/denim']}>
            <Routes>
            <Route path="/category/:category/:section/:item" element={<Categories />} />
            </Routes>
        </MemoryRouter>
        )

        await waitFor(() => {
        const productCards = screen.getAllByTestId('product-card')
        expect(productCards).toHaveLength(2)
        expect(productCards[0]).toHaveTextContent('Product 1')
        expect(productCards[1]).toHaveTextContent('Product 2')
        })

        expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    // Test case: Verify pagination functionality
    it('handles pagination correctly', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => ({
            ...mockProductsResponse,
            page: { totalPages: 3 }
            }),
        });

        render(
            <MemoryRouter initialEntries={['/category/male/clothing/denim']}>
            <Routes>
                <Route path="/category/:category/:section/:item" element={<Categories />} />
            </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('2'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('page=1'));
        });
    });

})
