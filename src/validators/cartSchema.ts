import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const productInfoSchema = z.object({
  id: z.string(),
  productname: z.string(),
  price: z.number(),
  imgUrl: z.string(),
});

const shippingInfoSchema = z.object({
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
});

const couponPointSchema = z.object({
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
  couponPoint: couponPointSchema,
  paymentAmount: paymentAmountSchema,
  paymentMethod: paymentMethodSchema,
  purchaseAgreement: purchaseAgreementSchema,
  cachesPay: z.boolean(),
});

export type TsOrderSchemaType = z.infer<typeof orderSchema>;
