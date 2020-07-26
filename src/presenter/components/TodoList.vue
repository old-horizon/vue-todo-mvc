<template>
    <section class="main" v-show="todos.length" v-cloak>
        <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                v-model="allDone"
                @change="onInput"
        >
        <label for="toggle-all"/>
        <ul class="todo-list">
            <li
                    v-for="todo in filteredTodos"
                    class="todo"
                    :class="{completed: todo.isCompleted(), editing: todo === editingTodo}"
                    :key="todo.id.value"
            >
                <todo-item :todo="todo"/>
                <todo-edit :todo="todo"/>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import {defineComponent, ref} from "@vue/composition-api";
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {safeInject} from ".";
    import {todoStoreKey} from "@/presenter/store/todoStore";
    import {TodoStatus} from "@/domain/todoStatus";
    import TodoItem from "@/presenter/components/TodoItem.vue";
    import TodoEdit from "@/presenter/components/TodoEdit.vue";

    export default defineComponent({
        components: {
            TodoItem,
            TodoEdit
        },
        setup() {
            const usecase = safeInject(todoUsecaseKey);
            const store = safeInject(todoStoreKey);

            const allDone = ref(false);

            return {
                todos: store.allTodos,
                filteredTodos: store.filteredTodos,
                editingTodo: store.editingTodo,
                allDone,
                onInput() {
                    const status = allDone.value ? TodoStatus.Completed : TodoStatus.Active;
                    usecase.changeAllStatus(status);
                }
            }
        }
    });
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }
</style>