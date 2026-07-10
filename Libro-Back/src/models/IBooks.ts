export default interface IBooks {
    name: string;
    description: string;
    image: string;
    recipeIds: string[];
    categoriesIds: string[];
    author: string;
    createdDate: Date; 
}