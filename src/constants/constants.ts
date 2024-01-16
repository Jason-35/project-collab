export enum OAuthType {
    Google = "Google",
}

export enum AuthType {
    Login = "Login",
    Register = "Register"
}

export enum Status {
    OK = "OK",
    ERROR = "ERROR"
}

export enum ErrorMsg {
    EMAIL_USED = "auth/email-already-in-use",
    INVALID_CREDENTIAL = "auth/invalid-credential"
}