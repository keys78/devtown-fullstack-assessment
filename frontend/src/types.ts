
export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
}


// auth
export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

// user
export interface IToken {
    token: string;
}

export interface footerProps {
    header: string,
    links: string[]
}

export interface heroDisplayTexts {
    tag: number,
    title: string,
    desc: string
}