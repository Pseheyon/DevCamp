import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "데브캠프 로그인/회원가입",
  description: "데브캠프 로그인/회원가입 프론트앤드 구현",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menubar>
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
            <Link href="/login">로그아웃</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              로그아웃 <MenubarShortcut>바로가기</MenubarShortcut>
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
      {children}
    </>
  );
}
