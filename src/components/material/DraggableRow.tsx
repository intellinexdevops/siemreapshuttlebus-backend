import { useSortable } from "@dnd-kit/sortable"
import { flexRender, type Row } from "@tanstack/react-table"
import { TableCell, TableRow } from "../ui/table"
import { CSS } from "@dnd-kit/utilities"

export default function DraggableRow<TData extends { _id: string }>({
    row
}: {
    row: Row<TData>
}) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original._id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}