import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface CustomerType {
    id: string;
    name: string;
}

interface TransactionType {
    id: string;
    customer_id: number;
    amount: number;
    date: string;
}

const TableOfCustomers = () => {
    const [searchedName, setSearchedName] = useState<string>('');
    const [searchedAmount, setSearchedAmount] = useState<string>('');

    const { data: dataCustomers, isLoading: loadingCustomers } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const response = await axios.get<CustomerType[]>(
                'http://localhost:3000/customers'
            );
            return response.data;
        },
    });

    const { data: dataTransactions, isLoading: loadingTransactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await axios.get<TransactionType[]>(
                'http://localhost:3000/transactions'
            );
            return response.data;
        },
    });

    if (loadingCustomers || loadingTransactions) return <div>Loading...</div>;
    if (!dataCustomers || !dataTransactions) return <div>No data available</div>;

    const filteredCustomers = dataCustomers.filter((customer) => {
        return customer.name.toLowerCase().includes(searchedName.toLowerCase());
    });

    const filteredTransactions = dataTransactions.filter((transaction) => {
        return transaction.amount.toString().includes(searchedAmount);
    });

    return (
        <div className=' overflow-auto'>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-5'>
                <div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                        </div>
                        <input
                            type='text'
                            value={searchedName}
                            onChange={(e) => setSearchedName(e.target.value)}
                            id='table-search-products'
                            className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus-visible:outline-none'
                            placeholder='Search for customers'
                        />
                    </div>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
                            <svg
                                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                        </div>
                        <input
                            type='text'
                            value={searchedAmount}
                            onChange={(e) => setSearchedAmount(e.target.value)}
                            id='table-search-categories'
                            className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus-visible:outline-none'
                            placeholder='Search for amount'
                        />
                    </div>
                </div>
                <div className='max-h-[50vh] overflow-scroll'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='px-6 py-3 text-lg'>
                                    Customer Name
                                </th>
                                <th scope='col' className='px-6 py-3 text-lg'>
                                    Transactions Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedName.length === 0 && searchedAmount.length === 0
                                ? // Default view: no search
                                dataCustomers.map((customer) => {
                                    const customerTransactions = dataTransactions.filter(
                                        (trans) => trans.customer_id === +customer.id
                                    );
                                    return customerTransactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#222831] hover:text-white cursor-pointer'
                                        >
                                            <td className='px-6 py-4 font-semibold '>
                                                {customer.name}
                                            </td>
                                            <td className='px-6 py-4 font-semibold '>
                                                {transaction.amount}
                                            </td>
                                        </tr>
                                    ));
                                })
                                : searchedName.length > 0
                                    ? // Customer name search
                                    filteredCustomers.map((customer) => {
                                        const customerTransactions = dataTransactions.filter(
                                            (trans) => trans.customer_id === +customer.id
                                        );
                                        return customerTransactions.map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#222831] hover:text-white cursor-pointer'
                                            >
                                                <td className='px-6 py-4 font-semibold '>
                                                    {customer.name}
                                                </td>
                                                <td className='px-6 py-4 font-semibold '>
                                                    {transaction.amount}
                                                </td>
                                            </tr>
                                        ));
                                    })
                                    : // Transaction amount search
                                    filteredTransactions.map((transaction) => {
                                        const customer = dataCustomers.find(
                                            (cust) => cust.id === transaction.customer_id.toString()
                                        );
                                        return (
                                            <tr
                                                key={transaction.id}
                                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#222831] hover:text-white cursor-pointer'
                                            >
                                                <td className='px-6 py-4 font-semibold '>
                                                    {customer ? customer.name : 'Unknown'}
                                                </td>
                                                <td className='px-6 py-4 font-semibold '>
                                                    {transaction.amount}
                                                </td>
                                            </tr>
                                        );
                                    })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableOfCustomers;