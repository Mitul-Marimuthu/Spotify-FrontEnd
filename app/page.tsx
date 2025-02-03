"use client"
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { /*SidebarProvider, /*SidebarTrigger*/ } from "@/components/ui/sidebar"
// import AppSidebar  from "@/components/shared/AppSidebar"
import Appbar from "@/components/shared/AppSidebar";

export function Layout() {
  return (
    <div>
      <Appbar />
    </div>
    // <SidebarProvider>
    //   <div className="flex max-h-screen">
    //   <AppSidebar />
    //   <main className="flex-1 p-6 overflow-hidden">
    //     {children}
    //   </main>
    //   </div>
    // </SidebarProvider>
  )
}

export default function Page() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <Home/>
    </div>
  )
}


export function Home() {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-10  font-[family-name:var(--font-geist-sans)]">
      <div>
      <Appbar/>
      </div>
      <div>
      <main className="flex flex-col gap-4 row-start-2 items-center ">
        <Image
          //className="dark:invert"
          src="/red.png"
          alt="Black Spotify Logo"
          width={400}
          height={200}
          priority
        />
        <Label htmlFor="message">What do you want to know?</Label>
        <Textarea placeholder="Type your request here." id="message"
         style={{ width: '500px', height: '5px' }}
        />
        <Button>Send message</Button>
       </main>
       </div>
      </div>
  );
}
