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

function onDeviceReady() {
  const formAddPizza = document.querySelector('.form-add-pizza');
  const pizzasTag = document.querySelector('.pizzas');
  const errorTag = document.querySelector('.error');

  formAddPizza.addEventListener('submit', e => {
    e.preventDefault();
    const pizzaName = formAddPizza.name.value;
    const ingredients = formAddPizza.ingredients.value;

    if (isValid(pizzaName) && isValid(ingredients)) {
      const pizzaTag = document.createElement('div');
      pizzaTag.className = 'pizza';
      pizzaTag.innerHTML = `
        <p>${capitalizeFirstLetter(pizzaName)}</p>
        <p>(${formatIngredients(ingredients)})</p>
      `;

      pizzasTag.insertBefore(
        pizzaTag,
        pizzasTag.firstElementChild,
      );

      formAddPizza.reset();
    }
    else {
      errorTag.innerHTML = '<p>Formulaire invalide !</p>';
      setTimeout(() => errorTag.innerHTML = '', 2000);
    }
  });

  function capitalizeFirstLetter(value) {
    return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
  }
  function formatIngredients(value) {
    return value.trim().replaceAll(' ', ', ');
  }
  function isValid(value) {
    return value && value.length > 2 && value.length < 50;
  }
}