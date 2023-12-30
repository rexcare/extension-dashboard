export type GEOCoordinates = {
    lat: number;
    long: number;
};

export type Temperature = {
    min: number;
    max: number;
    current: number;
};

export type Quote = {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
};
