import { z } from 'zod';

export interface CategoryInputs {
    name: string;
    slug: string;
}

export interface CategoryResponse {
    id: string;
    name: string;
    slug: string;
    postCount: number;
}

export const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
})

export type Category = z.infer<typeof categorySchema>