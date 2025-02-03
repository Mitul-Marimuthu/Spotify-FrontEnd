import { useContext, createContext, useState, useEffect } from "react";

interface SidebarContextType {
    selectedLabel: string,
    setSelectedLabel: (value: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export function SidebarHandler( {children}: {children: React.ReactNode}) {
    const [selectedLabel, setSelectedLabel] = useState<string>("")
    useEffect(() => {
        // Ensure we are in a browser environment (checking for `window`)
        if (typeof window !== "undefined") {
          const storedLabel = localStorage.getItem("selectedLabel");
          if (storedLabel) {
            setSelectedLabel(storedLabel); // Load stored label from localStorage
          }
        }
      }, []);
    
      // Persist selectedLabel to localStorage when it changes
      useEffect(() => {
        if (typeof window !== "undefined" && selectedLabel) {
          localStorage.setItem("selectedLabel", selectedLabel);
        }
      }, [selectedLabel]);
    return (
        <SidebarContext.Provider value = {{selectedLabel, setSelectedLabel}}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebarContext() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSideBarContext must be used within a SidebarProvider");
    return context;
}