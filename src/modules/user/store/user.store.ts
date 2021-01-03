import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        isAdmin: false as Boolean,
    }),
    getters: {},
    actions: {},
})
