import { defineStore } from "pinia";

export const addComment = defineStore("addComment", {
    state: () => ({ addCommentFlag : false}),
    actions: {
        SET_ADD_COMMENT_FLAG(arg: boolean) {
            this.addCommentFlag = arg
        }
    }
})