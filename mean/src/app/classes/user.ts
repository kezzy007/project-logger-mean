export class User {
    name: string;
    email: string;
    password: string;
    username: string;
    skill?: string;
    _id: string;

    constructor(){
        this.name = '';
        this.email = '';
        this.password = '';
    }
}
