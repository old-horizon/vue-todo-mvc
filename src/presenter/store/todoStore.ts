import {FilterCondition} from "@/domain/filterCondition";
import {computed, ComputedRef, InjectionKey, reactive} from "@vue/composition-api";
import {Todos} from "@/domain/todos";
import {AllTodos} from "@/domain/allTodos";
import {Todo} from "@/domain/todo";

export interface TodoStore {

    remaining: ComputedRef<number>;

    filterCondition: ComputedRef<FilterCondition>;

    allTodos: ComputedRef<Todos>;

    filteredTodos: ComputedRef<Todos>;

    editingTodo: ComputedRef<Todo | null>;

    setAllTodos(todos: AllTodos): void;

    setFilterCondition(filterCondition: FilterCondition): void;

    editStart(todo: Todo): void;

    editEnd(): void;

}

export const todoStoreKey: InjectionKey<TodoStore> = Symbol("TodoStore");

function filterItems(allTodos: AllTodos, condition: FilterCondition): Todos {
    switch (condition) {
        case FilterCondition.All:
            return allTodos;
        case FilterCondition.Active:
            return allTodos.filterActive();
        case FilterCondition.Completed:
            return allTodos.filterCompleted();
    }
}

export function todoStore(): TodoStore {
    const state = reactive({
        allTodos: new AllTodos([]),
        filterCondition: FilterCondition.All,
        editingTodo: null as Todo | null
    });
    const remaining = computed(() => state.allTodos.filterActive().length);
    const filterCondition = computed(() => state.filterCondition);
    const allTodos = computed(() => state.allTodos);
    const filteredTodos = computed(() => filterItems(state.allTodos, state.filterCondition));
    const editingTodo = computed(() => state.editingTodo);

    return {
        remaining,
        filterCondition,
        allTodos,
        filteredTodos,
        editingTodo,
        setAllTodos(allTodos: AllTodos) {
            state.allTodos = allTodos;
        },
        setFilterCondition(filterCondition: FilterCondition) {
            state.filterCondition = filterCondition;
        },
        editStart(todo: Todo) {
            state.editingTodo = todo;
        },
        editEnd() {
            state.editingTodo = null;
        }
    };
}
