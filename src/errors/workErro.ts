export class WorkIAlreadyExists extends Error {
    constructor(){
        super(`The worker is already created`)
        this.name = "work Name Already ExistsError"
    }
}

export class WorkNotFound extends Error{
    constructor(){
        super(`work not found`)
        this.name = "WorkNotFound"
    }
}