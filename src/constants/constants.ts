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

export const languages = [
    { value: "Python" },
    { value: "Java" },
    { value: "Javascript" },
    { value: "Typescript" },
    { value: "C" },
    { value: "C++" },
    { value: "Go" },
    { value: "Ruby" },
    { value: "Django" },
    { value: "React" },
    { value: "Vue" },
    { value: "Spring Boot" },
    { value: "Angular" },
    { value: "dasd" },
    { value: "Andasdagular" },
    { value: "Angasular" },
    { value: "Angudlar" },
] as const