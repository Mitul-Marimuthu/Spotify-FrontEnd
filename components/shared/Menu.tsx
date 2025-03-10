import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { useMenuContext } from "./Menuhandler"

  export default function Menu() {
    const { selectedMenuItem, setSelectedMenuItem }= useMenuContext();
    return(
        <div>
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-yellow-500">Number of items</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel onClick={() => {setSelectedMenuItem("5"); window.location.reload();}}>5</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {window.location.reload(); setSelectedMenuItem("10");}}>10</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {setSelectedMenuItem("15"); window.location.reload();}}>15</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {window.location.reload(); setSelectedMenuItem("20"); }}>20</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {setSelectedMenuItem("30"); window.location.reload();}}>30</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p className="text-lg font-semibold mt-4">
            Selected: {selectedMenuItem || "None"}
        </p>
        </div>
    );


  }