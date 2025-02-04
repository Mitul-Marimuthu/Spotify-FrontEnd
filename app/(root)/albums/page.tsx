"use client"
//import Image from "next/image"
import { SidebarHandler } from "@/components/shared/SidebarContext"
import Appbar from "@/components/shared/AppSidebar"
import ButtonBar from "@/components/shared/ButtonBar"
import MenuComponent from "@/components/shared/MenuComponent"
import { MenuProvider } from "@/components/shared/Menuhandler"
// import { useSidebarContext } from "@/components/shared/SidebarContext"
import { useEffect, useState } from "react"
// import { useButtonContext } from "@/components/shared/Button"
import { useMenuContext } from "@/components/shared/Menuhandler"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const fetchData = async () => {
//     const response = await fetch("http://localhost:5000/data");
//     return response.json()
// }

export function Charts() {
     // useSidebarContext();
    // const { selectedButton } = useButtonContext();
    // return selectedButton;
}

interface DataRow {
    label: string;
    value: number;
}

interface ChartData {
    labels: string[]
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

export default function Albums() {
    return (
        <MenuProvider>
            <Page />
        </MenuProvider>
    )
}

export function Page() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const { selectedMenuItem } = useMenuContext();
    let url = "";
    console.log(selectedMenuItem);
    if (selectedMenuItem == "5") {
        url = "http://localhost:5000/data?file='albums'&numItems=5&column_name='Number of Songs'";
    }
    else if (selectedMenuItem == "10") {
        console.log("many men");
        url = "http://localhost:5000/data?file='albums'&numItems=10&column_name='Number of Songs'";
    }
    else if (selectedMenuItem == "15") {
        url = "http://localhost:5000/data?file='albums'&numItems=15&column_name='Number of Songs'";
    }
    else if (selectedMenuItem == "20") {
        url = "http://localhost:5000/data?file='albums'&numItems=20&column_name='Number of Songs'";
    }
    else if (selectedMenuItem == "30") {
        url = "http://localhost:5000/data?file='albums'&numItems=30&column_name='Number of Songs'";
    }
    else {
        url = "http://localhost:5000/data?file='albums'&numItems=20&column_name='Number of Songs'";
    }
    const fetchData = async (): Promise<DataRow[]> => {
        const response = await fetch(url);
        const data: DataRow[] = await response.json();
        const sortedData = data.sort((a, b) => b.value - a.value);  // Example: sorting by 'value' in descending order

        return sortedData;
        //return data;
    };

    useEffect(() => {
        fetchData().then((data) => {
          setChartData({
            labels: data.map((row) => row.label),
            datasets: [
              {
                label: "Number of Songs Listened To",
                data: data.map((row) => row.value),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          });
        });
      });

      const options = {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: '#FFD700', // Change color of X-axis labels
            },
          },
          y: {
            ticks: {
              color: '#FFD700', // Change color of Y-axis labels
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#FFD700', // Change color of legend text
            },
          },
          tooltip: {
            bodyColor: '#FFD700', // Change color of tooltip text
          },
        },
      };

    return (
            <div className="grid grid-cols-[1fr_3fr_1fr] h-screen gap-4">
            <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex items-center justify-center">
                <Layout />
            </div>
            <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex flex-col gap-6 items-center justify-center">
                    <h1 className="text-2x1 font-bold mb-4">Album Data</h1>
                    {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
            </div>
            <div className="grid grid-rows-[1fr_1fr] h-screen bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) items-center justify-center gap-4">
                <ButtonBar />
                <MenuComponent />
            </div>
        </div>
    )
}

export function Layout() {
    return (
        <SidebarHandler>
          <div className="flex max-h-screen">
          <Appbar />
          <main className="flex-1 p-6 overflow-hidden">
          </main>
          </div>
        </SidebarHandler>
      )
}