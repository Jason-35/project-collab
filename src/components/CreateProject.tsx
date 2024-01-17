
import { handleProjectCreation, projectSchema } from "@/lib/helper/projects";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { languages } from "@/constants/constants";
import { ArrowDown } from "lucide-react";

interface CreateProjectProps {
    open: boolean
    closing: () => void
}

const CreateProject = ({ open, closing }: CreateProjectProps) => {

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            project_name: "",
            description: "",
            access: "public",
            tags: [],
            repository: ""
        }
    })

    return ( 
        <Dialog open={open} onOpenChange={closing}>
            <DialogContent className="border border-orange-500">
                <DialogHeader>
                    <DialogTitle>Create Project Room</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleProjectCreation)} className="grid gap-4 border">
                        <FormField name="project_name" render={({field}) => (
                            <FormItem className="border border-orange-500">
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <FormField name="description" render={({field}) => (
                            <FormItem className="">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" placeholder="descript your project" {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <FormField name="repository" render={({field}) => (
                            <FormItem className="">
                                <FormLabel>Repository</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <div className="flex justify-between max-sm:flex-col">
                            <FormField name="level" control={form.control} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Level</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select..."/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Level</SelectLabel>
                                                    <SelectItem value="novice">Novice</SelectItem>
                                                    <SelectItem value="advance beginner">Advance Beginner</SelectItem>
                                                    <SelectItem value="competent">Competent</SelectItem>
                                                    <SelectItem value="proficient">Proficient</SelectItem>
                                                    <SelectItem value="expert">Expert</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage className="text-orange-500"/>
                            </FormItem>
                            )} />
                            <FormField name="access" control={form.control} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Access</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="public">Public</SelectItem>
                                                    <SelectItem value="private">Private</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage className="text-orange-500"/>
                            </FormItem>
                            )} />
                        </div>

                        <FormField name="tags" control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-transparent">Tags</FormLabel>
                                <Card className="hover:cursor-pointer  min-h-10 flex flex-wrap justify-center relative">
                                    <div className=" max-h-48 overflow-scroll h-16">
                                        {field.value.map((tag, index) => (
                                            <Badge onClick={(e) => {
                                                e.stopPropagation()
                                                console.log("remove")
                                                }} className="mx-1 my-2" key={index}>{tag}</Badge>
                                        ))}
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <button className="rounded-t-sm absolute bottom-full bg-orange-500 border border-orange-500 w-full flex justify-center"><ArrowDown/>Tags</button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No tags found.</CommandEmpty>
                                                <CommandGroup className="max-h-72 overflow-scroll">
                                                    {languages.map((language) => (
                                                        <CommandItem 
                                                            key={language.value} 
                                                            value={language.value}
                                                            onSelect={() => {
                                                                if(!field.value.includes(language.value))
                                                                form.setValue("tags", [...field.value, language.value])
                                                              }}
                                                            >
                                                            {language.value}
                                                            
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </Card>
                            </FormItem>
                        )} />


                        <DialogFooter className="max-sm:grid max-sm:gap-4">
                            <Button onClick={() => {
                                closing()
                            }}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default CreateProject;