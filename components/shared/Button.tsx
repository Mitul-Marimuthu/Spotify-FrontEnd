import { createContext, useContext, useState } from "react";

interface ButtonContextType {
    selectedButton: string,
    setSelectedButton: (value: string) => void;
}

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);
export function ButtonProvider({ children }: {children: React.ReactNode}) {
    const [selectedButton, setSelectedButton] = useState("");
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