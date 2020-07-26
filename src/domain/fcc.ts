/* eslint-disable */
export abstract class FCC<T> {

    constructor(readonly list: Array<T>) {
    }

    get length(): number {
        return this.list.length;
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.list[Symbol.iterator]();
    }

    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (ConcatArray<T> | T)[]): T[];
    concat(...items: (ConcatArray<T> | T)[]): T[] {
        return this.list.concat(...items);
    }

    copyWithin(target: number, start: number, end?: number): Array<T> {
        return this.list.copyWithin(target, start, end);
    }

    entries(): IterableIterator<[number, T]> {
        return this.list.entries();
    }

    every(callback: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.list.every(callback, thisArg);
    }

    fill(value: T, start?: number, end?: number): Array<T> {
        return this.list.fill(value, start, end);
    }

    filter(callback: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
        return this.list.filter(callback, thisArg);
    }

    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
        return find(this.list, predicate, thisArg);
    }

    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number {
        return this.list.findIndex(predicate, thisArg);
    }

    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => (ReadonlyArray<U> | U), thisArg?: This): U[] {
        return this.list.flatMap(callback, thisArg);
    }

    forEach(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        this.list.forEach(callback, thisArg);
    }

    includes(searchElement: T, fromIndex?: number): boolean {
        return this.list.includes(searchElement, fromIndex);
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return this.list.indexOf(searchElement, fromIndex);
    }

    join(separator?: string): string {
        return this.list.join(separator);
    }

    keys(): IterableIterator<number> {
        return this.list.keys();
    }

    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this.list.lastIndexOf(searchElement, fromIndex);
    }

    map<U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return this.list.map(callback, thisArg);
    }

    pop(): T | undefined {
        return this.list.pop();
    }

    push(...items: T[]): number {
        return this.list.push(...items);
    }

    reduce(callback: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduce<U>(callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
        return this.list.reduce(callback, initialValue);
    }

    reduceRight(callback: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduceRight<U>(callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
        return reduceRight(this.list, callback, initialValue);
    }

    reverse(): T[] {
        return this.list.reverse();
    }

    shift(): T | undefined {
        return this.list.shift();
    }

    slice(start?: number, end?: number): T[] {
        return this.list.slice(start, end);
    }

    some(callback: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
        return this.list.some(callback, thisArg);
    }

    sort(compareFn?: (a: T, b: T) => number): Array<T> {
        return this.list.sort(compareFn);
    }

    splice(start: number, deleteCount?: number): T[];
    splice(start: number, deleteCount: number, ...items: T[]): T[];
    splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        return this.list.splice(start, deleteCount as number, ...items);
    }

    unshift(...items: T[]): number {
        return this.list.unshift(...items);
    }

    values(): IterableIterator<T> {
        return this.list.values();
    }

}

function find<T>(list: Array<T>, predicate: any, thisArg?: any): any {
    return list.find(predicate, thisArg);
}

function reduceRight<T>(list: Array<T>, callback: any, initialValue?: any): any {
    return list.reduceRight(callback, initialValue)
}
