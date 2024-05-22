export class EmailBeingUsed extends Error{
    constructor(email:string){
        super(`The email ${email} is already in use.`)
        this.name = "Email Already InUseError"
    }
}
export class CpfBeingUsed extends Error{
    constructor(cpf:string){
        super(`The cpf ${cpf} is already in use.`)
        this.name = "CpfAlreadyInUseError"
    }
}
export class PhoneBeingUsed extends Error{
    constructor(phone:string){
        super(`The phone ${phone} is already in use.`)
        this.name = "PhoneAlreadyInUseError"
    }
}
export class UserNotFound extends Error{
    constructor(){
        super(`User not found`)
        this.name = "UserNotFound"
    }
}