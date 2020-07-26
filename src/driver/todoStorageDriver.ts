const STORAGE_KEY = "todos-vuejs-2.0";

export class TodoStorageDriver {

    fetch(): TodoJson[] {
        const todos: TodoJson[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return todos.map(todo => ({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        }));
    }

    save(todos: TodoJson[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

}

export interface TodoJson {
    id: number;
    title: string;
    completed: boolean;
}