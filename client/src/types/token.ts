export interface ITokenObject {
  token: string
  userForToken: IUserForToken
}

export interface IUserForToken {
  email: string
  id: string
}
