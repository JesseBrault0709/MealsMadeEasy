export const fillWithFiller = <T>(
    arr: Array<T>, 
    filler: (index: number) => T, 
    start?: number, 
    end?: number
): Array<T> => {
    for (let i = start ?? 0; i < (end ?? arr.length); i++) {
        arr[i] = filler(i)
    }
    return arr
}