<template>
    <div class="view">
        <input
                type="checkbox"
                class="toggle"
                v-model="completed"
                @change="changeStatus"
        >
        <label @dblclick="edit">{{todo.title.value}}</label>
        <button class="destroy" @click="remove"></button>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, watch} from "@vue/composition-api";
    import {Todo} from "@/domain/todo";
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {isCompleted, TodoStatus} from "@/domain/todoStatus";
    import {safeInject} from ".";
    import {todoStoreKey} from "@/presenter/store/todoStore";

    interface Props {
        todo: Todo;
    }

    function toStatus(completed: boolean): TodoStatus {
        return completed ? TodoStatus.Completed : TodoStatus.Active;
    }

    export default defineComponent({
        props: {
            todo: Todo
        },
        setup(props: Props) {
            const usecase = safeInject(todoUsecaseKey);
            const store = safeInject(todoStoreKey);
            const completed = ref(isCompleted(props.todo.status));

            watch(() => props.todo.status, (newStatus) => completed.value = isCompleted(newStatus));

            return {
                completed,
                changeStatus() {
                    const newStatus = toStatus(completed.value);
                    const newTodo = new Todo(props.todo.id, props.todo.title, newStatus);
                    usecase.update(newTodo);
                },
                edit() {
                    store.editStart(props.todo);
                },
                remove() {
                    usecase.remove(props.todo);
                }
            }
        }
    });
</script>
