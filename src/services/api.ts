import api from "@/plugins/axios";
import type { login, register } from "@/types/type";
import getToken from "@/utils/get.token";

export class authentication {
    static async register(obj: register) {
        try {
            let response = await api.post(`/auth/register`, obj)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async login(obj: login) {
        try {
            let response = await api.post(`/auth/login`, obj)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async myProfile(params: string) {
        try {
            let response = await api.get(`/user/me`, {
                headers: {
                    "Authorization": `Bearer ${params}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class User {
    static async getUserById(id: any) {
        try {
            let token = getToken()
            let response = await api.get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async userUpdate(obj: any) {
        try {
            let token = getToken()
            let response = await api.post(`/user/update`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    static async userSearch(filter: any = {}) {
        try {
            let token = getToken()
            let response = await api.get(`/user?search=${filter.search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
}

export class tweet {
    static async trend() {
        try {
            let token = getToken()
            let response = await api.get('/tweet/trend', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async listByUser(id: any) {
        try {
            let token = getToken()
            let response = await api.get(`/tweet/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async listMyFollow() {
        try {
            let token = getToken()
            let response = await api.get(`/tweet/myFollow`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async create(obj: any) {
        try {
            let token = getToken()
            let response = await api.post('/tweet', obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async tweetById(id : any) {
        try {
            let response = await api.get(`/tweet/${id}`)
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async deleteTweet(id : any) {
        try {
            let token = getToken()
            let response = await api.delete(`/tweet/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
}

export class imageUpload {
    static async upload(obj: any) {
        try {
            let response = await api.post('/upload', obj)
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
}

export class Like {
    static async toggle(id: any, obj: any = {}) {
        try {
            let token = getToken()
            let response = await api.post(`/like/${id}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {

        }
    }
}

export class Comment {
    static async create(obj: any) {
        try {
            let token = getToken()
            let response = await api.post('/comment', obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async byTweet(id: any) {
        try {
            let token = getToken()
            let response = await api.get(`/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
}

export class Follow {
    static async check(id: any) {
        try {
            let token = getToken()
            let response = await api.get(`/follow/check/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async followRequest(obj: any) {
        try {
            let token = getToken()
            let response = await api.post(`/follow`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async notifications() {
        try {
            let token = getToken()
            let response = await api.get(`/follow/notification`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async accept(obj: any) {
        try {
            let token = getToken()
            let response = await api.post(`/follow/accept`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async reject(obj: any) {
        try {
            let token = getToken()
            let response = await api.post(`/follow/reject`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async getFollowers() {
        try {
            let token = getToken()
            let response = await api.get(`/follow/followers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }

    static async getFollows() {
        try {
            let token = getToken()
            let response = await api.get(`/follow/following`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
}