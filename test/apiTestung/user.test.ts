import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/user/route"; // Adjust the path to your actual route handler
import * as AuthModule from "@/lib/midlleware/auth"; // Import the auth module for token checking
import * as UserService from "@/services/apiServices/users"; // Import the user service for fetching user by ID

// Mocking checkToken and other dependencies
vi.mock("@/lib/midlleware/auth", () => ({
  checkToken: vi.fn(),
}));

vi.mock("@/services/apiServices/users", () => ({
  getUserByIDService: vi.fn(),
}));

describe("/api/user Tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 200 and user data on successful authenticated request", async () => {
    const mockUser = {
      userID: 9,
      name: "cruise",
      email: "cruise@gmail.com",
      contactNo: "6371881727",
    };

    // Mock the checkToken function to simulate a valid token and decoded user
    const mockDecodedUser = { identifire: 9 }; // ID from the decoded token
    vi.spyOn(AuthModule, "checkToken").mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    // Mock the getUserByIDService to return the mock user
    vi.spyOn(UserService, "getUserByIDService").mockResolvedValue({
      success: true,
      user: mockUser,
    });

    const req = new NextRequest("http://localhost:3000/api/user", {
      method: "GET",
      headers: { Authorization: "Bearer valid-token" }, // Adding token in the header
    });

    const res = await GET(req);

    if (res) {
      const responseJson = await res.json();

      // Check that the status is 200 (indicating success)
      expect(res.status).toBe(200);

      // Check that the response contains the user data
      expect(responseJson).toEqual(mockUser);
    } else {
      throw new Error("Response is undefined");
    }
  });

  it("should return 401 for invalid token", async () => {
    // Mock checkToken to return invalid token response
    vi.spyOn(AuthModule, "checkToken").mockResolvedValue({
      isValid: false,
      decodedUser: null,
    });

    const req = new NextRequest("http://localhost:3000/api/user", {
      method: "GET",
      headers: { Authorization: "Bearer invalid-token" },
    });

    const res = await GET(req);

    if (res) {
      const responseJson = await res.json();

      // Check that the status is 401 (unauthorized)
      expect(res.status).toBe(401);

      // Check that the response contains the error message
      expect(responseJson).toEqual({
        error: "Unauthorized. Invalid or missing token.",
      });
    } else {
      throw new Error("Response is undefined");
    }
  });

  it("should return 404 if user not found", async () => {
    const mockDecodedUser = { identifire: 9 }; // ID from the decoded token
    vi.spyOn(AuthModule, "checkToken").mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    // Mock the getUserByIDService to return user not found
    vi.spyOn(UserService, "getUserByIDService").mockResolvedValue({
      success: false,
      message: "User not found",
    });

    const req = new NextRequest("http://localhost:3000/api/user", {
      method: "GET",
      headers: { Authorization: "Bearer valid-token" },
    });

    const res = await GET(req);

    if (res) {
      const responseJson = await res.json();

      // Check that the status is 404 for not found
      expect(res.status).toBe(404);

      // Check that the response contains the not found message
      expect(responseJson).toEqual({ message: "User not found" });
    } else {
      throw new Error("Response is undefined");
    }
  });

  it("should return 500 if there is an error fetching the user", async () => {
    const mockDecodedUser = { identifire: 9 }; // ID from the decoded token
    vi.spyOn(AuthModule, "checkToken").mockResolvedValue({
      isValid: true,
      decodedUser: mockDecodedUser,
    });

    // Mock the getUserByIDService to throw an error
    vi.spyOn(UserService, "getUserByIDService").mockRejectedValue(
      new Error("An error occurred")
    );

    const req = new NextRequest("http://localhost:3000/api/user", {
      method: "GET",
      headers: { Authorization: "Bearer valid-token" },
    });

    const res = await GET(req);

    if (res) {
      const responseJson = await res.json();

      // Check that the status is 500 (internal server error)
      expect(res.status).toBe(500);

      // Check that the response contains the error message
      expect(responseJson).toEqual({
        error: "An error occurred while fetching the user",
      });
    } else {
      throw new Error("Response is undefined");
    }
  });
});
