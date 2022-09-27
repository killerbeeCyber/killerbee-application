export interface IFreezbees {
    _id: string,
    nom : string,
    description : string,
    pUHT : string,
    gamme : string,
    ingredient : Array<string>,
    grammage : Array<string>,
    img: string
}


export interface IIngredients {
    _id: string,
    nom : string,
    description : string,
    img: string
}

export interface IProcedes {
    _id: string,
    nom : string,
    description : string,
    modele : string,
    etapes : Array<string>,
    validation : string,
    tests : string,
    img: string
}