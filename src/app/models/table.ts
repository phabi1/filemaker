export type Table = {
    headers: { name: string; type: string }[];
    rows: Record<string, string>[];
}