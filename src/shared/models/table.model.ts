export type Header = {
    name: string,
    type: string,
}

export type Row = {
    [key: string]: string;
}

export type Table = {
    headers: Header[];
    rows: Row[];
}