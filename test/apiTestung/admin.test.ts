import { describe, it, expect, vi, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST, DELETE, updateAdmin } from '@/app/api/admin/route'; // Adjust the path as needed
import * as AuthModule from '@/lib/midlleware/auth'; // Importing auth functions
import * as AdminService from '@/services/apiServices/admins'; // Importing the admin service functions

// Mocking checkToken and other dependencies
vi.mock('@/lib/midlleware/auth', () => ({
  checkToken: vi.fn(),
  isAdmin: vi.fn(),
}));

vi.mock('@/services/apiServices/admins', () => ({
  createAdminService: vi.fn(),
  deleteAdminService: vi.fn(),
  updateAdminService: vi.fn(),
}));

describe('/api/admin Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test for POST route (Creating admin)
  it('should return 200 when creating an admin successfully', async () => {
    const mockDecodedUser = { identifire: 1 }; // Simulated decoded user ID
    const mockAdminResponse = { success: true, message: "Admin created successfully" };

    // Mock the checkToken function to simulate a valid token
    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    // Mock the isAdmin function to simulate an admin user
    vi.spyOn(AuthModule, 'isAdmin').mockResolvedValue(null); // Admin check passes

    // Mock the createAdminService function to simulate successful admin creation
    vi.spyOn(AdminService, 'createAdminService').mockResolvedValue(mockAdminResponse);

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer valid-token' },
      body: JSON.stringify({ userID: 2 }), // Passing userID to make them an admin
    });

    const res = await POST(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the response status is 200
      expect(res.status).toBe(200);
      
      // Check that the response message is correct
      expect(responseJson.message).toBe('Admin created successfully');
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 401 for invalid token in POST route', async () => {
    // Mock checkToken to return an invalid token response
    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: false,
      decodedUser: null,
    });

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer invalid-token' },
      body: JSON.stringify({ userID: 2 }),
    });

    const res = await POST(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the status is 401 (Unauthorized)
      expect(res.status).toBe(401);
      
      // Check that the error message is returned
      expect(responseJson.error).toBe('Unauthorized. Invalid or missing token.');
    } else {
      throw new Error('Response is undefined');
    }
  });

  // Test for DELETE route (Deleting admin)
  it('should return 200 when deleting an admin successfully', async () => {
    const mockDecodedUser = { identifire: 1 };
    const mockDeleteResponse = { success: true, message: "Admin deleted successfully" };

    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    vi.spyOn(AuthModule, 'isAdmin').mockResolvedValue(null); // Admin check passes

    vi.spyOn(AdminService, 'deleteAdminService').mockResolvedValue(mockDeleteResponse);

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer valid-token' },
      body: JSON.stringify({ userID: 2 }), // Admin to be deleted
    });

    const res = await DELETE(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the response status is 200
      expect(res.status).toBe(200);
      
      // Check that the message is correct
      expect(responseJson.message).toBe('Admin deleted successfully');
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 401 for invalid token in DELETE route', async () => {
    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: false,
      decodedUser: null,
    });

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer invalid-token' },
      body: JSON.stringify({ userID: 2 }),
    });

    const res = await DELETE(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the status is 401 (Unauthorized)
      expect(res.status).toBe(401);
      
      // Check that the error message is correct
      expect(responseJson.error).toBe('Unauthorized. Invalid or missing token.');
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 404 if admin not found in DELETE route', async () => {
    const mockDecodedUser = { identifire: 1 };
    
    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    vi.spyOn(AuthModule, 'isAdmin').mockResolvedValue(null);

    // Simulate admin not found during deletion
    vi.spyOn(AdminService, 'deleteAdminService').mockResolvedValue({
      success: false,
      message: "Admin not found",
    });

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer valid-token' },
      body: JSON.stringify({ userID: 2 }),
    });

    const res = await DELETE(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the status is 404 (Not Found)
      expect(res.status).toBe(404);
      
      // Check that the message is correct
      expect(responseJson.message).toBe('Admin not found');
    } else {
      throw new Error('Response is undefined');
    }
  });

  // Test for PUT route (Updating admin)
  it('should return 200 when updating an admin successfully', async () => {
    const mockDecodedUser = { identifire: 1 };
    const mockUpdateResponse = { success: true, message: "Admin updated successfully" };

    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    vi.spyOn(AuthModule, 'isAdmin').mockResolvedValue(null); // Admin check passes

    vi.spyOn(AdminService, 'updateAdminService').mockResolvedValue(mockUpdateResponse);

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer valid-token' },
      body: JSON.stringify({ userID: 2, newUserID: 3 }), // Admin to update
    });

    const res = await updateAdmin(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the response status is 200
      expect(res.status).toBe(200);
      
      // Check that the message is correct
      expect(responseJson.message).toBe('Admin updated successfully');
    } else {
      throw new Error('Response is undefined');
    }
  });

  it('should return 404 if admin not found in PUT route', async () => {
    const mockDecodedUser = { identifire: 1 };
    
    vi.spyOn(AuthModule, 'checkToken').mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    vi.spyOn(AuthModule, 'isAdmin').mockResolvedValue(null);

    // Simulate admin not found during update
    vi.spyOn(AdminService, 'updateAdminService').mockResolvedValue({
      success: false,
      message: "Admin not found",
    });

    const req = new NextRequest('http://localhost:3000/api/admin', {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer valid-token' },
      body: JSON.stringify({ userID: 2, newUserID: 3 }),
    });

    const res = await updateAdmin(req);

    if (res) {
      const responseJson = await res.json();
      
      // Check that the status is 404 (Not Found)
      expect(res.status).toBe(404);
      
      // Check that the message is correct
      expect(responseJson.message).toBe('Admin not found');
    } else {
      throw new Error('Response is undefined');
    }
  });
});
