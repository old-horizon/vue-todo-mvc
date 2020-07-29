<template>
    <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{remaining}}</strong>
      {{pluralize(remaining)}} left
    </span>
        <ul class="filters">
            <li v-for="filter in filters" :key="filter">
                <a
                        :href="'/' + filter.toString().toLowerCase()"
                        :class="{selected: visibility === filter}"
                >{{filter}}</a>
            </li>
        </ul>
        <button
                class="clear-completed"
                @click="removeCompleted"
                v-show="todos.length > remaining"
        >
            Clear completed
        </button>
    </footer>
</template>

<script lang="ts">
    import {FilterCondition} from "@/domain/filterCondition";
    import {safeInject} from '.';
    import {todoStoreKey} from '../store/todoStore';
    import {todoUsecaseKey} from "@/usecase/todoUsecase";
    import {defineComponent} from 'vue';

    export default defineComponent({
        setup() {
            const usecase = safeInject(todoUsecaseKey);
            const store = safeInject(todoStoreKey);
            return {
                todos: store.allTodos,
                remaining: store.remaining,
                filters: [FilterCondition.All, FilterCondition.Active, FilterCondition.Completed],
                visibility: store.filterCondition,
                pluralize(n: number) {
                    return n === 1 ? "item" : "items";
                },
                removeCompleted() {
                    usecase.removeCompleted();
                }
            };
        }
    });
</script>
