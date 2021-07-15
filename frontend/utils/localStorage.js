const PREFIX = 'INSTAGRAM-CLONE-'

export const localStorageSet = (key, value) => {
    const prefixedKey = PREFIX + key
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(prefixedKey, value)
    }
}

export const localStorageGet = key => {
    const prefixedKey = PREFIX + key
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(prefixedKey)
    }
}

export const localStorageRemove = key => {
    const prefixedKey = PREFIX + key
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(prefixedKey)
    }
}
