export class UnitNameBeingUsed extends Error{
    constructor(name:string){
        super(`The name ${name} is already in use.`)
        this.name = "Name Already InUseError"
    }
}

export class UnitNotFound extends Error{
    constructor(){
        super(`Unit not found`)
        this.name = "UnitNotFound"
    }
}