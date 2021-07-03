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