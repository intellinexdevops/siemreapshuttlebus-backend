import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { z } from "zod";
import type { schema } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TableCellViewer({ item, header = item.title }: { item: z.infer<typeof schema>; header?: string; }) {

    return (
        <Drawer direction={"right"}>
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground w-fit px-0 text-left">
                    {header}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.title}</DrawerTitle>
                    <DrawerDescription>
                        Showing detail information of a customer
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Amount</Label>
                            <Input id="header" defaultValue={item.price} />
                        </div>
                        <div>
                            <div className="w-28 h-24">
                                <img src={item.url} className="w-full h-full rounded-md object-cover" alt="" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">Capacity</Label>
                                <p>{item.capacity}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={item.status ? 'Done' : 'In Progress'}>
                                    <SelectTrigger id="status" className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Done">Done</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Not Started">Not Started</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="target">Include</Label>
                                <ul>
                                    {item?.include?.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="limit">Exclude</Label>
                                <ul>
                                    {item?.exclude?.map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))}
                                </ul>
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
