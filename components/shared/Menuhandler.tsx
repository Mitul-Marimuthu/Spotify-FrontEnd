import { createContext, useState, useContext, useEffect } from "react";

interface MenuContextType {
    selectedMenuItem: string
    setSelectedMenuItem: (value: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)
export function MenuProvider({ children }: { children: React.ReactNode}) {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
    useEffect(() => {
        // Ensure we are in a browser environment (checking for `window`)
        if (typeof window !== "undefined") {
          const storedMenuItem = localStorage.getItem("selectedMenuItem");
          if (storedMenuItem) {
            setSelectedMenuItem(storedMenuItem); // Load stored label from localStorage
          }
        }
      }, []);
    
      // Persist selectedLabel to localStorage when it changes
      useEffect(() => {
        if (typeof window !== "undefined" && selectedMenuItem) {
          localStorage.setItem("selectedMenuItem", selectedMenuItem);
        }
      }, [selectedMenuItem]);
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