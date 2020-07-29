import {inject, InjectionKey} from 'vue';

export class NotProvidedError extends Error {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export function safeInject<T>(injectionKey: InjectionKey<T>): T {
    const object = inject(injectionKey);

    if (!object) {
        throw new NotProvidedError(`Failed to get store: ${injectionKey.toString()}`);
    }

    return object;
}