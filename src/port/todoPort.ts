import {AllTodos} from "@/domain/allTodos";

export interface TodoPort {

    findAll(): AllTodos;

    store(allTodos: AllTodos): void;

}