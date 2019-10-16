import axios from 'axios'
import {apiDetails} from '../apiDetails'
export default class Recipe{
	constructor(id){
		this.id = id;
	}

async getRecipe() {
	try{
		const key = apiDetails.key;
		const proxy = apiDetails.proxy;
		const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
		this.title = res.data.recipe.title;
		this.ingredients = res.data.recipe.ingredients;
		this.img = res.data.recipe.image_url;
		this.url = res.data.recipe.source_url;
		this.publisher = res.data.recipe.publisher;
		console.log(res);
	}
	catch(error){
		console.log(error);
	}
	
}

calcTime(){
	const numIng = this.ingredients.length;
	const periods = Math.ceil(numIng/3);
	this.time = periods*15
}
calcServings(){
	this.servings = 4;
}

parseIngredients(){
	const newIngredient = this.ingredients.map(el =>{
		const unitsLong = ['tablespoons','tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		//uniform units
		let ingredient = el.toLowerCase();
		unitsLong.forEach((unit, i)=>{//remember, forEach can take in up to 3 args, the current element, the cuurrent index, and the entire array
			//this method loops through the unitsLong Array and anywhere it find any of the word in the array in the ingredient 
			// string, it would replace it with the corresponding elemnt in the corrrespondiing position in the unitsShort array
			ingredient = ingredient.replace(unit, unitShort[i]);
		});
		//remove parentheses
		ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
		//parse ingredients into count, unit and ingredient
		const arrIng = ingredient.split(' ');
		const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));

		let objIng;
		if(unitIndex > -1){
			//there is a unit
			const arrCount = arrIng.slice(0, unitIndex); //[4, 1/2]
			objIng = {
				count: arrCount.length === 1 ? eval(arrCount[0].replace('-', '+')) : eval(arrIng.slice(0, unitIndex).join('+')),
				unit: arrIng[unitIndex],
				ingredient: arrIng.splice(unitIndex+1).join(' ')
			}

		}
		else if(parseInt(arrIng[0], 10)){
			//no element, but first element is a number
			objIng = {
				count: parseInt(arrIng[0], 10),
				unit: '',
				ingredient: arrIng.splice(1).join(' ')
			}
		}
		else if(unitIndex === -1){
			objIng = {
				count: 1,
				unit: '',
				ingredient
			}
		}

		return objIng;

	});console.log(newIngredient);
	this.ingredients = newIngredient;//this.ingredients would then become whatever is returned fro the method above
}
updateServings(type){
	//servings
	const newServings = type === 'dec' ? this.servings- 1 : this.servings+1
	console.log(`${newServings} is this`);
	//ingredients
	this.ingredients.forEach(ing =>{
		ing.count = ing.count * (newServings / this.servings);
	})
	this.servings = newServings;
}

}