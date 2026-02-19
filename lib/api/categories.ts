import api from "../axios"
import { CategoryInputs, CategoryResponse } from "../types/categories"

export const addCategory = async (category: CategoryInputs): Promise<CategoryResponse> => {
    const response = await api.post('/categories', category)
    return response.data
}

export const getCategories = async (): Promise<CategoryResponse[]> => {
    const response = await api.get('/categories')
    return response.data
}

export const updateCategory = async (id: string, category: CategoryInputs): Promise<CategoryResponse> => {
    const response = await api.put(`/categories/${id}`, category)
    return response.data
}

export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
    const response = await api.delete(`/categories/${id}`)
    return response.data
}