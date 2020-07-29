<template>
    <div class="view">
        <input
                type="checkbox"
                class="toggle"
                v-model="completed"
        >
        <label @dblclick="edit">{{todo.title.value}}</label>
        <button class="destroy" @click="remove"></button>
    </div>
</template>

<script lang="ts">
    import {Todo} from "@/domain/todo";
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {isCompleted, TodoStatus} from "@/domain/todoStatus";
    import {safeInject} from ".";
    import {todoStoreKey} from "@/presenter/store/todoStore";
    import {defineComponent, ref, watchEffect, computed} from 'vue';

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

            watchEffect(() => completed.value = isCompleted(props.todo.status));

            return {
                completed: computed({
                    get: () => completed.value,
                    set: value => {
                        const newStatus = toStatus(value);
                        const newTodo = new Todo(props.todo.id, props.todo.title, newStatus);
                        usecase.update(newTodo);

                        completed.value = value;
                    }
                }),
                edit() {
                    store.editStart(props.todo);
                },
                remove() {
                    usecase.remove(props.todo);
                }
            };
        }
    });
</script>
