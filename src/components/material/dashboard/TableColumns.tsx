import type { ColumnDef } from "@tanstack/react-table"
import type { z } from "zod"
import type { schema } from "./DataTable"
import DragHandle from "../DragHandle"
import { Checkbox } from "@/components/ui/checkbox"
import TableCellViewer from "./TableCellViewer"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDotsVertical } from "@tabler/icons-react"

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original._id} />,
    },
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'order_ref',
        header: 'Order Ref.',
        cell: ({ row }) => {
            return <TableCellViewer header={row.original.order_ref} item={row.original} />
        },
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => {
            return <TableCellViewer item={row.original} />
        },
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: "Email Address",
        cell: ({ row }) => (
            <div className="w-32">
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {row.original.email}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: 'phone',
        header: "Phone Number",
        cell: ({ row }) => {
            return <Badge variant="outline" className="text-muted-foreground px-1.5">{row.original.phone}</Badge>
        }
    },
    {
        accessorKey: "departure_date",
        header: "Departure Date",
        cell: ({ row }) => (
            <div>
                {row.original.departure_date}
            </div>
        ),
    },
    {
        accessorKey: "direction",
        header: "Direction",
        cell: ({ row }) => {
            return (
                <div>
                    <p>{row.original.from} - {row.original.to}</p>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <IconDotsVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

export default columns;