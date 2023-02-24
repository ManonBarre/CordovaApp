import Pizza from "./pizza.js";

export default class App {
    constructor() {
        document.addEventListener('deviceready', this.onDeviceReady);
    }

    onDeviceReady() {
        const homeNav = document.querySelector('#home-nav');
        const homePage = document.querySelector('#home-page');
        homeNav.root = homePage;

        const pizzasNav = document.querySelector('#pizzas-nav');
        const pizzasPage = document.querySelector('#pizzas-page');
        pizzasNav.root = pizzasPage;

        const btCreatePizza = document.querySelector('#bt-create-pizza');

        btCreatePizza.addEventListener('click', () => {
            const newPizza = new Pizza();
            newPizza.promptPizza();
        });
    }
}