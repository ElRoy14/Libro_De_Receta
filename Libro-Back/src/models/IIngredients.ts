import IUnits from "./IUnits";

export default interface IIngredients {
    name: string;
    quantity: number;
    measureUnit: IUnits;
    anotherUnits: IUnits[];
    icon: string;
}