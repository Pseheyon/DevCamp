"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mockCartData } from "@/app/api/cart/route";

import Image from "next/image";
import { Children, useEffect, useState } from "react";
import { Divide } from "lucide-react";
import { date } from "zod";
export default function Cart() {
  const [cartData, setCartData] = useState(mockCartData[0]);
  const [editedUser, setEditedUser] = useState({
    username: cartData.user.username,
    email: cartData.user.email,
    phoneNumber: cartData.user.phoneNumber,
  });
  const [shippingInfoe, setshippingInfoe] = useState({
    address: cartData.shippingInfo.address,
    shippingType: cartData.shippingInfo.shippingType,
    recipient: cartData.shippingInfo.recipient,
    recipientphone: cartData.shippingInfo.recipientphone,
  });
  const [isUserEditMode, setUserEditMode] = useState(false);
  const [isShippingEditMode, setShippingEditMode] = useState(false);

  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      user: {
        username: cartData?.user.username || "",
        email: cartData?.user.email || "",
        phoneNumber: cartData?.user.phoneNumber || "",
      },
      productInfo: {
        productname: cartData?.productInfo.productname || "",
        productdetail: cartData?.productInfo.productdetail || "",
        price: cartData?.productInfo.price || 0,
        quantity: cartData?.productInfo.quantity || 1,
      },
      shippingInfo: {
        address: cartData?.shippingInfo.address || "",
        shippingType: cartData?.shippingInfo.shippingType || "",
        recipient: cartData?.shippingInfo.recipient || "",
        recipientphone: cartData?.shippingInfo.recipientphone || "",
        memo: cartData?.shippingInfo.memo || "",
      },
      coupon: {
        couponPoint: cartData?.coupon.couponPoint || 0,
        couponCode: cartData?.coupon.couponCode || "",
        pointsUsed: cartData?.coupon.pointsUsed || 0,
      },
      paymentAmount: {
        discount: cartData?.paymentAmount.discount || 0,
        total: cartData?.paymentAmount.total || 0,
      },
      paymentMethod: {
        payment: cartData?.paymentMethod.payment || "option-one",
        depositor: cartData?.paymentMethod.depositor || "",
      },
      purchaseAgreement: {
        termsAndConditions:
          cartData?.purchaseAgreement.termsAndConditions || true,
        privacyPolicy: cartData?.purchaseAgreement.privacyPolicy || true,
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsOrderSchemaType>({
    resolver: zodResolver(orderSchema),
  });

  //수량변경
  const handleQuantityChange = (newQuantity: number) => {
    // 수량이 1 미만으로 내려가지 않도록 체크
    const updatedQuantity = Math.max(newQuantity, 1);

    setCartData((prevCartData) => ({
      ...prevCartData,
      productInfo: {
        ...prevCartData.productInfo,
        quantity: updatedQuantity,
      },
    }));
  };
  const getPoint = Math.round(cartData.paymentAmount.total / 100);

  const amoutQuantitypay =
    cartData.productInfo.price * cartData.productInfo.quantity;

  const handleUserEditClick = () => {
    setUserEditMode(true);
  };

  const handleUserSaveClick = () => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      user: editedUser,
    }));
    setUserEditMode(false);
  };

  const handleShippingEditClick = () => {
    setShippingEditMode(true);
  };

  const handleShippingSaveClick = () => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      shippingInfo: setshippingInfoe,
    }));
    setShippingEditMode(false);
  };

  console.log(form.watch());

  const onSubmit = async (data: TsOrderSchemaType) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(JSON.stringify(data, null, 4));

    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
    }
  };

  return (
    <main className="bg-slate-50 grid justify-center ">
      <Form {...form}>
        <h3 className=" p-4 box-border text-center font-extrabold text-lg pb-8 ">
          결제하기
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 justify-center justify-self-center gap-4 min-h-dvh rounded-none bg-slate-50  box-border w-[100%] "
        >
          <Card className=" col-span-3 rounded-none bg-inherit">
            <Card className=" bg-white mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">주문 상품 정보</CardTitle>
              <CardContent className="flex flex-row  ">
                <div>
                  <Image
                    src="/cat.jpg"
                    alt="제품 이미지"
                    width={100}
                    height={20}
                    className="w-auto h-auto"
                  ></Image>
                </div>
                <div className="px-4 box-border w-full">
                  {/* 상품명 */}
                  <FormField
                    control={form.control}
                    name="productInfo.productname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <h6 className="font-bold">
                            {cartData.productInfo.productname}
                          </h6>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex text-slate-400 text-xs pb-2  h-10  ">
                    {/* 상품정보 */}
                    <FormField
                      control={form.control}
                      name="productInfo.productdetail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="flex justify-center">
                            <>
                              <Button
                                size="icon"
                                variant="outline"
                                className=" box-border h-min mr-1"
                              >
                                정보
                              </Button>
                              <span className="mr-1">
                                {cartData.productInfo.productdetail}
                              </span>
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* 구매수량 */}
                    <FormField
                      control={form.control}
                      name="productInfo.productname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-center self-stretch mt-1">
                              (수량)
                              <span className=" box-border  text-center self-stretch ">
                                - {cartData.productInfo.quantity}
                              </span>
                              <span>마리</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex  text-xs pb-2 w-full h-10 justify-between h-10px items-center">
                    {/* 가격 */}
                    <FormField
                      control={form.control}
                      name="productInfo.price"
                      render={({ field }) => (
                        <FormItem className="basis-4/5">
                          <FormControl>
                            <p className=" text-base text font-black ">
                              반려묘 가격
                              <span>{cartData.productInfo.price}</span> 만원
                            </p>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text text-indigo-600 font-black text-xl">
                      <span>{amoutQuantitypay}</span> 만원
                    </p>
                    {/*구매 수량 + 버튼*/}
                    <FormField
                      control={form.control}
                      name="productInfo.quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-center self-stretch mt-1 h-sss">
                              <Button
                                variant="outline"
                                className=" rounded-none box-border size-px px-2 py-2"
                                onClick={() =>
                                  handleQuantityChange(
                                    cartData.productInfo.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <span
                                className=" box-border  text-center self-stretch  p-1"
                                {...field}
                              >
                                {cartData.productInfo.quantity}
                              </span>
                              <Button
                                variant="outline"
                                className=" rounded-none box-border size-px px-2 py-2 "
                                onClick={() =>
                                  handleQuantityChange(
                                    cartData.productInfo.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none shadow-sm border">
              <CardTitle className="p-4 pt-5  font-black">
                주문자 정보
              </CardTitle>

              <CardContent className="flex flex-row w-full justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="user.username"
                    render={({ field }) => (
                      <div className="flex">
                        <FormItem>
                          <FormControl>
                            {isUserEditMode ? (
                              <Input
                                value={editedUser.username}
                                onChange={(e) => {
                                  setEditedUser((prevUser) => ({
                                    ...prevUser,
                                    username: e.target.value,
                                  }));
                                  form.setValue(
                                    "user.username",
                                    e.target.value
                                  );
                                }}
                              />
                            ) : (
                              <p className="text-slate-500" {...field}>
                                {cartData.user.username}
                              </p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user.email"
                    render={({ field }) => (
                      <FormItem>
                        {isUserEditMode ? (
                          <Input
                            {...field}
                            value={editedUser.email}
                            onChange={(e) => {
                              setEditedUser((prevUser) => ({
                                ...prevUser,
                                email: e.target.value,
                              }));
                              form.setValue("user.email", e.target.value);
                            }}
                          />
                        ) : (
                          <p className="text-slate-500">
                            {cartData.user.email}
                          </p>
                        )}
                        <FormMessage className="m-5" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        {isUserEditMode ? (
                          <Input
                            {...field}
                            value={editedUser.phoneNumber}
                            onChange={(e) => {
                              setEditedUser((prevUser) => ({
                                ...prevUser,
                                phoneNumber: e.target.value,
                              }));
                              form.setValue("user.phoneNumber", e.target.value);
                            }}
                          />
                        ) : (
                          <p className="text-slate-500">
                            {cartData.user.phoneNumber}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  {isUserEditMode ? (
                    <Button
                      variant="outline"
                      className="rounded-[3px]"
                      onClick={handleUserSaveClick}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="rounded-[3px]"
                      onClick={handleShippingEditClick}
                    >
                      수정
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none shadow-sm border ">
              <CardTitle className="p-4 pt-5 ">배송 정보</CardTitle>
              <CardContent className="flex flex-row w-full justify-between">
                {/*배송자 명*/}
                <div>
                  <FormField
                    control={form.control}
                    name="shippingInfo.recipient"
                    render={({ field }) => (
                      <FormItem>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.recipient}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                recipient: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.recipient",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <h5 className="font-bold" {...field}>
                            {cartData.shippingInfo.recipient}
                          </h5>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*배송자 번호*/}
                  <FormField
                    control={form.control}
                    name="shippingInfo.recipientphone"
                    render={({ field }) => (
                      <FormItem>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.recipientphone}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                recipientphone: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.recipientphone",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <p className="text-slate-500" {...field}>
                            {cartData.shippingInfo.recipientphone}
                          </p>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*배송자 주소*/}
                  <FormField
                    control={form.control}
                    name="shippingInfo.address"
                    render={({ field }) => (
                      <FormItem {...field}>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.address}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                address: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.address",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <h6>{cartData.shippingInfo.address}</h6>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {isShippingEditMode ? (
                    <Button
                      variant="outline"
                      className="rounded-[3px]"
                      onClick={handleShippingSaveClick}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="rounded-[3px]"
                      onClick={handleShippingEditClick}
                    >
                      변경
                    </Button>
                  )}
                </div>
              </CardContent>
              <CardContent>
                {/*배송 메모*/}
                <FormField
                  control={form.control}
                  name="shippingInfo.shippingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">배송 메모</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="배송메모를 선택해 주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dor">
                            문앞에 두고 가주세요.
                          </SelectItem>
                          <SelectItem value="nock">노크 해주세요.</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 mb-8 boder rounded-none box-border shadow-sm border">
              <CardTitle className="p-4 pt-5 ">쿠폰/포인트</CardTitle>
              <CardHeader className=" pb-2 pt-1 font-bold">쿠폰</CardHeader>
              <CardContent
                className="flex size-full justify-center gap-2 
              rounded-none w-full"
              >
                {/*쿠폰 포인트-- */}
                <FormField
                  control={form.control}
                  name="coupon.couponPoint"
                  render={({ field }) => (
                    <FormItem className="basis-4/5">
                      <FormControl className="w-full">
                        <Input
                          className="rounded-none bg-inherit border"
                          placeholder="1,000"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            // 입력값이 숫자로 변환 가능한지 확인 후 변환
                            const numericValue = isNaN(
                              parseFloat(e.target.value)
                            )
                              ? e.target.value
                              : parseFloat(e.target.value);

                            // react-hook-form의 setValue 함수를 사용하여 값을 업데이트
                            form.setValue(
                              "coupon.couponPoint",
                              numericValue as number
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="deepnavy"
                  className="basis-1/5 text-center box-border rounded-[3px]"
                >
                  쿠폰적용
                </Button>
              </CardContent>

              <CardHeader className=" pb-2 pt-1 font-bold">
                쿠폰 번호
              </CardHeader>
              <CardContent className="flex size-full justify-center gap-2 rounded-none w-full">
                {/*쿠폰 코드-% */}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="deepnavy"
                  className="basis-1/5 text-center box-border rounded-[3px]"
                >
                  번호확인
                </Button>
              </CardContent>
              <CardHeader className=" pb-2 pt-1 font-bold">포인트</CardHeader>
              <CardContent>
                <div className="flex size-full justify-center gap-2 rounded-none w-full">
                  {/*쿠폰 포인트*/}
                  <FormField
                    control={form.control}
                    name="coupon.pointsUsed"
                    render={({ field }) => (
                      <FormItem className="basis-4/5">
                        <FormControl className="w-full">
                          <Input
                            className="rounded-none bg-inherit border"
                            placeholder="0"
                            type="number"
                            {...field}
                            onChange={(e) => {
                              // 입력값이 숫자로 변환 가능한지 확인 후 변환

                              const numericValue = isNaN(
                                parseFloat(e.target.value)
                              )
                                ? e.target.value
                                : parseFloat(e.target.value);

                              // react-hook-form의 setValue 함수를 사용하여 값을 업데이트
                              if (field.value !== numericValue) {
                                // react-hook-form의 setValue 함수를 사용하여 값을 업데이트
                                form.setValue(
                                  "coupon.couponPoint",
                                  numericValue as number
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="deepnavy"
                    className="basis-1/5 text-center box-border rounded-[3px]"
                  >
                    전액사용
                  </Button>
                </div>
                <p className=" text-slate-800 text-s pt-1 font-bold">
                  보유 포인트 <span>2,300</span>
                </p>
                <p className=" text-slate-400 text-xs pt-1 ">
                  5000 포인트 이상 보유 및 10,000 이상 구매시 사용가능
                </p>
              </CardContent>
            </Card>
          </Card>
          <Card className="col-span-1 rounded-none bg-inherit">
            <Card className=" bg-white mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">최종 결제 금액</CardTitle>
              <CardContent>
                <div className="flex flex-row w-full justify-between">
                  {/*상품 가격*/}
                  <FormField
                    control={form.control}
                    name="productInfo.price"
                    render={({ field }) => (
                      <FormItem>
                        <p className="text-slate-500 font-medium" {...field}>
                          상품 가격
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="font-bold">
                    18000<span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  {/* <FormField
                    control={form.control}
                    name="user.username"
                    render={({ field }) => (
                      <FormItem>
                        <p className="text-slate-500 font-medium" {...field}>
                          쿠폰 할인
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  {/*쿠폰 + 쿠폰 할인*/}
                  <p className="text-slate-500 font-medium">쿠폰 할인</p>
                  <p className="font-bold">
                    <span>-</span>1000<span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p className="text-slate-500 font-medium">포인트 사용</p>

                  <p className="font-bold">
                    <span>-</span>0<span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p className="text-slate-500 font-medium">배송비</p>
                  <p className="font-bold">
                    <span>+</span>2500<span>원</span>
                  </p>
                </div>
                <hr className="mt-4 mb-4" />
                <div className="flex flex-row w-full justify-between items-center">
                  <h5>총 결제 금액</h5>
                  <h5 className=" font-black text-indigo-600 text-2xl"></h5>
                </div>
              </CardContent>
              <CardContent className=" bg-slate-50 w-full p-3 justify-items-center">
                <h6 className="flex items-center text-center">
                  <span className=" text-indigo-600 font-black">
                    {getPoint}
                  </span>
                  포인트 적립예정
                </h6>
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">결제 방법</CardTitle>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">최종 결제 금액</CardTitle>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod.payment"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        className="grid"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <>
                            <div className="flex items-center space-x-2 ">
                              <RadioGroupItem
                                value="option-one"
                                id="option-one"
                              />
                              <Label htmlFor="option-one">신용 카드</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-two"
                                id="option-two"
                              />
                              <Label htmlFor="option-two">가상계좌</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-tree"
                                id="option-tree"
                              />
                              <Label htmlFor="option-tree">무통장 입금</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-four"
                                id="option-four"
                              />
                              <Label htmlFor="option-four">핸드폰 결제</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-five"
                                id="option-five"
                              />
                              <Label htmlFor="option-five">카카오 페이</Label>
                            </div>
                          </>
                        </FormControl>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <FormField
                  control={form.control}
                  name="shippingInfo.shippingType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="00은행:000-00-0000 예금주명" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bankone">
                            ㄱ00은행:000-00-0000 예금주명
                          </SelectItem>
                          <SelectItem value="banktwo">
                            ㄴ00은행:000-00-0000 예금주명
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod.depositor"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl className="w-full">
                        <Input
                          className=" rounded-none bg-inherit border"
                          placeholder="입급자명을 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="mt-2 text-slate-500 font-medium text-xs">
                  <span>
                    주문 후 24시간동안 미입금시 자동 취소가 될 수 있습니다.
                  </span>
                </p>
                <hr className="mt-2 mb-4" />
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      현금 영수증 신청
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 pb-4 boder rounded-none p-0 shadow-sm border">
              <CardContent className="pt-5">
                {/* <FormField
                  control={form.control}
                  name="purchaseAgreement.termsAndConditions"
                  render={({ field }) => (
                    <FormItem>
                      <div className="items-top flex space-x-2 mb-4">
                        <Checkbox
                          id="terms1"
                          checked={field.value}
                          onCheckedChange={() => field.onChange(!field.value)}
                          {...field}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            전체동의
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="items-top flex space-x-2 ml-4">
                  {/* <FormField
                    control={form.control}
                    name="purchaseAgreement.termsAndConditions"
                    render={({ field }) => (
                      <FormItem>
                        <div className="items-top flex space-x-2 mb-4">
                          <Checkbox
                            id="terms1"
                            checked={field.value}
                            onCheckedChange={() => field.onChange(!field.value)}
                            {...field}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              구매조건 확인 및 결제진행에 동의
                            </label>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              </CardContent>
              <CardContent className="grid justify-items-center  bg-indigo-600 w-full p-3 justify-center text-center">
                <Button
                  className="flex items-center text-center text-white font-extrabold self-center w-full basis-full"
                  type="submit"
                  onClick={(e) => {
                    console.log("확인", date);
                    form.handleSubmit(onSubmit)(e);
                  }}
                >
                  결제하기
                </Button>
              </CardContent>
            </Card>
          </Card>
        </form>
      </Form>
    </main>
  );
}
