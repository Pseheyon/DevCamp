"use client";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "./ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  TsRegisterSchemaType,
  registerSchema,
} from "@/validators/signupSchema";
import { cn } from "@/lib/utils";

import { TsOrderSchemaType } from "@/validators/cartSchema"; // 필요한 타입 임포트

interface Props {
  form: UseFormReturn<TsOrderSchemaType>;
  cartData: TsOrderSchemaType;
  setCartData: React.Dispatch<React.SetStateAction<TsOrderSchemaType>>;
}

const CouponPointFrom: React.FC<Props> = ({ form, cartData, setCartData }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isResetButtonShown, setIsResetButtonShown] = useState(false);

  const amoutQuantitypay =
    cartData.productInfo.price * cartData.productInfo.quantity;
  const total = cartData.paymentAmount.total;

  const handlePointsUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.trim(); // 입력된 값에서 공백 제거

    if (!inputVal) {
      // 입력된 값이 없는 경우에 대한 처리
      return;
    }

    const numericValue: number = parseFloat(inputVal);

    if (isNaN(numericValue)) {
      // 변환된 값이 NaN인 경우에 대한 처리
      alert("숫자를 입력해주세요.");
      return;
    }

    if (numericValue < (amoutQuantitypay || total)) {
      alert(`현재 총 금액이 쿠폰보다 적으므로 사용이 불가능 합니다.`);
      return;
    }

    const minPoints = 5000;
    const maxPoints = total; // 가용한 포인트 상한값

    const clampedValue = Math.max(
      maxPoints - Math.max(minPoints, numericValue),
      0
    );
    form.setValue("paymentAmount.discount", clampedValue);
    setCartData((prevCartData) => ({
      ...prevCartData,
      paymentAmount: {
        ...prevCartData.paymentAmount,
        discount: numericValue,
      },
    }));
  };

  const handleUseAllPoints = () => {
    const updatedtotal =
      cartData.paymentAmount.total - cartData.coupon.couponPoint;
    form.setValue("paymentAmount.total", updatedtotal);
    form.setValue("paymentAmount.discount", 0);

    if (cartData.coupon.couponPoint > (amoutQuantitypay || total)) {
      alert(`현재 총 금액이 쿠폰보다 적으므로 사용이 불가능 합니다.`);
      return;
    } else if (total < 0) {
      alert(`현재금액이 0 원이므로 사용이 불가능 합니다.`);
      return;
    } else if (updatedtotal < 0) {
      alert(`할인 금액이 0보다 낮아 구매가 불가능 합니다.`);
      return;
    } else if (setIsResetButtonShown(false) || setIsButtonClicked(false)) {
      setIsResetButtonShown(true);
      setIsButtonClicked(true);
    }

    setCartData((prevCartData) => ({
      ...prevCartData,
      paymentAmount: {
        ...prevCartData.paymentAmount,
        total: updatedtotal,
        discount: 0,
      },
    }));

    console.log("포인트 사용 확인", cartData.coupon.couponPoint);
  };

  const handleReset = () => {
    if (setIsResetButtonShown || setIsButtonClicked) {
      setIsButtonClicked(false);
      setIsResetButtonShown(false);
    }
    const updatedtotal = amoutQuantitypay;
    form.setValue("paymentAmount.total", updatedtotal);
    setCartData((prevCartData) => ({
      ...prevCartData,
      paymentAmount: {
        ...prevCartData.paymentAmount,
        total: updatedtotal,
      },
    }));
  };

  return (
    <div className="flex size-full justify-center gap-2 rounded-none w-full">
      <FormField
        control={form.control}
        name="coupon.couponPoint"
        render={({ field }) => (
          <FormItem className="basis-4/5">
            <FormControl className="w-full">
              <Input
                className="rounded-none bg-inherit border"
                placeholder="0"
                {...field}
                onChange={handlePointsUsedChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isResetButtonShown ? (
        <Button
          type="button"
          variant="deepnavy"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleReset}
        >
          초기화
        </Button>
      ) : (
        <Button
          type="button"
          variant="deepnavy"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleUseAllPoints}
          disabled={isButtonClicked}
        >
          {isButtonClicked ? "처리 중" : "사용"}
        </Button>
      )}
    </div>
  );
};

export default CouponPointFrom;
