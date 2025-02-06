import { useButtonContext } from "./Button";
import { Button } from "../ui/button";
import { ButtonProvider } from "./Button";

export default function ButtonBar() {
    return (
       <ButtonProvider> 
           <ButtonSelection />
       </ButtonProvider>
    );
   }

export function ButtonSelection() {
    const { selectedButton, setSelectedButton } = useButtonContext();
    return (
        <div className="flex flex-col items-center gap-4">
            <Button className="w-40 bg-gray-500 hove:bg-blue-500 text-white"
            onClick={ () => {setSelectedButton("Bar"); window.location.reload(); }}
            >
                Bar Graph
            </Button>
            <Button
                className="w-40 bg-gray-500 hover:bg-green-500 text-white"
                onClick={() => {setSelectedButton("Pie"); window.location.reload();}}
            >
                Pie Chart
            </Button>
            <Button
                className="w-40 bg-gray-500 hover:bg-red-500 text-white"
                onClick={() => {setSelectedButton("List"); window.location.reload();}}
            >
                List
            </Button>
            <p className="text-lg font-semibold mt-4">
                Selected: {selectedButton || "None"}
            </p>
        </div>
    )
}