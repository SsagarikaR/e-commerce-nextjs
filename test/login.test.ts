import { describe, it, expect, vi, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import * as UserService from "@/services/apiServices/users"; // Import UserService methods
import { POST } from '@/app/api/auth/signin/route'; // Adjust the path to your route handler
import * as AuthModule from "@/lib/midlleware/auth"; // Import the entire auth module
import bcrypt from 'bcrypt';


vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
  }),
}));

// Mock the UserService and other external services
vi.mock('@/services/apiServices/users', () => ({
  getUserService: vi.fn(),
}));

// Mock the generateToken function in the auth module
vi.mock('@/lib/midlleware/auth', () => ({
  generateToken: vi.fn(),
}));

describe('/api/auth/signin Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 200 and user data on successful login', async () => {
    // Mock user data as per your response
    const mockUser = {
      userID: 9,
      name: "cruise",
      contactNo: "6371881727",
      email: "cruise@gmail.com",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaXJlIjo5LCJpYXQiOjE3NDA5NTE0NTEsImV4cCI6MTc0MTU1NjI1MX0.Z7Lvd33Rl-SDXHUm6lTRHBeTONdjQCLwV5v_Znplx34"
    };
  
    // The mock token as returned in your response
  
  
    // Mock the getUserService to return the mock user
    vi.spyOn(UserService, 'getUserService').mockResolvedValue({
      success: true,
      user: mockUser,
    });
  
  
    const req = new NextRequest('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "cruise@gmail.com", password: "password123" }),
    });
  
    const res = await POST(req);
  
    if (res) {
      const responseJson = await res.json();
      
      // Check the status code is 200
      expect(res.status).toBe(200);
      
      // Check that the response has the user and token properties
      expect(responseJson).toHaveProperty('user');
  
      // Check if the user data matches the mock user
      expect(responseJson.user).toEqual(mockUser);
  
    } else {
      throw new Error('Response is undefined');
    }
  });
  
  



  it('should return 400 if email or password is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "johndoe@example.com" }), // Missing password
    });

    const res = await POST(req);
    
    // Ensure res is defined
    if (res) {
      const responseJson = await res.json();
      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ message: "Email and password are required" });
    } else {
      throw new Error('Response is undefined');
    }
  });

 
});
