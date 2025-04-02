type signInInput = {
    email: string;
    password: string;
};
export declare const signInUser: (input: signInInput) => Promise<string>;
export {};
