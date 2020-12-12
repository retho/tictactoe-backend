
export enum CommonErrorKinds {
  unauthorized = 'unauthorized',
}

type CommonErrorUnauthorized = {
  kind: CommonErrorKinds.unauthorized,
}
export type CommonError = CommonErrorUnauthorized;
export const isCommonError = (err: unknown): err is CommonError => Object.values(CommonErrorKinds).includes((err as any)?.kind)

export const errorUnauthorized = (): CommonError => ({kind: CommonErrorKinds.unauthorized})
