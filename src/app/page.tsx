import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Signup from "./(logout)/signup/page";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col flex-row items-center size-full justify-center">
      <Menubar className="w-full">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/">홈</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              홈 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/signup">회원가입</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              회원가입 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/login">로그인</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              로그인 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/cart">장바구니</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              장바구니 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Card className="p-8 box-border m-40 ">
        <CardHeader className="font-bold">🌟방문을 환영합니다!!🌟</CardHeader>
        <CardContent className="flex gap-2 items-center ">
          <Link href={"/signup"} className="basis-1/2">
            <Button className="w-full">
              회원가입하러 가기 <ChevronRightIcon />
            </Button>
          </Link>
          <Link href={"/login"} className="basis-1/2">
            <Button variant="lightblue" Taweight="bold" className="w-full">
              로그인 하러 가기
              <ChevronRightIcon />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
