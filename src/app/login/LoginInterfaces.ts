export interface IAuth{
  user: {
    id: any,
    first_name: string,
    last_name: string,
    administrator: string,
    email: string,
    created_at: string,
    updated_at: string,
  },
  token: string
}