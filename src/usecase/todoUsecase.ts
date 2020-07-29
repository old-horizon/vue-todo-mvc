import {TodoPort} from "@/port/todoPort";
import {Todo, TodoTitle} from "@/domain/todo";
import {TodoStore} from "@/presenter/store/todoStore";
import {TodoStatus} from "@/domain/todoStatus";
import {InjectionKey} from 'vue';

export const todoUsecaseKey: InjectionKey<TodoUsecase> = Symbol("TodoUsecase");

export class TodoUsecase {

    constructor(private readonly todoPort: TodoPort, private readonly todoStore: TodoStore) {
    }

    load(): void {
        const todos = this.todoPort.findAll();

        this.todoPort.store(todos);
        this.todoStore.setAllTodos(todos);
    }

    add(title: TodoTitle): void {
        const todos = this.todoPort.findAll();
        const newTodos = todos.add(title);

        this.todoPort.store(newTodos);
        this.todoStore.setAllTodos(newTodos);
    }

    update(target: Todo): void {
        const todos = this.todoPort.findAll();
        const newTodos = todos.edit(target);

        this.todoPort.store(newTodos);
        this.todoStore.setAllTodos(newTodos);
    }

    remove(target: Todo): void {
        const todos = this.todoPort.findAll();
        const newTodos = todos.remove(target);

        this.todoPort.store(newTodos);
        this.todoStore.setAllTodos(newTodos);
    }

    changeAllStatus(status: TodoStatus): void {
        const todos = this.todoPort.findAll();
        const newTodos = todos.changeAllStatus(status);

        this.todoPort.store(newTodos);
        this.todoStore.setAllTodos(newTodos);
    }

    removeCompleted(): void {
        const todos = this.todoPort.findAll();
        const newTodos = todos.removeCompleted();

        this.todoPort.store(newTodos);
        this.todoStore.setAllTodos(newTodos);
    }

}
