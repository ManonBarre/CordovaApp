/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady);

const pizzasTag = document.querySelector('#pizzas-list');
// Creation de la listes des ingredients selectionnables
const ingredients = [
  'jambon',
  'chorizo',
  'anchois',
  'chèvre',
  'mozzarella',
  'miel',
  'olives'
];

let ingredientsSelected = '';

function onDeviceReady() {
  const homeNav = document.querySelector('#home-nav');
  const homePage = document.querySelector('#home-page');
  homeNav.root = homePage;

  const pizzasNav = document.querySelector('#pizzas-nav');
  const pizzasPage = document.querySelector('#pizzas-page');
  pizzasNav.root = pizzasPage;

  const btCreatePizza = document.querySelector('#bt-create-pizza');

  btCreatePizza.addEventListener('click', promptPizza);
}

// Gestion de l'affichage des nouvelles pizzas
function createItemList(pizzaName, ingredients) {
  const ionItem = document.createElement('ion-item');
  ionItem.innerHTML = `
    <ion-card color='success'>
      <ion-card-header>
        <ion-card-title>${pizzaName}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        (${ingredients})
    </ion-card-content>
  </ion-card>
  `;

  pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
}

async function promptPizza(title = 'Selectionnez vos ingredients !', firstLaunch = true,) {
  const alert = document.createElement('ion-alert');
  alert.header = title;
  
  if (firstLaunch) {
    alert.backdropDismiss = false;

    alert.inputs = ingredients.map(ingredient => ({
      label: capitalizeFirstLetter(ingredient),
      type: 'checkbox',
      value: ingredient,
    }));

    alert.buttons = [
      {
        text: 'Selectionner',
        handler: (ingredients) => {
          ingredientsSelected = formatIngredients(ingredients);
          return !!ingredients.length;
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
        text: 'Go !',
        handler: ({ pizzaName }) => {
          if (!isValid(pizzaName)) return false;
          createItemList(
            capitalizeFirstLetter(pizzaName),
            ingredientsSelected
          );
        }
      }
    ];

  }

  document.body.appendChild(alert);
  await alert.present();

  // Gestion du changement de titre de la fenetre
  if (firstLaunch) {
    alert
      .onDidDismiss()
      .then(() => promptPizza('Nommez votre pizza !', false));
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