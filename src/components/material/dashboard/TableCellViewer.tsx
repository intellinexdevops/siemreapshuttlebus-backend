import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { z } from "zod";
import type { schema } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, IdCardIcon, MoveRight } from "lucide-react";

export default function TableCellViewer({ item, header = item.name }: { item: z.infer<typeof schema>; header?: string; }) {

    return (
        <Drawer direction={"right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.name}</DrawerTitle>
                    <DrawerDescription>
                        Showing detail information of a customer
                    </DrawerDescription>
                </DrawerHeader>


                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                    <form className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="amount">Amount</Label>
                                <div className="flex items-center gap-x-1">
                                    <CircleDollarSign size={18} />
                                    <p className="text-lg font-semibold text-neutral-700">{item.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="amount">Order Ref.</Label>
                                <div className="flex items-center gap-x-1">
                                    <IdCardIcon size={18} className="text-neutral-700" />
                                    <p className="text-lg font-semibold text-neutral-700">{item.order_ref}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-neutral-100">
                            <p className="mt-5 font-semibold underline mb-4">Order Summary</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Order</Label>
                                    <p className="text-sm font-medium text-neutral-700 line-clamp-1">{item.ticket_type}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Date/time</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.departure_date}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Passager</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.passager}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Trip</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.trip}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Payment Method</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.payment_method}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Direction</Label>
                                    <p className="text-sm font-medium text-neutral-700 flex items-center gap-x-2">{item.from} <MoveRight size={14} /> {item.to}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Direction</Label>
                                    <p className="text-sm font-medium text-neutral-700 flex items-center gap-x-2">{item.from} <MoveRight size={14} /> {item.to}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-neutral-100">
                            <p className="mt-5 font-semibold underline mb-4">Customer Information</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Name</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Phone</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.phone}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-4">
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Email Address</Label>
                                    <p className="text-sm font-medium text-neutral-700">{item.email}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label className="text-sm text-neutral-500 font-light" htmlFor="name">Special Request</Label>
                                    <p className="text-sm font-medium text-neutral-700 flex items-center gap-x-2">{item.special_request !== "" ? item.special_request : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
