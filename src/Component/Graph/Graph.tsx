import axios from "axios"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

interface TransactionData {
    date: string;
    amount: number;
    customer_id: number;  // Add this line
}

interface CustomerData {
    id: number;
    name: string;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Graph() {
    const [userTransData, setUserTransData] = useState<TransactionData[]>([])
    const [userCustData, setUserCustData] = useState<CustomerData[]>([])
    const [customerId, setCustomerId] = useState<number | null>(null)

    console.log(customerId);

    function fetchTransData() {
        axios.get('http://localhost:3000/transactions')
            .then(({ data }) => setUserTransData(data))
            .catch((err) => console.log(err))
    }

    function fetchCustData() {
        axios.get('http://localhost:3000/customers')
            .then(({ data }) => setUserCustData(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTransData();
        fetchCustData();
    }, [])

    const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerId(e.target.value === "" ? null : Number(e.target.value));
    };

    const filteredTransData = customerId
        ? userTransData.filter((data) => data.customer_id === customerId)
        : userTransData;

    const chartData = {
        labels: filteredTransData.map((data) => data.date),
        datasets: [
            {
                label: 'Transaction Amount',
                data: filteredTransData.map((data) => data.amount),
                borderColor: '#85bb65',
                backgroundColor: '#85bb65',
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    }

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: '#FFF'
                }
            },
            y: {
                ticks: {
                    color: '#FFF',
                    font: {
                        size: 14 // Increase this value to make y-axis labels bigger
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FFF',
                    font: {
                        size: 14 // Increase this value to make legend labels bigger
                    }
                }
            }
        },
    }
    return (
        <>
            <form className="max-w-sm">
                <select
                    onChange={handleCustomerChange}
                    value={customerId === null ? "" : customerId.toString()}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" >Choose customer Name</option>
                    {userCustData.map((data) => (
                        <option value={data.id} key={data.id}>{data.name}</option>
                    ))}
                </select>
            </form>
            <div className="w-full pb-7">
                <Line data={chartData} options={chartOptions} />
            </div>
        </>
    )
}

export default Graph