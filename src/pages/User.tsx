import CreateUserModal from "@/components/material/user/CreateUserModal"
import { UserCircle } from "lucide-react"

const User = () => {
    return (
        <div className="flex-1">
            <div className="border border-neutral-200 flex-1 px-6 py-4 rounded-lg flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-x-2 mb-1.5">
                        <div className="aspect-square bg-neutral-100 size-7 rounded flex items-center justify-center">
                            <UserCircle className="text-neutral-600" size={20} />
                        </div>
                        <h1 className="text-2xl text-neutral-700 font-semibold">User</h1>
                    </div>
                    <p className="text-sm text-neutral-400">Manage Your Transportation Service</p>
                </div>
                <div>
                    <CreateUserModal />
                </div>
            </div>
        </div>
    )
}

export default User