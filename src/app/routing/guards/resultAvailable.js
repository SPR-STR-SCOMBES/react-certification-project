export function resultAvailableGuard(isAvailable) {
    return async (params) => {
        return Promise.resolve(isAvailable)
    }
}