import { defineStore } from "pinia";

export const trendStore = defineStore("trendStore", {
    state: () => ({ refetch : true}),
    actions: {
        SET_REFETCH(arg: boolean) {
            this.refetch = arg
        }
    }
})