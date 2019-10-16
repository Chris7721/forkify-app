export const elements = {
	searchInput: document.querySelector('.search__field'),
	searchForm: document.querySelector('.search'),
	resultsList: document.querySelector('.results__list'),
	results: document.querySelector('.results'),
	resultsPages: document.querySelector('.results__pages'),
	recipe: document.querySelector('.recipe'),
	shoppingList: document.querySelector('.shopping__list'),
	likes_list: document.querySelector('.likes__list'),
	likesField: document.querySelector('.likes__field')

};

export const renderLoader = (parent)=>{
	const loader = `<div class="loader">
		<svg>
			<use href= "img/icons.svg#icon-cw"></use>
		</svg>
	</div>`
	parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = ()=>{
	const loader = document.querySelector('.loader');
	loader.parentElement.removeChild(loader);
}