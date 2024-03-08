import { loginSchema } from "@/validators/loginSchema";
import { NextResponse } from "next/server";
const mockUserData = {
  email: "user@example.com",
  password: "pw1234!",
  rol: "admin",
};
export async function POST(request: Request) {
  const body: unknown = await request.json();

  const result = loginSchema.safeParse(body);

  // check out Zod's .flatten() method for an easier way to process errors
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    console.log("서버확인", result);
    const { email, password } = result.data;

    const existingUser = mockUserData.email === email ? mockUserData : null;

    if (!existingUser || existingUser.password !== password) {
      zodErrors = { authentication: "사용자 정보가 없습니다." };
    }
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
