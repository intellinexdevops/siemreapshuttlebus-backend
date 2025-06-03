import type { ColumnDef } from "@tanstack/react-table";
import type { z } from "zod";
import type { schema } from "./DataTable";
import DragHandle from "../DragHandle";
import { Checkbox } from "@/components/ui/checkbox";
import TableCellViewer from "./TableCellViewer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign } from "lucide-react";

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original._id} />
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
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <TableCellViewer item={row.original} />
    },
    {
        accessorKey: "url",
        header: "Photo",
        cell: ({ row }) => <div className="h-[70px] w-[100px]">
            <img src={row.original.url} className="w-full h-full object-cover rounded-md" alt={row.original.title} />
        </div>
    },
    {
        accessorKey: "price",
        header: "Price per Pax",
        cell: ({ row }) => <div>
            <Badge variant="outline" >
                <CircleDollarSign />
                {row.original.price.toFixed(2)}
            </Badge>
        </div>
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
        cell: ({ row }) => <div>{row.original.capacity}</div>
    },
    {
        accessorKey: "_creationTime",
        header: "Creation time",
        cell: ({ row }) => <div>{row.original._creationTime}</div>
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