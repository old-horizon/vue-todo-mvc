<template>
    <section class="main" v-show="todos.length" v-cloak>
        <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                v-model="allDone"
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
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {safeInject} from ".";
    import {todoStoreKey} from "@/presenter/store/todoStore";
    import {TodoStatus} from "@/domain/todoStatus";
    import TodoItem from "@/presenter/components/TodoItem.vue";
    import TodoEdit from "@/presenter/components/TodoEdit.vue";
    import {defineComponent, ref, computed} from 'vue';

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
                allDone: computed({
                    get: () => allDone.value,
                    set: value => {
                        const status = value ? TodoStatus.Completed : TodoStatus.Active;
                        usecase.changeAllStatus(status);

                        allDone.value = value;
                    }
                })
            };
        }
    });
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }
</style>