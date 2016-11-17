declare module 'argon2' {
  export interface Options {
    timeCost?: number;
    memoryCost?: number;
    parallelism?: number;
    argon2d?: boolean;
  }
  export function hash(password: string, salt: Buffer, options?: Options): Promise<string>;
  export function verify(hash: string, password: string): Promise<boolean>;
}