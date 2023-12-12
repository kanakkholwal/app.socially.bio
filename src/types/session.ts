import { SessionUserType } from "./user";


export type SessionType = {
    user: SessionUserType
    expires: string
}