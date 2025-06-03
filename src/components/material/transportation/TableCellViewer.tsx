import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { z } from "zod";
import type { schema } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { type ChangeEvent } from "react";
import { Switch } from "@/components/ui/switch";
import { EarthIcon, LockIcon, PlusIcon, Trash2 } from "lucide-react";

export default function TableCellViewer({ item, header = item.title }: { item: z.infer<typeof schema>; header?: string; }) {

    const [amount, setAmount] = React.useState<string>(() => String(item.price));
    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }

    const [capacity, setCapacity] = React.useState<string>(() => item.capacity ?? '');
    const handleChangeCapacity = (e: ChangeEvent<HTMLInputElement>) => {
        setCapacity(e.target.value)
    }

    const [status, setStatus] = React.useState<number>(() => item.status);
    const handleChangeStatus = (e: boolean) => {
        setStatus(e ? 1 : 0)
    }

    const [include, setInclude] = React.useState<string[]>(() => item.include ?? []);
    const addIncludeItem = () => {
        setInclude(prev => [...prev, '']);
    };

    const removeIncludeItem = (index: number) => {
        setInclude(prev => prev.filter((_, i) => i !== index));
    };

    const updateIncludeItem = (index: number, value: string) => {
        setInclude(prev => prev.map((item, i) => i === index ? value : item));
    };


    const [exlucde, setExclude] = React.useState<string[]>(() => item.exclude ?? []);
    const addExclude = () => {
        setExclude(prev => [...prev, ''])
    }

    const removeExclude = (index: number) => {
        setExclude(prev => prev.filter((_, i) => i !== index));
    }

    const updateExclude = (index: number, value: string) => {
        setExclude(prev => prev.map((item, i) => i === index ? value : item))
    }

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
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm border-t pt-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex space-x-4">
                            <div className="w-30 h-24">
                                <img src={item.url} className="w-full h-full rounded-md object-cover" alt="" />
                            </div>
                            <div className="mt-2 flex flex-col space-y-2">
                                <Button size="sm" variant='outline'>Upload Photo</Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <Label htmlFor="header">Amount</Label>
                            <div className="relative">
                                <Input min={0} required type="number" id="header" onChange={handleChangeAmount} value={amount} defaultValue={amount} />
                                <span className="absolute right-4 -translate-y-1/2 top-1/2 text-neutral-500">USD</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">Capacity</Label>
                                <Input value={capacity} onChange={handleChangeCapacity} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center space-x-2">
                                    <Switch checked={status === 1} onCheckedChange={handleChangeStatus} id="status" />
                                    <Label htmlFor="status">
                                        {status === 1 ? <EarthIcon size={16} /> : <LockIcon size={16} />}
                                        {status === 1 ? 'Public' : 'Private'}
                                    </Label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="target">Include</Label>
                                    <Button size='sm' variant='ghost' onClick={addIncludeItem}>
                                        <PlusIcon />
                                        New
                                    </Button>
                                </div>
                                <ul>
                                    {include?.map((item, index) => (
                                        <div className="flex items-center space-x-2 mt-2" key={index}>
                                            <Input value={item} onChange={(e) => updateIncludeItem(index, e.target.value)} />
                                            <Button variant='ghost' onClick={() => removeIncludeItem(index)}>
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="target">Exclude</Label>
                                    <Button size='sm' variant='ghost' onClick={addExclude}>
                                        <PlusIcon />
                                        New
                                    </Button>
                                </div>
                                <ul>
                                    {exlucde?.map((item, index) => (
                                        <div className="flex items-center space-x-2 mt-2" key={index}>
                                            <Input value={item} onChange={(e) => updateExclude(index, e.target.value)} />
                                            <Button variant='ghost' onClick={() => removeExclude(index)}>
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
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
