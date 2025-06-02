
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
const Dashboard = () => {

    const transaction = useQuery(api.booking.get);

    const totalPrice = Array.isArray(transaction)
        ? transaction.reduce((sum, item) => sum + (Number(item.total) || 0), 0)
        : 0


    return (
        <div className="">
            <div className="grid grid-cols-3 gap-x-6">
                <div className="p-4 rounded-lg bg-white flex gap-x-2.5 shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
                    <div className="w-11 h-11 flex items-center justify-center rounded-md bg-blue-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="var(--color-blue-500)" fillRule="evenodd" d="M13 3v1.27a.75.75 0 0 0 1.5 0V3h2.25A2.25 2.25 0 0 1 19 5.25v2.628a.75.75 0 0 1-.5.707a1.5 1.5 0 0 0 0 2.83c.3.106.5.39.5.707v2.628A2.25 2.25 0 0 1 16.75 17H14.5v-1.27a.75.75 0 0 0-1.5 0V17H3.25A2.25 2.25 0 0 1 1 14.75v-2.628c0-.318.2-.601.5-.707a1.5 1.5 0 0 0 0-2.83a.75.75 0 0 1-.5-.707V5.25A2.25 2.25 0 0 1 3.25 3H13Zm1.5 4.396a.75.75 0 0 0-1.5 0v1.042a.75.75 0 0 0 1.5 0V7.396Zm0 4.167a.75.75 0 0 0-1.5 0v1.041a.75.75 0 0 0 1.5 0v-1.041ZM6 10.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm0 2.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{transaction?.length}</p>
                        <p className="text-xs text-neutral-500">Total Booking</p>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-white flex gap-x-2.5 shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
                    <div className="w-11 h-11 flex items-center justify-center rounded-md bg-orange-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--color-orange-500)" d="M2 6.75C2 5.784 2.784 5 3.75 5h13.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 17.25 17H3.75A1.75 1.75 0 0 1 2 15.25v-8.5Zm3-.5v1a.75.75 0 0 1-.75.75h-1v1.5h1A2.25 2.25 0 0 0 6.5 7.25v-1H5Zm5.5 7.25a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5Zm-7.25.5h1a.75.75 0 0 1 .75.75v1h1.5v-1a2.25 2.25 0 0 0-2.25-2.25h-1V14Zm12.75.75a.75.75 0 0 1 .75-.75h1v-1.5h-1a2.25 2.25 0 0 0-2.25 2.25v1H16v-1Zm0-7.5v-1h-1.5v1a2.25 2.25 0 0 0 2.25 2.25h1V8h-1a.75.75 0 0 1-.75-.75ZM4.401 18.5A2.999 2.999 0 0 0 7 20h10.25A4.75 4.75 0 0 0 22 15.25V10a3 3 0 0 0-1.5-2.599v7.849a3.25 3.25 0 0 1-3.25 3.25H4.401Z" /></svg>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">$ {totalPrice.toFixed(2)}</p>
                        <p className="text-xs text-neutral-500">Total Income</p>
                    </div>
                </div>
            </div>

            {transaction?.length && transaction.map((item, index) => (
                <div key={index}>
                    {item.email}
                </div>
            ))}
        </div>
    )
}

export default Dashboard