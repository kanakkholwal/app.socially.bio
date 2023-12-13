
export type UserType = {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    password?: string;
    role: string;
    account_type: string;
    verificationToken: string;
    verified: boolean;
}
export type SessionUserType = {
    _id: string;
    id?: string;
    name: string;
    username: string;
    email: string;
    profilePicture: string;
    role: string;
    account_type: string;
    verified: boolean;
}