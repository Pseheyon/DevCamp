import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "올바른 이메일 양식으로 기입해 주세요" }),
  phoneNumber: z.string(),
});

const productInfoSchema = z.object({
  productname: z.string(),
  productdetail: z.string(),
  price: z.number(),
});

const shippingInfoSchema = z.object({
  address: z.string(),
  shippingType: z.string(),
});

const couponPointSchema = z.object({
  couponPoint: z.string().optional(),
  couponCode: z.string().optional(),
  pointsUsed: z.number().int().optional(),
});

const paymentAmountSchema = z.object({
  subtotal: z.number(),
  discount: z.number().optional(),
  shippingFee: z.number(),
  total: z.number(),
});

const paymentMethodSchema = z.object({
  method: z.string(),
});

const purchaseAgreementSchema = z.object({
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "구매를 위해 약관에 동의해야 합니다.",
  }),
  privacyPolicy: z.boolean().refine((value) => value === true, {
    message: "구매를 위해 개인정보 처리 방침에 동의해야 합니다.",
  }),
});

export const orderSchema = z.object({
  user: userSchema,
  productInfo: productInfoSchema,
  shippingInfo: shippingInfoSchema,
  coupon: couponPointSchema,
  paymentAmount: paymentAmountSchema,
  paymentMethod: paymentMethodSchema,
  purchaseAgreement: purchaseAgreementSchema,
  cachesPay: z.boolean(),
});

export type TsOrderSchemaType = z.infer<typeof orderSchema>;
