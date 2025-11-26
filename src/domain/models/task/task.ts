export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
    updatedAt?: number;
    description?: string;
    category?: string;
    categoryId?: string | null;
    categoryName?: string | null;
}
  