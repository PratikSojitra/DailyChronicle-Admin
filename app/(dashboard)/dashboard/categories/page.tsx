"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"


const CategoriesPage = () => {

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

    const data = [
        {
            name: "John Doe",
            slug: "john-doe",
            postCount: 10,
        },
        {
            name: "Jane Doe 2",
            slug: "jane-doe-2",
            postCount: 20,
        },
    ]

    return (
        <div className="px-[24px] py-[24px] h-[calc(100vh-64px)] overflow-y-auto">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default CategoriesPage