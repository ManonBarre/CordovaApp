document.addEventListener('deviceready', onDeviceReady);
// document.addEventListener('ionNavDidChange', () => {
//     console.log('nav change');
// });

const listePlace = document.querySelector('#liste-item');

function onDeviceReady() {
    // Btn qui affiche le menu
        let btnAddItem = document.querySelector('#btn-add-item');
        console.log(btnAddItem);

    btnAddItem.addEventListener('click', promptList);
}

class HomePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <ion-header>
            <ion-toolbar>
                <ion-title>Acceuil</ion-title
            </ion-toolbar>
          </ion-header>

          <ion-content class="ion-padding">
          <div id="main-content"> 
            <div id="btn-menu">
            <ion-nav-link router-direction="forward" component="home-page">
              <ion-button>Acceuil</ion-button>
            </ion-nav-link>
            
            <ion-nav-link router-direction="forward" component="list-page">
                <ion-button>Listes</ion-button>
            </ion-nav-link>

            <ion-nav-link router-direction="forward" component="gestion-page">
                <ion-button>Gestion</ion-button>
            </ion-nav-link>
            </div>
            <div id="content">
                <h1>Bienvenue !</h1>
            </div>
           </div> 
          </ion-content>
        `;
    }
}

class ListPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-header>
        <ion-toolbar>
            <ion-title>Listes</ion-title
        </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
        <div id="main-content"> 
          <div id="btn-menu">

          <ion-nav-link router-direction="forward" component="home-page">
            <ion-button>Acceuil</ion-button>
          </ion-nav-link>
          
          <ion-nav-link router-direction="forward" component="list-page">
              <ion-button>Listes</ion-button>
          </ion-nav-link>

          <ion-nav-link router-direction="forward" component="gestion-page">
              <ion-button>Gestion</ion-button>
          </ion-nav-link>
          </div>
          <div id="content">
              <h1>Ma liste :</h1>
              <ion-list id="liste-item" lines="none"></ion-list>
          </div>
         </div> 
        </ion-content>
      `;
    }
}

class GestionPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-header>
        <ion-toolbar>
            <ion-title>Acceuil</ion-title
        </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
        <div id="main-content"> 
          <div id="btn-menu">

          <ion-nav-link router-direction="forward" component="home-page">
            <ion-button>Acceuil</ion-button>
          </ion-nav-link>
          
          <ion-nav-link router-direction="forward" component="list-page">
              <ion-button>Listes</ion-button>
          </ion-nav-link>

          <ion-nav-link router-direction="forward" component="gestion-page">
              <ion-button>Gestion</ion-button>
          </ion-nav-link>
          </div>
          <div id="content">
              <h1>Gerer ma listes :</h1>
            <ion-fab slot="fixed" vertical="" horizontal="end">
              <ion-fab-button id="btn-add-item">
                  <ion-icon name="add"></ion-icon>
              </ion-fab-button>
            </ion-fab>
          </div>
         </div> 
        </ion-content>
      `;
    }
}



customElements.define('home-page', HomePage);
customElements.define('list-page', ListPage);
customElements.define('gestion-page', GestionPage);

function addItem(listItem) {
    const ionItem = document.createElement('ion-item');
    ionItem.innerHTML = '<ion-item><ion-label>${listItem}</ion-label></ion-item>';

    listePlace.insertBefore(ionItem, listePlace.firstElementChild);
}

async function promptList() {
    console.log('fff')
    const alert = document.createElement('ion-alert');
    alert.header = 'Ajouter à ma liste';

    alert.inputs = [
        {
            type: 'text',
            name: 'listItem',
            attibutes: {
                maxlength: 20
            }
        }
    ];
    alert.buttons = [
        {
            text: 'Ajouter à ma liste',
            handler: ({ listItem }) => {
                if (!isValid(listItem)) return false;
                addItem(listItem);
            }
        }
    ]
}

function isValid(value) {
    return value && value.length > 2 && value.length < 50;
}