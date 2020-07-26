import {Todos} from "@/domain/todos";
import {TodoStatus} from "@/domain/todoStatus";
import {FilteredTodos} from "@/domain/filteredTodos";
import {Todo, TodoId, TodoTitle} from "@/domain/todo";

export class TodoNotFoundError extends Error {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

function findIndex(todos: AllTodos, target: Todo) {
    const index = todos.findIndex(todo => todo.id.value === target.id.value);
    if (index === -1) {
        throw new TodoNotFoundError(`Todo not found. id=${target.id}`);
    }
    return index;
}

export class AllTodos extends Todos {

    add(title: TodoTitle): AllTodos {
        const id = Math.max(0, ...this.map(todo => todo.id.value)) + 1;
        const newTodo = new Todo(new TodoId(id), title, TodoStatus.Active);
        return new AllTodos([...this, newTodo]);
    }

    edit(target: Todo): AllTodos {
        const index = findIndex(this, target);
        const modified = [...this];
        modified.splice(index, 1, target);
        return new AllTodos(modified);
    }

    remove(target: Todo): AllTodos {
        const index = findIndex(this, target);
        const modified = [...this];
        modified.splice(index, 1);
        return new AllTodos(modified);
    }

    changeAllStatus(status: TodoStatus): AllTodos {
        return new AllTodos(this.map(todo => new Todo(todo.id, todo.title, status)));
    }

    removeCompleted(): AllTodos {
        return new AllTodos(this.filter(todo => todo.status !== TodoStatus.Completed));
    }

    filterActive(): FilteredTodos {
        return new FilteredTodos(this.filter(todo => todo.status === TodoStatus.Active));
    }

    filterCompleted(): FilteredTodos {
        return new FilteredTodos(this.filter(todo => todo.status === TodoStatus.Completed));
    }

}
