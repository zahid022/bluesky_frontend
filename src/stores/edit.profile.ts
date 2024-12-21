import { defineStore } from "pinia";

export const editProfile = defineStore("editProfile", {
    state: () => ({ flag : false}),
    actions: {
        SET_FLAG(arg: boolean) {
            this.flag = arg
        }
    }
})