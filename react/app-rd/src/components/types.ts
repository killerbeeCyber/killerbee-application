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
    nom : String,
    description : String,
    img: string
}

export interface IProcedes {
    _id: string,
    nom : String,
    description : String,
    modele : String,
    etapes : Array<String>,
    validation : Boolean,
    tests : String,
    img: string
}