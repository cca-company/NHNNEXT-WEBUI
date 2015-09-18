
document.addEventListener('scroll',function(){
	var scrollTop = document.body.scrollTop;
	var scrollHeight = document.body.scrollHeight;
	var height = window.innerHeight;

	if(height >= scrollHeight-scrollTop - 50){
		var timeline = document.querySelector("#timeline");

		// 임시로 첫번째 데이터 복사
		var newItem = document.querySelectorAll("article")[0].cloneNode(true);

		timeline.appendChild(newItem);
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