export type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type UnboxReturnedPromise<F extends (...args: any) => any> = UnboxPromise<ReturnType<F>>
export type RequiredProperties<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>;