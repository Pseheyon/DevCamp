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
import { Input } from "@/components/ui/input";
import {
  TsRegisterSchemaType,
  registerSchema,
} from "@/validators/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function Cart() {
  const form = useForm<TsRegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      email: "",
      role: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsRegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: TsRegisterSchemaType) => {
    const { password, confirmPassword } = data;

    alert(JSON.stringify(data, null, 4));
    const response = await fetch("/api/signup", {
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
    }
  };

  return (
    <main className="bg-slate-50 px-60 flex flex-col justify-center">
      <Form
        {...form}
        // className="bg-slate-50 px-60 flex flex-col justify-center"
      >
        <h3 className=" p-4 box-border text-center font-extrabold text-lg pb-8">
          결제하기
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center gap-4 min-h-dvh rounded-none bg-slate-50 w-60% pl-20% pr-20% box-border justify-self-center"
        >
          <Card className="basis-3/5 rounded-none bg-inherit">
            <Card className=" bg-white mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">주문 상품 정보</CardTitle>
              <CardHeader className="p-4 pb-2 pt-1 font-bold">
                주문 상품 정보
              </CardHeader>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none shadow-sm border">
              <CardTitle className="p-4 pt-5  font-black">
                주문자 정보
              </CardTitle>
              {/* <CardHeader className="p-4 pb-2 pt-1 font-bold">
              주문자 정보
            </CardHeader> */}
              <CardContent className="flex flex-row w-full justify-between">
                <div>
                  <h5 className="font-bold">홍길동</h5>
                  <p className="text-slate-500">01012345678</p>
                  <h6>
                    서울 특별시 서대문구 성산로7길 89-8(연희동) 주식회사 아임웹
                    (03706)
                  </h6>
                </div>
                <Button variant="outline" className="rounded-[3px]">
                  수정
                </Button>
              </CardContent>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none shadow-sm border ">
              <CardTitle className="p-4 pt-5 ">배송 정보</CardTitle>
              <CardHeader className="p-4 pb-2 pt-1 font-bold">
                배송 정보
              </CardHeader>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none box-border shadow-sm border">
              <CardTitle className="p-4 pt-5 ">쿠폰/포인트</CardTitle>
              <CardHeader className="p-4 pb-2 pt-1 font-bold">쿠폰</CardHeader>
              <CardContent className="p-4 flex size-full justify-center gap-2 rounded-none">
                <Card className="basis-4/5 rounded-none bg-inherit border"></Card>
                <Button
                  variant="deepnavy"
                  className="basis-1/5 text-center box-border rounded-[3px]"
                >
                  쿠폰 적용
                </Button>
              </CardContent>
            </Card>
          </Card>
          <Card className="basis-2/5 rounded-none bg-inherit">
            <Card className=" bg-white mt-4 boder rounded-none p-1">
              <CardHeader className="p-4 font-bold">최종 결제 금액</CardHeader>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none ">
              <CardHeader className="p-4 font-bold">결제 방법</CardHeader>
            </Card>
            <Card className=" bg-white mt-4 boder rounded-none "></Card>
          </Card>
        </form>
      </Form>
    </main>
  );
}
