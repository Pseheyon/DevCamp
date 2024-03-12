import { NextResponse } from "next/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";

export const mockCartData: TsOrderSchemaType[] = [
  {
    user: {
      username: "JohnDoe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
    productInfo: {
      productname: "Sample Product",
      productdetail: "This is a sample product.",
      price: 29.99,
      quantity: 2,
    },
    shippingInfo: {
      address: "123 Main St, Cityville",
      shippingType: "Express",
    },
    coupon: {
      couponPoint: 10,
      couponCode: "DISCOUNT123",
      pointsUsed: 5,
    },
    paymentAmount: {
      discount: 5,
      total: 54.98,
    },
    paymentMethod: {
      payment: "option-one",
    },
    purchaseAgreement: {
      termsAndConditions: true,
      privacyPolicy: true,
    },
    cachesPay: false, // 새로 추가한 필드
  },
];

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = orderSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  } else {
    // Mock 데이터를 업데이트
    const updatedData: TsOrderSchemaType = result.data;
    mockCartData[0] = updatedData;
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
