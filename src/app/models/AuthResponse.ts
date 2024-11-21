export interface AuthResponse{
    displayName: string,
    idToken: string,
    email: string,
    refreshToken: string,	
    expiresIn: string,	
    localId: string,
    registered?: string
}