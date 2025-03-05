import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

// List of routes that should be protected
const protectedRoutes = ['/dashboard', '/orders','/cart','/wishlist','/preferences','/orders','/dashboard/customers','/dashboard/products','/dashboard/brands','/dashboard/categories'];

export function middleware(req: NextRequest) {
  // Check the path of the current request
  const { pathname } = req.nextUrl;

  // If the route is protected and user is not authenticated, redirect to sign-in
  const token = req.cookies.get('token');

  if (protectedRoutes.includes(pathname) && !token) {
    // Redirect user to the sign-in page
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Continue to the page if authenticated or not a protected route
  return NextResponse.next();
}
