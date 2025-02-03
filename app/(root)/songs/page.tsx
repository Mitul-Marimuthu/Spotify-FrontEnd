"use client"
import Image from "next/image"

export default function Page() {
    return (
        <div className="grid grid-rows-[1fr_5fr_1fr] h-screen gap-4">
        <div className="bg-red-500 flex items-center justify-center">Left</div>
        <div className="bg-blue-500 flex flex-col gap-6 items-center justify-center">
            <Image
                src = "/red.png"
                alt = "Placeholder"
                height = {200}
                width= {200}
            />
        </div>
        <div className="bg-green-500 flex items-center justify-center">Right</div>
      </div>
    )
}