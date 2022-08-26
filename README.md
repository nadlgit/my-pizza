# My Pizza - Simulation de site

Il s'agit d'une simulation d'un site de commande de pizzas à emporter ou à livrer, où on peut personnaliser sa pizza ingrédient par ingrédient.

URL: https://nadl-my-pizza.netlify.app/

## Contexte

Mon objectif avec ce projet était d'apprendre le langage [Typescript](https://www.typescriptlang.org/), dans la continuité de mon apprentissage de [React](https://reactjs.org/).

## Choix techniques et outils

- Le framework [Next.js](https://nextjs.org/) est utilisé, pour profiter de son mécanisme SSG (Static Site Generation), plus adapté pour le référencement.

- Le design est "responsive", avec une approche "mobile first". Ainsi, l'illustration de la pizza avec les ingrédients choisis n'apparaît que sur la version bureau.

- Une petite touche d'accessibilité est présente, au travers de balises HTML sémantiques et de l'application de certaines bonnes pratiques (par exemple pour la fenêtre modale).

- Le code est testé avec les outils [Jest](https://jestjs.io/) et [Testing Library](https://testing-library.com/).

- Autres outils:

  - [React Leaflet](https://react-leaflet.js.org/) pour la carte de localisation
  - [focus-trap-react](https://focus-trap.github.io/focus-trap-react/) pour la gestion du focus lorsque la fenêtre modale est ouverte
  - [React Hook Form](https://react-hook-form.com/) pour faciliter la validation du formulaire

- NB: Dans cette version, les données sont gérées en dur via des fichiers JSON. Une évolution envisagée est de rajouter un backend, avec des fonctionnalités de compte client.
