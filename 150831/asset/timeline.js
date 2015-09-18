
document.addEventListener('scroll',function(){
	var scrollTop = document.body.scrollTop;
	var scrollHeight = document.body.scrollHeight;
	var height = window.innerHeight;

	if(height >= scrollHeight-scrollTop){
		var timeline = document.querySelector("#timeline");

		// 임시로 첫번째 데이터 복사
		var newItem = document.querySelectorAll("article")[0].cloneNode(true);

		timeline.appendChild(newItem);
	}
});

var articleList = document.querySelectorAll("article");

for(var i = 0; i < articleList.length; ++i){
	var article = articleList[i];
	var like = article.querySelector(".btn-like");
	console.log(like);
}

var likeButton = document.getElementsByClassName("btn-like");

for(var i = 0; i < likeButton.length; ++i){
	likeButton[i].addEventListener("click",function(e){
		console.log("like!");
	})
}

function clickLikeButton(e){
}