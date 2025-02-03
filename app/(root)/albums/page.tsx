"use client"
import Image from "next/image"
import { SidebarHandler } from "@/components/shared/SidebarContext"
import Appbar from "@/components/shared/AppSidebar"
import ButtonBar from "@/components/shared/ButtonBar"
import MenuComponent from "@/components/shared/MenuComponent"


export default function Page() {
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr] h-screen gap-4">
        <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex items-center justify-center">
            <Layout />
        </div>
        <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex flex-col gap-6 items-center justify-center">
            <Image
                src = "/red.png"
                alt = "Placeholder"
                height = {200}
                width= {200}
            />
        </div>
        <div className="grid grid-rows-[1fr_1fr] h-screen bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) items-center justify-center gap-4">
            <ButtonBar />
            <MenuComponent />
        </div>
      </div>
    )
}

export function Layout() {
    return (
        <SidebarHandler>
          <div className="flex max-h-screen">
          <Appbar />
          <main className="flex-1 p-6 overflow-hidden">
          </main>
          </div>
        </SidebarHandler>
      )
}