<template>
    <section id="app" class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <todo-input/>
        </header>
        <todo-list/>
        <todo-controller/>
    </section>
</template>

<script lang="ts">
    import TodoController from "@/presenter/components/TodoController.vue";
    import {todoStore, todoStoreKey} from "@/presenter/store/todoStore";
    import {TodoUsecase, todoUsecaseKey} from "@/usecase/todoUsecase";
    import {TodoGateway} from "@/gateway/todoGateway";
    import {defineComponent, provide} from "@vue/composition-api";
    import {TodoStorageDriver} from "@/driver/todoStorageDriver";
    import TodoInput from "@/presenter/components/TodoInput.vue";
    import TodoList from "@/presenter/components/TodoList.vue";
    import {FilterCondition} from "@/domain/filterCondition";

    interface Props {
        filterCondition: FilterCondition;
    }

    export default defineComponent({
        components: {
            TodoInput,
            TodoList,
            TodoController
        },
        props: ['filterCondition'],
        setup(props: Props) {
            const store = todoStore();
            const usecase = new TodoUsecase(new TodoGateway(new TodoStorageDriver()), store);

            usecase.load();
            store.setFilterCondition(props.filterCondition);

            provide(todoStoreKey, store);
            provide(todoUsecaseKey, usecase);
        }
    });
</script>

<style>
    @import url("https://unpkg.com/todomvc-app-css@2.2.0/index.css");
</style>
