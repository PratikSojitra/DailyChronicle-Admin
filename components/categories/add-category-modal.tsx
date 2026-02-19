"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Dialog from "@/components/common/dialog/dialog-component"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddCategory } from "@/lib/hooks/useCategories"
import { useForm } from "react-hook-form"
import { categorySchema, CategoryInputs, Category } from "@/lib/types/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import slugify from "slugify"

export function AddCategoryModal({ open, onClose, refetch }: { open: boolean, onClose: () => void, refetch: () => void }) {

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<Category>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
        }
    })

    const name = watch("name")

    useEffect(() => {
        if (name) {
            reset({ slug: slugify(name, { replacement: '-', lower: true, strict: true, trim: true }) })
        }
    }, [name])

    const { mutateAsync: addCategory, isPending } = useAddCategory()



    const handleAddCategories = async (data: Category) => {
        try {
            await addCategory(data)
            onClose()
            reset()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                title="Add Category"
                description="Create a new category here. Click save when you're done."
                size="sm"
                footer={
                    <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save changes"}</Button>
                }
                onSubmit={handleSubmit(handleAddCategories)}
            >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" {...register("name")} placeholder="Category Name" className="col-span-3" />
                        {errors.name && (
                            <p className="text-destructive text-xs font-medium mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="slug" className="text-right">
                            Slug
                        </Label>
                        <Input id="slug" placeholder="category-slug" className="col-span-3" {...register("slug")} />
                        {errors.slug && (
                            <p className="text-destructive text-xs font-medium mt-1">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    )
}
