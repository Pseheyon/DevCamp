"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { TsLoginSchemaType, loginSchema } from "@/validators/loginSchema";
import { cn } from "@/lib/utils";
export default function Login() {
  const form = useForm<TsLoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsLoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();
  const onSubmit = async (data: TsLoginSchemaType) => {
    alert(JSON.stringify(data, null, 4));
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      console.log("responseData.errors", responseData.errors);
    }
    if (response.ok) {
    }
  };

  return (
    <div className="p-40 box-border w-100">
      <Form {...form}>
        <h1>로그인 하기</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-2 w-100"
        >
          <div className={"size-full"}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com_으로 로그인 가능"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={"size-full"}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="pw1234!_으로 로그인 가능"
                      type={"password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={"size-full"}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>역할</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="역할을 선택해주세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">관리자로 로그인</SelectItem>
                      <SelectItem value="user">일반사용자로 로그인</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={"flex gap-2 size-full w-100"}>
            <Button
              variant="default"
              type="submit"
              className=" cursor-pointer"
              onClick={(e) => {
                console.log("클릭 발생!");
                form.handleSubmit(onSubmit)(e);
              }}
            >
              {/* <Link href="/cart"> */}
              로그인하기
              {/* </Link> */}
            </Button>
            <Button
              variant="lightblue"
              type="button"
              className=" cursor-pointer"
              onClick={(e) => {
                form.handleSubmit(onSubmit)(e);
              }}
            >
              <Link href="/">계정 생성하기</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
