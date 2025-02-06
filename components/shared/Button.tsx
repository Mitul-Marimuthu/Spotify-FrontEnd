import { createContext, useContext, useState, useEffect } from "react";

interface ButtonContextType {
    selectedButton: string,
    setSelectedButton: (value: string) => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);
export function ButtonProvider({ children }: {children: React.ReactNode}) {
    const [selectedButton, setSelectedButton] = useState("");
    useEffect(() => {
        // Ensure we are in a browser environment (checking for `window`)
        if (typeof window !== "undefined") {
          const storedButton = localStorage.getItem("selectedButton");
          if (storedButton) {
            setSelectedButton(storedButton); // Load stored label from localStorage
          }
        }
      }, []);
    
      // Persist selectedLabel to localStorage when it changes
      useEffect(() => {
        if (typeof window !== "undefined" && selectedButton) {
          localStorage.setItem("selectedButton", selectedButton);
        }
      }, [selectedButton]);
    return (
        <ButtonContext.Provider value={{ selectedButton, setSelectedButton }}>
            {children}
        </ButtonContext.Provider>
    );
}

export function useButtonContext() {
    const context = useContext(ButtonContext);
    if (!context) throw new Error("useButtonContext must be used within a ButtonProvider");
    return context;
}