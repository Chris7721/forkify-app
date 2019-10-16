import uniqid from 'uniqid'
export default class List {
	constructor(){
		this.items = [];
	}

	addItem (count, unit, ingredient){
		const item = {
			id: uniqid(),
			count, unit, ingredient
		}
		this.items.push(item);
	}

	deleteItem(id){
		const index = this.items.findIndex(el =>{
			el.id === id;
		});
		this.items.splice(index, 1);//splice mutate the original array, while slice create a new array out of an array
	}

	updateCount(id, newCount){
		this.items.find(el => el.id === id).count = newCount;//find returns the element itself
	}
}