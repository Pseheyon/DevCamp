import { NextResponse } from "next/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";

export const mockCartData: TsOrderSchemaType[] = [
  {
    user: {
      username: "루미",
      email: "lumi@example.com",
      phoneNumber: "123-456-7890",
    },
    productInfo: {
      productname: "루미고양이",
      productdetail: "너무 귀엽지",
      price: 1000,
      quantity: 2,
    },
    shippingInfo: {
      address: "123 부산 중구 대동로 40-21번지 길바닥집, ",
      shippingType: "dor",
      recipient: "쫀덕이",
      recipientphone: "123-456-7890",
      memo: "dor",
    },
    coupon: {
      couponPoint: 6000,
      couponCode: "DISCOUNT123-20% 할인 쿠폰",
      pointsUsed: 6000,
    },
    paymentAmount: {
      discount: 0,
      total: 2000,
    },
    paymentMethod: {
      payment: "",
      depositor: "박루미",
    },
    purchaseAgreement: {
      termsAndConditions: false,
      privacyPolicy: false,
    },
    role: "admin",
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
    console.log("결제 결과", result);
    const updatedData: TsOrderSchemaType = result.data;
    mockCartData[0] = updatedData;
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
