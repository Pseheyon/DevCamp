import { loginSchema } from "@/validators/loginSchema";
import { NextResponse } from "next/server";
const mockUserData = {
  email: "user@example.com",
  password: "pw1234!",
  role: "admin",
};
export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = loginSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    const { email, password, role } = result.data;

    const existingUser = mockUserData.email === email ? mockUserData : null;

    if (
      !existingUser ||
      existingUser.password !== password ||
      existingUser.role !== role
    ) {
      zodErrors = {
        authentication: "사용자 정보가 없습니다.",
      };
    }
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
