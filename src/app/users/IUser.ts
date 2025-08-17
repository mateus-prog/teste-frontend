export interface IUser{
    id?: number,
    first_name: string,
    last_name: string,
    administrator: boolean,
    email: string,
    blocked: boolean,
    attempts: number,
    date_of_birth: string,
    password: string,
}