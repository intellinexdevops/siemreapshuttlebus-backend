
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import supabase from "@/utils/supabase"
import { IconPhotoPlus } from "@tabler/icons-react"
import { api } from "../../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { PlusIcon, Trash2 } from 'lucide-react'
import React, { type ChangeEvent } from "react"

function CreateNewModal() {

    const [title, setTitle] = React.useState<string>('')
    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const [capacity, setCapacity] = React.useState<string>('')
    const handleChangeCapacity = (e: ChangeEvent<HTMLInputElement>) => {
        setCapacity(e.target.value);
    }
    const [price, setPrice] = React.useState<string>('')
    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    }

    const [include, setInclude] = React.useState<string[]>(() => ['']);
    const addIncludeItem = () => {
        setInclude(prev => [...prev, '']);
    };

    const removeIncludeItem = (index: number) => {
        setInclude(prev => prev.filter((_, i) => i !== index));
    };

    const updateIncludeItem = (index: number, value: string) => {
        setInclude(prev => prev.map((item, i) => i === index ? value : item));
    };


    const [exlucde, setExclude] = React.useState<string[]>(() => ['']);
    const addExclude = () => {
        setExclude(prev => [...prev, ''])
    }

    const removeExclude = (index: number) => {
        setExclude(prev => prev.filter((_, i) => i !== index));
    }

    const updateExclude = (index: number, value: string) => {
        setExclude(prev => prev.map((item, i) => i === index ? value : item))
    }

    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.transportation.generateUploadUrl);
    const createTransportation = useMutation(api.transportation.createTransportation);
    const [imageFile, setImageFile] = React.useState<File | undefined>();
    const handleOnSelectImageChage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            // console.log(file);
            // const { data, error } = await supabase.storage
            //     .from('siemreapshuttlebus')
            //     .upload(`public/${file.name}`, file);
            // console.error(error);
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            // setImageUrl(data?.fullPath);
        }
    }

    const handleCancel = async () => {
        // if (imageFile) {
        //     const { data, error } = await supabase.storage.from('siemreapshuttlebus').remove([`public/${imageFile.name}`]);
        //     console.log({ data, error })
        //     setImageUrl(undefined)
        //     setImageFile(undefined)
        // }
    }

    const handleCreate = async () => {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": imageFile!.type },
            body: imageFile,
        });
        const { storageId } = await result.json();

        await createTransportation({
            title,
            capacity,
            price: parseFloat(price),
            status: 1,
            storageId,
            exclude: exlucde,
            include: include
        });

    }

    return (
        <Dialog onOpenChange={handleCancel}>
            <div>
                <DialogTrigger asChild>
                    <Button>
                        <PlusIcon />
                        <span>New Transport.</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>Add new Transportation</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-8">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title<span className='text-red-500'>*</span></Label>
                            <Input value={title} onChange={handleChangeTitle} id="name-1" name="title" placeholder='Enter title' />
                        </div>
                        {/* <div className="grid gap-3">
                            <Label htmlFor="username-1">Description</Label>
                            <Input id="username-1" name="description" placeholder='Enter description' />
                        </div> */}

                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Capacity<span className='text-red-500'>*</span></Label>
                            <Input id="username-1" value={capacity} onChange={handleChangeCapacity} name="capacity" placeholder='E.g. 2-6 Pax' />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Price ($)<span className='text-red-500'>*</span></Label>
                            <Input value={price} onChange={handleChangePrice} id="username-1" name="price" placeholder='USD 0.00' />
                        </div>

                        <div className="col-span-2 border-t pt-4 border-neutral-100">
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="target">Include</Label>
                                    <Button size='sm' variant='ghost' onClick={addIncludeItem}>
                                        <PlusIcon />
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
                            <div className="flex flex-col mt-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="target">Exclude</Label>
                                    <Button size='sm' variant='ghost' onClick={addExclude}>
                                        <PlusIcon />
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
                        <div className="">
                            {previewUrl && (
                                <div className="mb-2 rounded-md overflow-hidden w-[120px] h-[100px]">
                                    <img src={previewUrl} width={512} height={512} className="w-full h-full object-cover" loading="lazy" alt={imageFile?.name} />
                                </div>
                            )}
                            <input type="file" onChange={handleOnSelectImageChage} ref={imageInputRef} hidden />
                            <Button className="" variant='outline' onClick={() => imageInputRef.current?.click()}>
                                <IconPhotoPlus />
                                Select Image
                            </Button>
                        </div>

                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleCreate}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default CreateNewModal