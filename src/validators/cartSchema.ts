import { z } from "zod";
const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
export const userSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "올바른 이메일 양식으로 기입해 주세요" }),
  phoneNumber: z.string(),
});

const productInfoSchema = z.object({
  productname: z.string(),
  productdetail: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

const shippingInfoSchema = z.object({
  address: z.string(),
  shippingType: z.string().min(8, { message: "배송메모." }),
  recipient: z.string(),
  recipientphone: z.string(),
  memo: z.string(),
});

const couponPointSchema = z.object({
  couponPoint: z
    .number()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && Number.isInteger(value), {
      message: "포인트는 숫자로만 입력해야 합니다.",
    })
    .optional(),
  couponCode: z.string().optional(),
  pointsUsed: z
    .number()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && Number.isInteger(value), {
      message: "포인트는 숫자로만 입력해야 합니다.",
    })
    .optional(),
});

const paymentAmountSchema = z.object({
  subtotal: z.number().optional(),
  discount: z.number().optional(),
  shippingFee: z.number().optional(),
  total: z.number(),
  depositor: z.number().optional(),
});

const paymentMethodSchema = z.object({
  payment: z.string(),
  depositor: z.string(),
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
  role: z.string().min(2, { message: "역할을." }),
});

export type TsOrderSchemaType = z.infer<typeof orderSchema>;
