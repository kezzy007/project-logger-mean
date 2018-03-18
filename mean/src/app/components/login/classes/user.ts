export class User{
    success: string;
    token: string;
    user:IUser;
}

interface IUser{
    id: string;
    name: string;
    username: string;
    email: string;
}