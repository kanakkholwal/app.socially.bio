

export type TempLinkType = {
    _id: string;
    slug: string;
    url: string;
    expiresAt: string;
    visits: number;
    hits: number;
    opener: string;
    creator: string;
    createdAt: string;
    updatedAt: string;
    passwordProtected?: boolean;
    __v?: number;
}