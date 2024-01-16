
import { handleProjectCreation, projectSchema } from "@/lib/helper/projects";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

import { Textarea } from "./ui/textarea";

interface CreateProjectProps {
    open: boolean
    closing: () => void
}

const CreateProject = ({ open, closing }: CreateProjectProps) => {
    const [reload, setReload] = useState(false)
    const [test, setTest] = useState("")

    const reloading = () => {
        setReload(!reload)
    }

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
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Create Project Room</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleProjectCreation)} className="grid gap-4">
                        <FormField name="project_name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <FormField name="description" render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" placeholder="descript your project" {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <FormField name="repository" render={({field}) => (
                            <FormItem>
                                <FormLabel>Repository</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage className="text-orange-500"/>
                        </FormItem>
                        )} />
                        <div className="flex justify-between">
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

                        

                        {/* <Card className="h-[350px]">
                            <CardContent onChange={() => console.log("hohoho")}>
                                {test}
                            </CardContent>
                        </Card> */}
                        <Input disabled value={test} />
                        <Button onClick={() => setTest((t) => t + "d")}>click</Button>


                        <DialogFooter>
                            <Button onClick={() => {
                                closing()
                                reloading()
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