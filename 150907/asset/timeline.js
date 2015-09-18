var httpRequest;
var pageNum = 1;
var focusItem = null;

if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

document.addEventListener('keydown',function(e){
	if(document.activeElement.tagName != 'INPUT'){
		focusItem.classList.remove('focus');

		if(e.keyCode == 75){
			focusItem = focusItem.previousSibling || focusItem;
		}else if(e.keyCode == 74){
			focusItem = focusItem.nextSibling || focusItem;
		}

		focusItem.classList.add('focus');
		window.scrollTo(0,focusItem.offsetTop);
	}
})

document.addEventListener('scroll',function(){
	var scrollTop = document.body.scrollTop;
	var scrollHeight = document.body.scrollHeight;
	var height = window.innerHeight;

	if(height >= scrollHeight-scrollTop - 50){
		renewalTimeline();
	}
});

document.addEventListener('click',function(e){
	if(e.target.classList.contains("btn-like")){
		var article = e.target.closest("article");
		var likenum = article.querySelector(".like-num");
		var num = parseInt(likenum.innerHTML) || 0;

		if(e.target.classList.contains("like-this")){
			likenum.innerHTML = num-1;
		}else{
			likenum.innerHTML = num+1;
		}

		e.target.classList.toggle("like-this");
	}
})

function renewalTimeline(){
	if(pageNum <= 5){
		var url = 'asset/page'+(pageNum++)+'.json';

		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState === 4) {
		    	if (httpRequest.status === 200) {
		    		console.log(url);
		    		var data = eval('('+httpRequest.responseText+')');

					var timeline = document.querySelector("#timeline");

						for(var i = 0; i < data.length; ++i){
							var newItem = document.querySelector("article.temp").cloneNode(true);

							newItem.querySelector(".profile-text h2.name").innerHTML=data[i]['name'];
							newItem.querySelector("div.content").innerHTML=data[i]['content'];
							newItem.querySelector(".like-num").innerHTML=data[i]['like'];
							newItem.querySelector(".share-num").innerHTML=data[i]['share'];

							if(data[i]['like_this']){
								newItem.querySelector(".btn-like").classList.add("like-this");
							}

							newItem.classList.remove("temp");
							timeline.appendChild(newItem);
						}
						focusItem = newItem;

		    	} else {
		        	console.log('There was a problem with the request.');
		    	}
		    }
		};
		httpRequest.open('GET', url);
		httpRequest.send(null);	
	}
}

renewalTimeline();