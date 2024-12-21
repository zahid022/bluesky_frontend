import { defineStore } from "pinia";

export const addPost = defineStore("addPost", {
    state: () => ({ flag : false}),
    actions: {
        SET_FLAG(arg: boolean) {
            this.flag = arg
        }
    }
})