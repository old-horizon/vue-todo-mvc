<template>
    <input
            v-model="title"
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="What needs to be done?"
            @keypress.enter="addTodo"
    >
</template>

<script lang="ts">
    import {defineComponent, ref} from "@vue/composition-api";
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {safeInject} from "@/presenter/components/index";
    import {TodoTitle} from '@/domain/todo';

    export default defineComponent({
        setup() {
            const usecase = safeInject(todoUsecaseKey);

            const title = ref("");

            return {
                title: title,
                addTodo() {
                    const trimmed = title.value.trim();
                    if (!trimmed) {
                        return;
                    }
                    usecase.add(new TodoTitle(trimmed));
                    title.value = "";
                }
            }
        }
    })
</script>