import { getUserService } from "@/services/apiServices/users";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }
  try {
    const result = await getUserService(email, password);

    if (!result?.success) {
      return NextResponse.json({ message: result?.message }, { status: 401 });
    }

    if (result.user) {
      const setCookie = await cookies();
      const sevenDay = 7 * 24 * 60 * 60 * 1000;
      setCookie.set("token", result.user.token!, {
        expires: Date.now() + sevenDay,
      });
      return NextResponse.json({ user: result.user }, { status: 200 });
    }

    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving user. Please try again later." },
      { status: 500 }
    );
  }
}
