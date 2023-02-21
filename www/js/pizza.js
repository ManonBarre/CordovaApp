export default class Pizza {
    constructor (name, ingredients, category = 'tomato-base') {
        this.name = name;
        this.ingredients = ingredients;
        this.category = category;
    }
}