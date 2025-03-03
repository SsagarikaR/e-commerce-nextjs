import { describe, it, expect, vi, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import * as UserService from "@/services/apiServices/users"; // Import UserService methods
import { POST } from '@/app/api/auth/signup/route'; // Adjust the path to your signup route handler
import * as AuthModule from "@/lib/midlleware/auth"; // Import the entire auth module
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'; // Mock cookies function

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
  }),
}));

// Mock the UserService and other external services
vi.mock('@/services/apiServices/users', () => ({
  createUserService: vi.fn(),
}));

// Mock the generateToken function in the auth module
vi.mock('@/lib/midlleware/auth', () => ({
  generateToken: vi.fn(),
}));

describe('/api/auth/signup Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 201 and token on successful signup', async () => {
    // Mock the generateToken function to return a mocked token
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaXJlIjoxOCwiaWF0IjoxNzQwOTUyODMzLCJleHAiOjE3NDE1NTc2MzN9.eL2HDI8HumYgAc7x7LbvkQl6jiWd9q1nhMN1HKHFdJE";
    vi.spyOn(AuthModule, 'generateToken').mockResolvedValue(mockToken);

    // Mock user service to simulate successful user creation
    vi.spyOn(UserService, 'createUserService').mockResolvedValue({
        success: true,
        result: 9, // This could be the user ID or something else returned
    });

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "cruise", email: "cruise@gmail.com", contactNo: "6371881727", password: "password123" }),
    });

    const res = await POST(req);

    if (res) {
        const responseJson = await res.json();
        
        // Check that the status is 201 (indicating success)
        expect(res.status).toBe(201);
        
        // Check that the response contains only the token
        expect(responseJson).toHaveProperty('token');
        
        // Check that the token matches the mock token
        expect(responseJson.token).toBe(mockToken);
    } else {
        throw new Error('Response is undefined');
    }
});


  it('should return 400 if required fields are missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "cruise", email: "cruise@gmail.com" }), // Missing contactNo and password
    });

    const res = await POST(req);

    if (res) {
      const responseJson = await res.json();
      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ message: "All fields are required" });
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 400 if email is already registered', async () => {
    // Mock createUserService to return a failure message when the email already exists
    vi.spyOn(UserService, 'createUserService').mockResolvedValue({
      success: false,
      message: "Email already registered",
    });

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "cruise", email: "cruise@gmail.com", contactNo: "6371881727", password: "password123" }),
    });

    const res = await POST(req);

    if (res) {
      const responseJson = await res.json();
      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ message: "Email already registered" });
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 500 if there is an error in the signup process', async () => {
    // Simulate an error thrown by the service
    vi.spyOn(UserService, 'createUserService').mockRejectedValue(new Error("Database error"));

    const req = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "cruise", email: "cruise@gmail.com", contactNo: "6371881727", password: "password123" }),
    });

    const res = await POST(req);

    if (res) {
      const responseJson = await res.json();
      expect(res.status).toBe(500);
      expect(responseJson).toEqual({ error: "Error in signing up. Please try again!" });
    } else {
      throw new Error('Response is undefined');
    }
  });
});
