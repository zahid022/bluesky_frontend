import { defineStore } from "pinia";

export const homeStore = defineStore("homeStore", {
    state: () => ({ flag : true}),
    actions: {
        SET_FLAG(arg: boolean) {
            this.flag = arg
        }
    }
})