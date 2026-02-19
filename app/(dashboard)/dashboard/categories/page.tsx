"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { AddCategoryModal } from "../../../../components/categories/add-category-modal"
import { useState } from "react"
import { useCategories } from "@/lib/hooks/useCategories"


const CategoriesPage = () => {

    const [open, setOpen] = useState(false)

    const { data: categories } = useCategories()

    const columns = [
        {
            accessorKey: "no",
            header: "No.",
            cell: ({ row }: { row: any }) => {

                return (
                    <p>{row.index + 1}</p>
                )
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            accessorKey: "postCount",
            header: "Post Count",
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }: { row: any }) => {
                const category = row.original
                return (
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                )
            },
        }
    ]

    return (
        <div className="px-[24px] py-[24px] h-[calc(100vh-64px)] overflow-y-auto">
            <AddCategoryModal onClose={() => setOpen(false)} open={open} />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Categories</h1>
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                    Add Category
                </Button>
            </div>
            <DataTable columns={columns} data={categories || []} hideViewColumn />
        </div>
    )
}

export default CategoriesPage