export interface ResetPassCodeRequest {
    userId: string;
    expires_in: Date;
    code: string;
}