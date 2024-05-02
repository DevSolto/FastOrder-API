export class EmailAlreadyInUseError extends Error{
  constructor(email:string){
    super(`O email ${email} está em uso`)
    this.name = "EmailAlreadyInUseError"
  }
}
export class CpfAlreadyInUseError extends Error{
  constructor(cpf:string){
    super(`O cpf ${cpf} está em uso`)
    this.name = "CpfAlreadyInUseError"
  }
}