export const enum TodoStatus {
    Active,
    Completed
}

export function isCompleted(status: TodoStatus): boolean {
    switch (status) {
        case TodoStatus.Active:
            return false;
        case TodoStatus.Completed:
            return true;
    }
}
