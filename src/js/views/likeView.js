import { elements } from './base.js';
import { titleFormat } from './searchView.js'

export const toggleLikeBtn = (isLiked) =>{
	const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
	document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const renderLike = (id, title, author, img)=>{

	const markUp= `<li>
    <a class="likes__link" href="#${id}">
        <figure class="likes__fig">
            <img src="${img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${titleFormat(title)}</h4>
            <p class="likes__author">${author}</p>
        </div>
    </a>
</li>`
          elements.likes_list.insertAdjacentHTML('beforeend', markUp);

}

export const toggleLikeMenu = (numLikes)=>{
	elements.likesField.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const deleteLike = (id)=>{
	let item = document.querySelector(`.likes__link[href="#${id}"]`);
	item.parentElement.removeChild(item);

}
/*
ALGORITHM FOR THE LIKES VIEW
1) Create an addLike method to append a like-list to the dom for every click of like
	-This method would receive the 4 needed requirements needed to be shown in the likes view

	2)A method similar to this wuld be create also for th edelete Like, 
		-this method would only take an id, then this method would locate tthis element on the array and if it exists, it would be popped out.


*/