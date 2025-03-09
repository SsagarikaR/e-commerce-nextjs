import { getUserService } from "@/services/apiServices/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password, "emil password");
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }
  try {
    const result = await getUserService(email, password);
    // console.log(result, "result");
    if (result?.success === false) {
      console.log("sended");
      return NextResponse.json({ error: result?.message }, { status: 409 });
    }

    if (result?.user) {
      return NextResponse.json({ user: result.user }, { status: 200 });
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error retrieving user. Please try again later." },
      { status: 500 }
    );
  }
}
