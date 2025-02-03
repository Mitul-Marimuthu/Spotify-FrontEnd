import Menu from "./Menu";
import { MenuProvider } from "./Menuhandler";

export default function MenuComponent() {
    return (
        <MenuProvider>
            <Menu />
        </MenuProvider>
    )
}