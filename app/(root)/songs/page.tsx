"use client"
//import Image from "next/image"
import Image from "next/image"
import { SidebarHandler } from "@/components/shared/SidebarContext"
import Appbar from "@/components/shared/AppSidebar"
import ButtonBar from "@/components/shared/ButtonBar"
import MenuComponent from "@/components/shared/MenuComponent"
import { MenuProvider } from "@/components/shared/Menuhandler"
import { ButtonProvider } from "@/components/shared/Button"
// import { useSidebarContext } from "@/components/shared/SidebarContext"
import { useEffect, useState } from "react"
// import { useButtonContext } from "@/components/shared/Button"
import { useMenuContext } from "@/components/shared/Menuhandler"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useButtonContext } from "@/components/shared/Button"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const fetchData = async () => {
//     const response = await fetch("http://localhost:5000/data");
//     return response.json()
// }

interface DataRow {
    label: string;
    value: number;
    image: string;
}

interface BarChartData {
    labels: string[]
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

interface PieChartData {
    labels: string[]
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

// interface ListData {
//     names: string[]
//     datasets: {
//         label: string;
//         data: number[];
//         image: string[];
//     }[];
// }

interface ListItem {
    album: string[];
    value: number[];
    image: string[];
}

export default function Songs() {
    return (
        <ButtonProvider>
        <MenuProvider>
            <PickPage />
        </MenuProvider>
        </ButtonProvider>
    )
}

export function PickPage() {
    const { selectedMenuItem } = useMenuContext();
    const { selectedButton } = useButtonContext();
    let url = "";
    let num = 0;
    console.log(selectedMenuItem);
    if (selectedMenuItem == "5") {
        url = "http://localhost:5000/data?file='main'&numItems=5&column_name='Times Played'";
        num = 5;
    }
    else if (selectedMenuItem == "10") {
        console.log("many men");
        url = "http://localhost:5000/data?file='main'&numItems=10&column_name='Times Played'";
        num = 10;
    }
    else if (selectedMenuItem == "15") {
        url = "http://localhost:5000/data?file='main'&numItems=15&column_name='Times Played'";
        num = 15;
    }
    else if (selectedMenuItem == "20") {
        url = "http://localhost:5000/data?file='main'&numItems=20&column_name='Times Played'";
        num = 20;
    }
    else if (selectedMenuItem == "30") {
        url = "http://localhost:5000/data?file='main'&numItems=30&column_name='Times Played'";
        num = 30;
    }
    else {
        url = "http://localhost:5000/data?file='main'&numItems=20&column_name='Times Played'";
        num = 20;
    }
    if (selectedButton == "Bar") {
        return <BarChart url={url} />;
    }
    else if (selectedButton == "Pie") {
        return <PieChart url={url} />;
    }
    else {
        return <ListChart url={url} num = {num}/>;
    }
}

const fetchData = async (url: string): Promise<DataRow[]> => {
    const response = await fetch(url);
    const data: DataRow[] = await response.json();
    const sortedData = data.sort((a, b) => b.value - a.value);  // Example: sorting by 'value' in descending order

    return sortedData;
    //return data;
};

export function BarChart({url} : {url: string}) {
    const [chartData, setChartData] = useState<BarChartData | null>(null);

    useEffect(() => {
        fetchData(url).then((data) => {
          setChartData({
            labels: data.map((row) => row.label),
            datasets: [
              {
                label: "Number of Listens",
                data: data.map((row) => row.value),
                 backgroundColor: "rgba(75, 192, 192, 0.6)" 
              },
            ],
          });
        });
      }, [url, chartData]);

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
                    <h1 className="text-2x1 font-bold mb-4">Song Data</h1>
                    {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
            </div>
            <div className="grid grid-rows-[1fr_1fr] h-screen bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) items-center justify-center gap-4">
                <ButtonBar />
                <MenuComponent />
            </div>
        </div>
    )
}

 // chatgpt
export function ListChart({ url, num }: { url: string, num: number }) {
    const [list, setList] = useState<ListItem[]>([]); // Ensure list is initialized
    console.log("in list");
    useEffect(() => {
        console.log("in effect");
        let isMounted = true;
        console.log("Fetching data from:", url);

        fetchData(url)
            .then((data) => {
                if (!isMounted) return; // Prevent updating after unmount
                console.log(data);
                setList(prevList => [
                    ...prevList,
                    {
                        album: data.map(row => row.label),
                        value: data.map(row => row.value),
                        image: data.map(row => row.image),
                    },
                ]);
            })
            .catch(error => console.error("Data fetch failed:", error));

        return () => {
            isMounted = false; // Cleanup function
        };
    });
    // const sizeFactor = Math.max(26-num,10);
    const imageSize = Math.max(30-num*2,50);
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr] h-screen gap-4">
            <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex items-center justify-center">
                <Layout />
            </div>
            <div className="bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col items-center text-white p-6 rounded-lg">
                    <h1 className="text-4xl font-bold mb-4">Top Songs</h1>
                    <ul className="space-y-4">
                        {list.length === 0 ? <p>Loading...</p> : 
                            list.slice(0,num).map((item, index) => (
                                <li key={index} className="flex items-center space-x-4 p-4 bg-black/40 rounded-lg">
                                    <span className="text-3xl font-bold text-white" style={{ fontSize: `${20}px`}}>#{index + 1}</span>
                                    <Image src={item.image[index]} alt={item.album[index]} width={imageSize} height={imageSize} className="rounded-lg"/>
                                    <div>
                                        <h2 className="text-xl font-semibold" style={{ fontSize: `${20}px`}}>{`${item.album[index]} - ${item.value[index]}`}</h2>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="grid grid-rows-[1fr_1fr] h-screen bg-linear-gradient(to right, #1a3c3d, #2f6a73, #2f3b52, #4c2a64) items-center justify-center gap-4">
                <ButtonBar />
                <MenuComponent />
            </div>
        </div>
    );
}

export function PieChart({url} : {url: string}) {
    const [chartData, setChartData] = useState<PieChartData | null>(null);
    useEffect(() => {
        fetchData(url).then((data) => {
          setChartData({
            labels: data.map((row) => row.label),
            datasets: [
              {
                label: "Number of Listens",
                data: data.map((row) => row.value),
                backgroundColor: data.map((_, index) => ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"][index % 6])

              },
            ],
          });
        });
      }, [url, chartData]);

      const options = {
        responsive: true,
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
                    <h1 className="text-2x1 font-bold mb-4">Song Data</h1>
                    {chartData ? <Pie data={chartData} options={options} /> : <p>Loading...</p>}
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