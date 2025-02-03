import { createContext, useState, useContext } from "react";

interface MenuContextType {
    selectedMenuItem: string
    setSelectedMenuItem: (value: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)
export function MenuProvider({ children }: { children: React.ReactNode}) {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
    return (
        <MenuContext.Provider value = {{selectedMenuItem, setSelectedMenuItem}}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenuContext(){
    const context = useContext(MenuContext)
    if (!context) throw new Error("useMenuContext must be used within a MenuProvider.")
    return context;
}