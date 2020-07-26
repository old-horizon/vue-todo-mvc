import {isCompleted, TodoStatus} from "@/domain/todoStatus";

export class TodoId {

    constructor(readonly value: number) {
    }

}

export class TodoTitle {

    constructor(readonly value: string) {
    }


}

export class Todo {

    constructor(readonly id: TodoId, readonly title: TodoTitle, readonly status: TodoStatus) {
    }

    isCompleted(): boolean {
        return isCompleted(this.status);
    }

}
