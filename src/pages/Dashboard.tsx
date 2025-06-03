
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useMemo } from "react";
import { DataTable } from "@/components/material/dashboard/DataTable";
// import data from "@/lib/data.json"
const Dashboard = () => {

    const transaction = useQuery(api.transactions.get);

    const {
        totalTransaction,
        totalPrice,
        transactionChangePercent,
        priceChangePercent
    } = useMemo(() => {
        if (!Array.isArray(transaction)) return {
            totalTransaction: 0,
            totalPrice: 0,
            transactionChangePercent: 0,
            priceChangePercent: 0,
        };

        const now = new Date();
        const last7Days = new Date(now);
        last7Days.setDate(now.getDate() - 7);

        const prev7Days = new Date(last7Days);
        prev7Days.setDate(last7Days.getDate() - 7);

        const recent = transaction.filter(t => new Date(t._creationTime) >= last7Days);
        const previous = transaction.filter(t => {
            const date = new Date(t._creationTime);
            return date >= prev7Days && date < last7Days;
        });

        const totalTransaction = recent.length;
        const totalPrice = recent.reduce((sum, item) => sum + (Number(item.total) || 0), 0);

        const prevTransaction = previous.length;
        const prevPrice = previous.reduce((sum, item) => sum + (Number(item.total) || 0), 0);

        const transactionChangePercent = ((totalTransaction - prevTransaction) / Math.max(prevTransaction, 1));
        const priceChangePercent = ((totalPrice - prevPrice) / Math.max(prevPrice, 1));

        return {
            totalTransaction,
            totalPrice,
            transactionChangePercent,
            priceChangePercent,
        };
    }, [transaction]);

    // console.log((transaction ?? []).map(t => ({ ...t, _id: String(t._id) })))

    return (
        <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-x-6">
                <div className="p-6 px-8 rounded-lg border border-neutral-100 bg-white flex flex-col gap-x-2.5 shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <div className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-500/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="var(--color-blue-500)" fillRule="evenodd" d="M13 3v1.27a.75.75 0 0 0 1.5 0V3h2.25A2.25 2.25 0 0 1 19 5.25v2.628a.75.75 0 0 1-.5.707a1.5 1.5 0 0 0 0 2.83c.3.106.5.39.5.707v2.628A2.25 2.25 0 0 1 16.75 17H14.5v-1.27a.75.75 0 0 0-1.5 0V17H3.25A2.25 2.25 0 0 1 1 14.75v-2.628c0-.318.2-.601.5-.707a1.5 1.5 0 0 0 0-2.83a.75.75 0 0 1-.5-.707V5.25A2.25 2.25 0 0 1 3.25 3H13Zm1.5 4.396a.75.75 0 0 0-1.5 0v1.042a.75.75 0 0 0 1.5 0V7.396Zm0 4.167a.75.75 0 0 0-1.5 0v1.041a.75.75 0 0 0 1.5 0v-1.041ZM6 10.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm0 2.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
                            </div>
                            <p className="text-sm text-neutral-400 font-light flex-1">Total Booking</p>
                        </div>
                        <div className="flex items-center gap-x-1 bg-blue-50 px-2.5 border border-blue-200 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="text-blue-500" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8c-1.5 0-2.3 1.4-1.9 2.5l-3.6 3.6c-.3-.1-.7-.1-1 0l-2.6-2.6c.4-1.1-.4-2.5-1.9-2.5c-1.4 0-2.3 1.4-1.9 2.5L3.5 16c-1.1-.3-2.5.5-2.5 2c0 1.1.9 2 2 2c1.4 0 2.3-1.4 1.9-2.5l4.5-4.6c.3.1.7.1 1 0l2.6 2.6c-.3 1 .5 2.5 2 2.5s2.3-1.4 1.9-2.5l3.6-3.6c1.1.3 2.5-.5 2.5-1.9c0-1.1-.9-2-2-2m-6 1l.9-2.1L18 6l-2.1-.9L15 3l-.9 2.1L12 6l2.1.9L15 9M3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9l.5 2Z" /></svg>
                            <p className="text-xs text-blue-500 font-medium">{transactionChangePercent.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2.5 mt-3">
                        <p className="text-4xl text-neutral-700 font-bold">{totalTransaction}</p>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <span className="text-sm text-neutral-700">Both Bus ticket and Transportation</span>
                        <span className="text-xs font-light text-neutral-400">From last 7 days</span>
                    </div>
                </div>
                <div className="p-6 px-8 rounded-lg bg-white border border-neutral-100 flex flex-col gap-x-2.5 shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <div className="w-6 h-6 flex items-center justify-center rounded-md bg-orange-500/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="var(--color-orange-500)" d="M2 6.75C2 5.784 2.784 5 3.75 5h13.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 17.25 17H3.75A1.75 1.75 0 0 1 2 15.25v-8.5Zm3-.5v1a.75.75 0 0 1-.75.75h-1v1.5h1A2.25 2.25 0 0 0 6.5 7.25v-1H5Zm5.5 7.25a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5Zm-7.25.5h1a.75.75 0 0 1 .75.75v1h1.5v-1a2.25 2.25 0 0 0-2.25-2.25h-1V14Zm12.75.75a.75.75 0 0 1 .75-.75h1v-1.5h-1a2.25 2.25 0 0 0-2.25 2.25v1H16v-1Zm0-7.5v-1h-1.5v1a2.25 2.25 0 0 0 2.25 2.25h1V8h-1a.75.75 0 0 1-.75-.75ZM4.401 18.5A2.999 2.999 0 0 0 7 20h10.25A4.75 4.75 0 0 0 22 15.25V10a3 3 0 0 0-1.5-2.599v7.849a3.25 3.25 0 0 1-3.25 3.25H4.401Z" /></svg>
                            </div>
                            <p className="text-sm text-neutral-400 flex-1">Total Income</p>
                        </div>
                        <div className="flex items-center gap-x-1 bg-blue-50 px-2.5 border border-blue-200 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="text-blue-500" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8c-1.5 0-2.3 1.4-1.9 2.5l-3.6 3.6c-.3-.1-.7-.1-1 0l-2.6-2.6c.4-1.1-.4-2.5-1.9-2.5c-1.4 0-2.3 1.4-1.9 2.5L3.5 16c-1.1-.3-2.5.5-2.5 2c0 1.1.9 2 2 2c1.4 0 2.3-1.4 1.9-2.5l4.5-4.6c.3.1.7.1 1 0l2.6 2.6c-.3 1 .5 2.5 2 2.5s2.3-1.4 1.9-2.5l3.6-3.6c1.1.3 2.5-.5 2.5-1.9c0-1.1-.9-2-2-2m-6 1l.9-2.1L18 6l-2.1-.9L15 3l-.9 2.1L12 6l2.1.9L15 9M3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9l.5 2Z" /></svg>
                            <p className="text-xs text-blue-500 font-medium">{priceChangePercent.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2.5 mt-3">
                        <p className="text-4xl font-bold text-neutral-700">${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <span className="text-sm text-neutral-700">Your total income</span>
                        <span className="text-xs font-light text-neutral-400">From last 30 days</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 overflow-auto">
                {transaction?.length ? (
                    <DataTable data={(transaction ?? []).map(t => ({ ...t, _id: String(t._id) }))} />
                ) : (<div>
                    Loading record...
                </div>)}
            </div>
        </div>
    )
}

export default Dashboard