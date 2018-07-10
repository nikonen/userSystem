export interface Config {
    constructor(code: number, message: string): void;
    public code: number;
    public message: string;
}
