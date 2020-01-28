export interface IRegister {
    FirstName: string;
    LastName: string;
    Address: string;
    UserLogin: {
        EmailId: string;
        Password: string;
    }
};

export interface Ilogin {
    UserLogin: {
        Emailid: string;
        Password: string;
    }
}