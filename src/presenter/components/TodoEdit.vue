<template>
    <input
            class="edit"
            type="text"
            v-todo-focus="todo === editingTodo"
            v-model="title"
            @keypress.enter="doneEdit"
            @keyup.esc="cancelEdit"
            @blur="cancelEdit"
    >
</template>

<script lang="ts">
    import {Todo, TodoTitle} from "@/domain/todo";
    import {todoStoreKey} from "@/presenter/store/todoStore";
    import {safeInject} from ".";
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {defineComponent, ref} from 'vue';

    interface Props {
        todo: Todo;
    }

    export default defineComponent({
        directives: {
            "todo-focus"(element, binding) {
                if (binding.value) {
                    element.focus();
                }
            }
        },
        props: {
            todo: Todo
        },
        setup(props: Props) {
            const usecase = safeInject(todoUsecaseKey);
            const store = safeInject(todoStoreKey);

            const title = ref(props.todo.title.value);

            return {
                editingTodo: store.editingTodo,
                title,
                doneEdit() {
                    const newTodo = new Todo(props.todo.id, new TodoTitle(title.value), props.todo.status);
                    usecase.update(newTodo);
                    store.editEnd();
                },
                cancelEdit() {
                    store.editEnd();
                }
            };
        }
    });
</script>