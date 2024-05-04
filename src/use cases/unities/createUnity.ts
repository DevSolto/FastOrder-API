import { CreateUnityRepository } from "../../repositories/unities/createUnity";

export class CreateUnityUseCase{
    async execute(createUnityParams:{nome:string, descricao:string, tipo:string}){
        // TODO Virificar se ja existe uma Unidade com o nome fornecido
        const createUnityRepository = new CreateUnityRepository()
        const unity = await createUnityRepository.execute(createUnityParams)
        return unity
    }
}