export default class Pizza {

    static pizzasTag = document.querySelector('#pizzas-list');
    // Creation de la listes des ingredients selectionnables
    static ingredients = [
        'jambon',
        'chorizo',
        'anchois',
        'chèvre',
        'mozzarella',
        'miel',
        'olives'
    ];

    constructor(name, ingredients, isTomatoBase = true) {
        this.name = name;
        this.ingredients = ingredients;
        this.isTomatoBase = isTomatoBase;
    }

    // Gestion de l'affichage des nouvelles pizzas
    createItemList() {
        const ionItem = document.createElement('ion-card');
        ionItem.classList.add(this.isTomatoBase ? 'tomato-base' : 'cream-base');

        ionItem.innerHTML = `
            <ion-card-header>
                <ion-card-title>${this.name}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                (${this.ingredients})
            </ion-card-content>
        `;

        Pizza.pizzasTag.insertBefore(ionItem, Pizza.pizzasTag.firstElementChild);
    }

    async promptPizza(title = 'Selectionnez vos ingredients !', firstLaunch = true,) {
        const alert = document.createElement('ion-alert');
        alert.header = title;

        if (firstLaunch) {
            alert.backdropDismiss = false;

            alert.inputs = Pizza.ingredients.map(ingredient => ({
                label: capitalizeFirstLetter(ingredient),
                type: 'checkbox',
                value: ingredient,
            }));

            alert.buttons = [
                {
                    text: 'Base',
                    cssClass: 'btn-base',
                    handler: () => {
                        this.isTomatoBase = !this.isTomatoBase;
                        return false;
                    }
                },
                {
                    text: 'Selectionner',
                    handler: (ingredientsSelected) => {
                        this.ingredients = formatIngredients(ingredientsSelected);
                        return !!ingredientsSelected.length;
                    }
                }
            ];

        } else {
            alert.inputs = [
                {
                    type: 'text',
                    name: 'pizzaName',
                    placeholder: 'Nouvelle pizza',
                    attibutes: {
                        maxlength: 50
                    }
                },

            ];

            alert.buttons = [
                {
                    text: 'Ajouter',
                    handler: ({ pizzaName }) => {
                        if (!isValid(pizzaName)) return false;
                        this.name = capitalizeFirstLetter(pizzaName),
                            this.createItemList();
                    }
                },

            ];

        }

        document.body.appendChild(alert);
        await alert.present();

        // Gestion de l'affichage du changement de base
        const btnBase = document.querySelector('.btn-base');
        if (btnBase) {
            btnBase.classList.add('is-tomato');
            btnBase.addEventListener('click', () => {
                if (!this.isTomatoBase) {
                    btnBase.classList.remove('is-tomato')
                    btnBase.classList.add('is-cream')
                } else {
                    btnBase.classList.remove('is-cream')
                    btnBase.classList.add('is-tomato')
                }
            });
        }

        // Gestion du changement de titre de la fenetre
        if (firstLaunch) {
            alert
                .onDidDismiss()
                .then(() => this.promptPizza('Nommez votre pizza !', false));
        }

        // Gestion de la saisie des inputs
        function capitalizeFirstLetter(value) {
            return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
        }
        function formatIngredients(value) {
            return value.join(' ').trim().replaceAll(' ', ', ');
        }
        function isValid(value) {
            return value && value.length > 2 && value.length < 50;
        }
    }
}