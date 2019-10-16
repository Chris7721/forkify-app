//this is the controller
import Search from './models/Search';
import * as searchView from './views/searchView'
import Recipe from './models/Recipe';
import * as recipeView from './views/recipeView'
import List from './models/List';
import * as listView from './views/listView'
import Likes from './models/Likes';
import * as likeView from './views/likeView'


import { elements, renderLoader, clearLoader } from './views/base';
const state= {}
const searchController = async ()=>{
	const query = searchView.getInput();
	if(query){
		state.search = new Search(query);
		//prepare UI foro result
		
		searchView.clearInput();
		searchView.clearResults();
		
		renderLoader(elements.results);	
		try{
			//search for recipe
		await state.search.getResults();
		clearLoader();
		//render result on UI
		console.log(state.search.result);
		searchView.renderResults(state.search.result);
		}
		catch(e){
			alert("Something went wrong");
			console.log(e);
			// clearLoader();
		}
	

}
}
elements.searchForm.addEventListener('submit', (e)=>{
	e.preventDefault();
	searchController();
		
});

//PAGES BUTTONS/////////////////////////////////
elements.resultsPages.addEventListener('click', (event)=>{//note that the buttons are not in the pages yet so the event listener is added 
	//to the parent element, the when any element on the page is clicked, the method checks if the element clicked is the .btn-inline element,
	//then the method would be called for that element and all child element
	const btn = event.target.closest('.btn-inline');
	console.log(btn);
	if(btn){
		const goToPage = parseInt(btn.dataset.goto);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
		console.log(goToPage);
	}
});


// RECIPE CONTROLLER
const controlRecipe = async ()=>{
	//get  ID from URL
	const id = window.location.hash.replace('#', '');
	console.log(id);
	if(state.search){
		searchView.highlightSelected(id);
	}

	if(id){
		//prepare UI for the changes
		
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		
		try{
			//create new object
		state.recipe = new Recipe(id);
		window.r = state.recipe;

		//get recipe data
		await state.recipe.getRecipe();

		//calc servings and time
		state.recipe.calcTime();
		state.recipe.calcServings();
		state.recipe.parseIngredients();

		clearLoader();
		recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

		}
		catch(e){
			console.log(e);
			
		}
		
	}
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));//'load' just incase the user bookarks particular 
//page that already has an ID, so when the page is loaded again, this event would still work

//handling recipe button clicks

elements.recipe.addEventListener('click', e =>{//"matches" is a better option here, compared to closest, because the b utton is just a 
	//single svg element with no children
	let newIngs = {};
	if(e.target.matches('.btn-decrease, .btn-decrease *')){//btn-decrease and any child of btn-decrease
		if(state.recipe.servings > 1){
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
}
		// alert("dec clicked!!!");

		
	}else if(e.target.closest('.recipe__btn')){
		addToCart();

	}else if(e.target.matches('.recipe__love, .recipe__love *')){
		controlLike();
	}
	else if(e.target.matches('.btn-increase, .btn-increase *')){
		state.recipe.updateServings('inc');
		newIngs.servings = state.recipe.servings;
		newIngs.ings = state.recipe.ingredients;
		recipeView.updateServingsIngredients(state.recipe);
		// alert("inc clicked!!!");
	}
	console.log(state.recipe);
	

	
});
window.addEventListener('load', ()=>{
	state.likes = new Likes();
	state.likes.readStorage();//restore likes
	state.likes.likes.forEach(like => likeView.renderLike(like.id, like.title, like.author, like.img));
	likeView.toggleLikeMenu(state.likes.getNumLikes());
})
//testing

const controlLike = ()=>{
	if(!state.likes) state.likes = new Likes();
	const currentID = state.recipe.id;
	if(!state.likes.isLiked(currentID)){
		state.likes.addLike(currentID, state.recipe.title, state.recipe.publisher, state.recipe.img);
		likeView.renderLike(currentID, state.recipe.title, state.recipe.publisher, state.recipe.img);
		console.log(state.likes);
		likeView.toggleLikeBtn(true);
	}
	else{
		state.likes.deleteLike(currentID);
		likeView.toggleLikeBtn(false);
		console.log(state.likes);
	}
	likeView.toggleLikeMenu(state.likes.getNumLikes());

}

const addToCart = ()=>{
	listView.clearResults();
	state.list = new List();
	state.recipe.ingredients.forEach(ingredient =>{
		state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
	});
console.log("##########################");
	console.table(state.list.items);
	console.log("##########################");
	state.list.items.forEach(element =>{
		listView.render(element);
	})
}
	

elements.shoppingList.addEventListener('click', (event)=>{
	let btn = event.target.closest('.shopping__delete');
	let input = event.target.closest('.shopping__count-value');
	if(btn){
		let ID;
		ID = btn.parentElement.dataset.itemid;
		window.l = state.list.items;
		state.list.deleteItem(ID);
		listView.deleteItem(ID);

	}

	else if(input){
		console.log(input);
		let ID;
		input.addEventListener('onchange', (e)=>{
			ID = input.parentElement.parentElement.dataset.itemid;
			console.log(`The ID id ${ID}`);
			state.list.updateCount(ID, e.key);
		})
}
	
});


/*
1) Add an eventListener to the "Add to shopping cart" button
	-clear the field
	-call the addItem method in the List class(Use the forEach method to iterate over the ingredients the call this method.)
	-Then call call the render method in the listView, this method would take in the item array from the List class. 
	Use the same format for the List class to call this method.

2) add an event listener to the the cancel svg
	-read the data element from the clicked element
	-This data element would be passed to twoo different methods: The deleteItem method in the view and the List class

3) Add a key press eventListener to the input field, 
	-for every key press, the current value of the 
	input field should be passed to the updateCount in the List class 



*/