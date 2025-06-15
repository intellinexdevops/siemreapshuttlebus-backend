// Copyright 2025 chenterphai
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


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
import { PlusIcon } from 'lucide-react'

function CreateUserModal() {


    // const imageInputRef = React.useRef<HTMLInputElement>(null);
    // const [imageFile, setImageFile] = React.useState<File | undefined>();
    // const [imageUrl, setImageUrl] = React.useState<string | undefined>();
    // const handleOnSelectImageChage = async (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const file = e.target.files[0]
    //         console.log(file);
    //         const { data, error } = await supabase.storage
    //             .from('siemreapshuttlebus')
    //             .upload(`public/${file.name}`, file);
    //         console.error(error);
    //         setImageFile(file);
    //         setImageUrl(data?.fullPath);
    //     }
    // }

    const handleCancel = async () => {
        // if (imageFile) {
        //     const { data, error } = await supabase.storage.from('siemreapshuttlebus').remove([`public/${imageFile.name}`]);
        //     console.log({ data, error })
        //     setImageUrl(undefined)
        //     setImageFile(undefined)
        // }
    }

    return (
        <Dialog onOpenChange={handleCancel}>
            <form>
                <DialogTrigger asChild>
                    <Button>
                        <PlusIcon />
                        <span>New User</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>Add new User</DialogTitle>
                        <DialogDescription>
                            Make changes. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-8">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Title<span className='text-red-500'>*</span></Label>
                            <Input id="name-1" name="title" placeholder='Enter title' />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Description</Label>
                            <Input id="username-1" name="description" placeholder='Enter description' />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Capacity<span className='text-red-500'>*</span></Label>
                            <Input id="username-1" name="capacity" placeholder='E.g. 2-6 Pax' />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Price ($)<span className='text-red-500'>*</span></Label>
                            <Input id="username-1" name="capacity" placeholder='USD 0.00' />
                        </div>

                        {/* <div className="">
                            {imageUrl && (
                                <div className="mb-2 rounded-md overflow-hidden w-[120px] h-[100px]">
                                    <img src={`${import.meta.env.VITE_IMAGE_URL}/${imageUrl}`} width={512} height={512} className="w-full h-full object-cover" loading="lazy" alt={imageFile?.name} />
                                </div>
                            )}
                            <input type="file" onChange={handleOnSelectImageChage} ref={imageInputRef} hidden />
                            <Button className="" variant='outline' onClick={() => imageInputRef.current?.click()}>
                                <IconPhotoPlus />
                                Select Image
                            </Button>
                        </div> */}
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default CreateUserModal