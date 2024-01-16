import * as z from "zod"

export const projectSchema = z.object({
    project_name: z.string().min(1, {
        message: "Please enter a valid input",
    }),
    description: z.string(),
    access: z.string(),
    level: z.string({
        required_error: "Please select a level"
    }),
    tags: z.array(z.string()),
    repository: z.string()
})

export const handleProjectCreation = (values: z.infer<typeof projectSchema>) => {
    console.log("project create", values)
}