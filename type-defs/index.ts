export type Auth = {
    id : string,
    provider : number,
    created_at : number,
    user_id ?: string
}

export type User = {
    id : string,
    created_at : number,
    name ?: string,
    image ?: string,
    comment ?:string
}

export type UserView = User & {
    auth_id : string,
}