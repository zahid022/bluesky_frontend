export interface register {
    email : String;
    username : String;
    password : String;
}

export interface login {
    username : String;
    password : String;
}

export interface User {
    username : string;
    email : string;
    _id ?: string;
    avatar : string | null;
    background : string | null;
    followers : number;
    following : number;
    role : string;
}

export interface Tweet {
    comment : number;
    like : number;
    likeUser : string[];
    reply : number;
    title : string;
    media : any;
    userId : any;
    _id ? :string;
    createdAt : any;
}