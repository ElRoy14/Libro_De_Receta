
export default class IPasswordHasher {

    async hash(password: string) : Promise<string>{ throw new Error("Not Implemented");}

    async verify(hash: string, password:string) : Promise<boolean>{ throw new Error("No Implementd");}
}