export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    admin: boolean;
    birthday: Date;
    monthlypayment: boolean;
    createdAt: Date;
    updatedAt: Date;
}