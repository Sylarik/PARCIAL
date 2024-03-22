export type Palabra = {
    word: string; 
    meanings: Significados[];
}

export type Significados = {
    definitions: Definiciones[];
}

export type Definiciones = {
    definition: string;
    example:string;
}