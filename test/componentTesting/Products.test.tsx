import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Products from '@/app/components/products/Products';
import { unAuthorizedGetRequest } from '@/services/apiReqServices/unAuthorizedRequest';

// Mock the unAuthorizedGetRequest function
vi.mock('@/services/apiReqServices/unAuthorizedRequest', () => ({
  unAuthorizedGetRequest: vi.fn(),
}));

describe('Products Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders products when they are available', async () => {
    const mockProducts = [
      { productID: '1', name: 'Product 1', price: 10, categoryID: '2' },
      { productID: '2', name: 'Product 2', price: 20, categoryID: '3' },
    ];

    // Ensure unAuthorizedGetRequest is recognized as a mock function
    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => Promise.resolve(mockProducts));

    render(<Products category="electronics" page={1} name="" />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('shows no products available message when no products are found', async () => {
    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => Promise.resolve([]));

    render(<Products category="electronics" page={1} name="" />);

    await waitFor(() => {
      expect(screen.getByText('No products available.')).toBeInTheDocument();
    });
  });

  it('handles API error correctly', async () => {
    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => Promise.reject(new Error('API Error')));

    render(<Products category="electronics" page={1} name="" />);

    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeInTheDocument();
    });
  });

  it('displays loading state while fetching products', async () => {
    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve([]), 1000)));

    render(<Products category="electronics" page={1} name="" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('updates products when pagination is clicked', async () => {
    const mockPage1Products = [
      { productID: '1',
        productName: 'Product 1',
        productPrice: 10 ,
        productDescription:'Oxidised Silver-Plated American Diamond studded Oval Shaped Drop Earrings Jewellery For Girls and Women 18 colours 4.6store rating (926) · ₹179 to ₹6,199 People also buy from',
        stock:10,
        rating:10,
        totalCount:8,
        categoryID:6,
        categoryName:'ear ring',
        categoryThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
        brandID:6,
        brandName:'ear ring',
        brandThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
      },
      {  
        productID: '2',
        productName: 'Product 3',
        productPrice: 10 ,
        productDescription:'Oxidised Silver-Plated American Diamond studded Oval Shaped Drop Earrings Jewellery For Girls and Women 18 colours 4.6store rating (926) · ₹179 to ₹6,199 People also buy from',
        stock:10,
        rating:10,
        totalCount:8,
        categoryID:1,
        categoryName:'ear ring',
        categoryThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
        brandID:8,
        brandName:'ear ring',
        brandThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
      },
    ];

    const mockPage2Products = [
      { productID: '3',
        productName: 'Product 1',
        productPrice: 10 ,
        productDescription:'Oxidised Silver-Plated American Diamond studded Oval Shaped Drop Earrings Jewellery For Girls and Women 18 colours 4.6store rating (926) · ₹179 to ₹6,199 People also buy from',
        stock:10,
        rating:10,
        totalCount:8,
        categoryID:1,
        categoryName:'ear ring',
        categoryThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
        brandID:6,
        brandName:'ear ring',
        brandThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
 },
      { productID: '4',
        productName: 'Product 3',
        productPrice: 10 ,
        productDescription:'Oxidised Silver-Plated American Diamond studded Oval Shaped Drop Earrings Jewellery For Girls and Women 18 colours 4.6store rating (926) · ₹179 to ₹6,199 People also buy from',
        stock:10,
        rating:10,
        totalCount:8,
        categoryID:1,
        categoryName:'ear ring',
        categoryThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
        brandID:8,
        brandName:'ear ring',
        brandThumbnail:'	https://res.cloudinary.com/dxhujahj5/image/upload/v1741082837/yagglzccanuzi8kfsttk.webp',
 },
    ];

    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => Promise.resolve(mockPage1Products));
    (unAuthorizedGetRequest as vi.Mock).mockImplementationOnce(() => Promise.resolve(mockPage2Products));

    render(<Products category="1" page={1} name="" />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      expect(screen.getByText('Product 4')).toBeInTheDocument();
    });

    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});
