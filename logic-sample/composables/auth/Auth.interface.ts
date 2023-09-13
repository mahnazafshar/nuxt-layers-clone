export interface AuthTokens {
    accessToken: string | null,
    refreshToken: string | null,
    expiresIn: number | null,
}
export interface AuthState extends AuthTokens {
    isRefreshing: boolean,
    isRefreshSuccess: boolean,
}
