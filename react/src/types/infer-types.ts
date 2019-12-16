export function inferLiteral<U, T extends U>(arg: T): T{
    return arg;
}

export function inferStringLiteral<T extends string>(arg: T): T {
    return inferLiteral<string, T>(arg);
}

type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

export default InferValueTypes;
// type ActionTypes<T extends {}> =  ReturnType<InferValueTypes<T>>