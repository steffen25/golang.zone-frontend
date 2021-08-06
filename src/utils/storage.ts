
const storage = {
    get: (key: string) => {
        return window.localStorage.getItem(key) as string;
    },

    set: (key:string, token: string) => {
        window.localStorage.setItem(key, token);
    },

    clear: (key: string) => {
        window.localStorage.removeItem(key);
    },
};

export default storage;