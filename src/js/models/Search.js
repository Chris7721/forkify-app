//this is the searchModel
import axios from 'axios'
import getInput from '../views/searchView'
import {apiDetails} from '../apiDetails'
export default class Search{
	constructor(query){
		this.query = query;
	}

async getResults() {
	try{
		const key = apiDetails.key;
		const proxy = apiDetails.proxy;
		const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
		this.result = res.data.recipes;
		// console.log(this.result);
	}
	catch(error){
		console.log(error);
	}
	
}


}
// getResults('egusi');