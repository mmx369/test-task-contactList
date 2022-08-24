export {}

declare global {
  namespace Express {
    interface Response {
      token: string | null
    }
  }
  interface Error {
    code: number
  }
}
