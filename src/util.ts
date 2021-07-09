import { DEV_MODE } from "./App"

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

export const getModalEffect = () => () => {

    // get the modalRoot and change it's classList

    const modalRoot = document.getElementById('modal-root')
    if (modalRoot !== null) {
        modalRoot.classList.remove('modal-root-inactive')
        modalRoot.classList.add('modal-root-active')
    }

    // disable scrolling
    document.body.style.overflow = 'hidden'

    // Cleanup!
    return () => {

        if (modalRoot !== null) {
            modalRoot.classList.remove('modal-root-active')
            modalRoot.classList.add('modal-root-inactive')
        }

        // re-enable scrolling
        document.body.style.overflow = 'visible'
    }

}

export const groupIntoPairs = <T>(arr: ReadonlyArray<T>): [T, T | undefined][] => {
    const result: [T, T | undefined][] = []
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            const e1 = arr[i]
            const e2 = arr[i + 1]
            result.push([e1, e2])
        }
    }
    return result
}

export const groupIntoThrees = <T>(arr: ReadonlyArray<T>): [T, T | undefined, T | undefined][] => {
    const result: [T, T | undefined, T | undefined][] = []
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0) {
            const e1 = arr[i]
            const e2 = arr[i + 1]
            const e3 = arr[i + 2]
            result.push([e1, e2, e3])
        }
    }
    return result
}

export const devLog = (msg: any) => {
    if (DEV_MODE) {
        console.log(msg)
    }
}

export const copyMap = <K, V>(m: ReadonlyMap<K, V>): Map<K, V> => {
    const newM = new Map<K, V>()
    m.forEach((v, k) => {
        newM.set(k, v)
    })
    return newM
}

export const copyMapAndSet = <K, V>(
    m: ReadonlyMap<K, V>, 
    k: K, 
    v: V
): ReadonlyMap<K, V> => {
    const copy = copyMap(m)
    copy.set(k, v)
    return copy
}

// export const copyMapAndSetLazy = <K, V>(
//     m: ReadonlyMap<K, V>,
//     kvGetter: () => ([K, V] | undefined)
// ): ReadonlyMap<K, V> => {
//     const result = kvGetter()
//     if (result !== undefined) {
//         const [k, v] = result
//         return copyMapAndSet(m, k, v)
//     } else {
//         return m
//     }
// }

export const copyMapWithMapper = <K, V>(
    m: ReadonlyMap<K, V>,
    mutator: (k: K, v: V) => [K, V]
): ReadonlyMap<K, V> => {
    const result = new Map<K, V>()
    m.forEach((oldV, oldK) => {
        const [k, v] = mutator(oldK, oldV)
        result.set(k, v)
    })
    return result
}

export const mapToArray = <K, V, T>(
    m: ReadonlyMap<K, V>,
    mapper: (k: K, v: V) => T
): T[] => {
    const results: T[] = []
    m.forEach((v, k) => {
        results.push(mapper(k, v))
    })
    return results
}