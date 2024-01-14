import * as model from "./model";
import recipeView from "./views/recipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// getting api
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
// controlRecipe();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipe)
);
