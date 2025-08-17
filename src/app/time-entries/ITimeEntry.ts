export interface ITimeEntry{
    id?: number,
    user_id: number,
    last_name: string,
    administrator: boolean,
    email: string,
    blocked: boolean,
    attempts: number,
}