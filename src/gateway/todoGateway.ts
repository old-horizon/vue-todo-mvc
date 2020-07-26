import {TodoJson, TodoStorageDriver} from "@/driver/todoStorageDriver";
import {TodoPort} from "@/port/todoPort";
import {Todo, TodoId, TodoTitle} from "@/domain/todo";
import {isCompleted, TodoStatus} from "@/domain/todoStatus";
import {AllTodos} from "@/domain/allTodos";

export class TodoGateway implements TodoPort {

    constructor(private readonly todoStorageDriver: TodoStorageDriver) {
    }

    findAll(): AllTodos {
        return new AllTodos(this.todoStorageDriver.fetch()
            .map(todo => new Todo(new TodoId(todo.id),
                new TodoTitle(todo.title),
                todo.completed ? TodoStatus.Completed : TodoStatus.Active)));
    }

    store(allTodos: AllTodos): void {
        this.todoStorageDriver.save(allTodos.map(todo => this.toJson(todo)));
    }

    private toJson(todo: Todo): TodoJson {
        return {
            id: todo.id.value,
            title: todo.title.value,
            completed: isCompleted(todo.status)
        }
    }

}
