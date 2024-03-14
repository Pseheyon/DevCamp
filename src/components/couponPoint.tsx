"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
export default function CouponPointFrom() {
  const { toast } = useToast();

  return (
    <div className="p-40 box-border w-100">
      <FormField
        control={form.control}
        name="coupon.couponCode"
        render={({ field }) => (
          <FormItem className="basis-4/5">
            <FormControl className="w-full">
              <Input
                className=" rounded-none bg-inherit border"
                placeholder="쿠폰 번호 입력"
                {...field}
                onChange={handlePointsDiscountChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        variant="deepnavy"
        className="basis-1/5 text-center box-border rounded-[3px]"
        onClick={handleUseDiscount}
      >
        번호확인
      </Button>
    </div>
  );
}
