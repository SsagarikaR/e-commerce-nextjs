import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Breadcrumb from '@/app/components/navbar/Breadcrumb'; // Adjust path accordingly
import { usePathname } from 'next/navigation';

// Correctly type the mock function to return a string
vi.mock('next/navigation', () => ({
  usePathname: vi.fn<() => string>(), // Explicitly typing the mock return type
}));

describe('Breadcrumb component', () => {
  it('renders breadcrumbs correctly for the path /products/electronics', () => {
    // Mock the pathname for this test case
    (usePathname as vi.Mock).mockReturnValue('/products/electronics');

    render(<Breadcrumb />);

    // Ensure the breadcrumb home link is rendered
    expect(screen.getByText('/')).toBeInTheDocument();

    // Ensure each breadcrumb segment is rendered
    expect(screen.getByText('products')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();

    // Ensure that links are correct
    const productLink = screen.getByText('products').closest('a');
    expect(productLink).toHaveAttribute('href', '/products');

    const electronicsLink = screen.getByText('electronics').closest('a');
    expect(electronicsLink).toHaveAttribute('href', '/products/electronics');
  });

  it('renders breadcrumbs correctly for the root path /', () => {
    // Mock the pathname for this test case
    (usePathname as vi.Mock).mockReturnValue('/');

    render(<Breadcrumb />);

    // Only the home breadcrumb should be rendered
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('renders breadcrumbs for a single segment path /products', () => {
    // Mock the pathname for this test case
    (usePathname as vi.Mock).mockReturnValue('/products');

    render(<Breadcrumb />);

    // Ensure the breadcrumb home link and the products segment are rendered
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('products')).toBeInTheDocument();

    // Ensure that the product link is correct
    const productLink = screen.getByText('products').closest('a');
    expect(productLink).toHaveAttribute('href', '/products');
  });

  it('renders an empty breadcrumb list for a missing pathname', () => {
    // Mock the pathname for this test case
    (usePathname as vi.Mock).mockReturnValue('');

    render(<Breadcrumb />);

    // Ensure only the home link is rendered
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.queryByText('products')).not.toBeInTheDocument();
  });
});
