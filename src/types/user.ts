
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
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    role: string;
    account_type: string;
    username: string;
    verified: boolean;
}