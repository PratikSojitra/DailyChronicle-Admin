import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCategory, deleteCategory, getCategories, updateCategory } from "../api/categories"
import { CategoryInputs } from "../types/categories"
import { QUERY_KEYS } from "../constants/query-keys"
import { toast } from "sonner"

export const useCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CATEGORIES],
        queryFn: getCategories,
    })
}

export const useAddCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: CategoryInputs) => addCategory(category),
        onSuccess: () => {
            toast.success("Category added successfully")
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] })
        },
        onError: () => {
            toast.error("Failed to add category")
        }
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ id, category }: { id: string, category: CategoryInputs }) => updateCategory(id, category),
        onSuccess: () => {
            toast.success("Category updated successfully")
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] })
        },
        onError: () => {
            toast.error("Failed to update category")
        }
    })

    return mutation
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: () => {
            toast.success("Category deleted successfully")
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] })
        },
        onError: () => {
            toast.error("Failed to delete category")
        }
    })
}