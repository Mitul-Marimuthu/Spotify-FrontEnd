import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { navlinks } from "@/constants";
import Image  from "next/image";
import { useSidebarContext } from "./SidebarContext";
import { SidebarHandler } from "./SidebarContext";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Appbar() {
  return(
    <SidebarHandler>
      <AppSidebar />
    </SidebarHandler>
  );
}

export function AppSidebar() {
const { selectedLabel, setSelectedLabel } = useSidebarContext();
return (
  <div>
  <SidebarProvider>
  <Sidebar className="h-screen" side="left" variant="sidebar">
    <SidebarHeader className="gap-2 h-20">
      <a className="flex items-center gap-4">
      <Image src={"/red.png"} alt={`Logo icon`} width={20} height={20} className="w-10 h-10"/>
      <span className="text-3xl text-white">{"SpotiGraph"}</span>
      </a>
    </SidebarHeader>
    <SidebarContent className="items-center">
      {/* You can loop through navlinks to create sidebar buttons */}
      <SidebarGroup>
        <SidebarMenu className="gap-2">
          {navlinks.map((link) => (
            <SidebarMenuItem key={link.route}>
              <SidebarMenuButton className="py-10 px-8 hover:bg-black" onClick={() => setSelectedLabel(link.label)}>
                <a href={link.route} className="flex items-center gap-2">
                  <Image src={link.icon} alt={`${link.label} icon`} width={25} height={30} className="w-10 h-10"/>
                  <span className="text-2xl text-white">{link.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <p className="text-lg font-semibold mt-4 items-center justify-center text-white">
                Selected: {selectedLabel || "None"}
      </p>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
  </SidebarProvider>
  
  </div>
);
}
