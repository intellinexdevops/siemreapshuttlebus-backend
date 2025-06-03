import { Button } from "@/components/ui/button"
import { api } from "../../convex/_generated/api"
import { useQuery } from "convex/react"
import { BusIcon, PlusIcon } from "lucide-react"
import DataTable, { schema } from "@/components/material/transportation/DataTable"
import type { z } from "zod"


const Transportation = () => {

    const transportation = useQuery(api.transportation.get);

    const data: z.infer<typeof schema>[] = (transportation ?? []).map(t => ({ ...t, _id: String(t._id), url: t.url ?? undefined }))

    return (
        <div className="flex-1">
            <div className="border border-neutral-200 flex-1 px-6 py-4 rounded-lg flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-x-2 mb-1.5">
                        <div className="aspect-square bg-neutral-100 size-7 rounded flex items-center justify-center">
                            <BusIcon className="text-neutral-600" size={20} />
                        </div>
                        <h1 className="text-2xl text-neutral-700 font-semibold">Transportation</h1>
                    </div>
                    <p className="text-sm text-neutral-400">Manage Your Transportation Service</p>
                </div>
                <div>
                    <Button>
                        <PlusIcon />
                        <span>New Transport.</span>
                    </Button>
                </div>
            </div>
            <div className="mt-6">
                {data.length ? (
                    <DataTable data={data} />
                ) : (<div>
                    Loading record...
                </div>)}
            </div>
        </div>
    )
}

export default Transportation