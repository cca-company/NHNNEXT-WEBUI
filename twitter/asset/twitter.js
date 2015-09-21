/* 트윗 작성창 토글 */
var formBox = document.getElementById("tweet-form-box");
var tweetForm = document.getElementById("tweet-content");
tweetForm.addEventListener("focus",function(){
	formBox.className = "focus";
})

tweetForm.addEventListener("blur",function(){
	if(!this.value){
		formBox.className = "";
	}
})

tweetForm.addEventListener("keyup",function(){
	var value = this.value;
	document.querySelector(".word-num").innerHTML = 140-value.length;

	if(value.length > 0 && value.length <= 140){
		document.getElementById("tweet-btn").className = "active";
	}else{
		document.getElementById("tweet-btn").className = "";
	}
})

document.addEventListener('click',function(e){
	var target = e.target.closest("li");
	if(target && target.classList.contains("btn-favorit")){
		var method;
		var postId = target.closest("article").getAttribute("data-id");

		if(target.classList.contains("favorit-this")){
			method="DELETE";
		}else{
			method="POST";
		}

		var request = XMLhttpRequest();
		var url = "http://api.taegon.kim/posts/"+postId+"/favorite";

		request.open(method, url);
		request.send();

		request.onreadystatechange = function(){
			if (request.readyState === 4) {
		    	if (request.status === 200) {
		    		var data = eval('('+request.responseText+')');
					target.querySelector("span").innerHTML = (data["post"]["favorite"])?data["post"]["favorite"]:"";
		    	}
		    }
		};

		target.classList.toggle("favorit-this");
	}
})

document.getElementById("tweet-btn").addEventListener("click",function(){

	if(tweetForm.value.length > 0 && tweetForm.value.length <= 140){
		var request = XMLhttpRequest();
		var url = "http://api.taegon.kim/posts";
		var data = {
			"content" : tweetForm.value,
			"username" : "Seo,DongYu"
		}

		request.open("POST", url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send("content="+data["content"]+"&username="+data["username"]);

		request.onreadystatechange = function(){
			if (request.readyState === 4) {
		    	if (request.status === 200) {
	    			var post = eval('('+request.responseText+')')["post"];
					var timeline = document.querySelector("#tweet-list");
					var newItem = document.querySelector("article.temp").cloneNode(true);


					newItem.querySelector(".profile-name").innerHTML=data["username"];
					newItem.querySelector(".regdate").innerHTML= "지금";
					newItem.querySelector(".tweet-content").innerHTML=data["content"];
					newItem.setAttribute("data-id",post["id"]);

					timeline.insertBefore(newItem, timeline.childNodes[1]);
					newItem.className="";

					tweetForm.value = "";
					formBox.className = "";
		    	} else {
		        	console.log('페이지를 불러오지 못했습니다. url:'+url);
		    	}
		    }
		};
	}

});

/* 새로운 페이지 로딩 */
var page = 1;
var loading = false

document.addEventListener('scroll',function(){
	var scrollTop = document.body.scrollTop;
	var scrollHeight = document.body.scrollHeight;
	var height = window.innerHeight;

	if(height >= scrollHeight-scrollTop - 50){
		renewalTimeline();
	}
});

function XMLhttpRequest(){
	var httpRequest;

	if (window.XMLHttpRequest) {
	    httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}

	return httpRequest;
}

function renewalTimeline(){
	if(loading == true) return;
	loading = true;

	var request = XMLhttpRequest();
	var url = "http://api.taegon.kim/posts/page/"+(page++);

	request.open("GET", url);
	request.send(null);

	request.onreadystatechange = function(){
		if (request.readyState === 4) {
	    	if (request.status === 200) {
	    		var data = eval('('+request.responseText+')');
				var timeline = document.querySelector("#tweet-list");
				var date = new Date();

				console.log(url);

				for(var i = 0; i < data.posts.length; ++i){
					var post = data.posts[i];
					var newItem = document.querySelector("article.temp").cloneNode(true);
					var regDate = new Date(post["regdate"]);
					var timerate = date.getTime() - regDate.getTime();
					var dateText;

					if(timerate < 60000){
						dateText = date.getSeconds() - regDate.getSeconds() + "초";
					}else if(timerate < 3600000){
						dateText = date.getMinutes() - regDate.getMinutes() + "분";
					}else if(timerate < 86400000){
						dateText = date.getHours() - regDate.getHours() + "시간";
					}else{
						dateText = regDate.getMonth() + "월 " + regDate.getDate() + "일";
					}

					newItem.querySelector(".profile-name").innerHTML=post["username"];
					newItem.querySelector(".regdate").innerHTML=dateText;
					newItem.querySelector(".tweet-content").innerHTML=post["content"];
					newItem.querySelector(".retweet-num").innerHTML=(post["retweet"])?post["retweet"]:"";
					newItem.querySelector(".favorit-num").innerHTML=(post["favorite"])?post["favorite"]:"";
					newItem.setAttribute("data-id",post["id"]);

					newItem.className="";
					timeline.appendChild(newItem);
				}
				loading = false;
	    	} else {
	        	console.log('페이지를 불러오지 못했습니다. url:'+url);
	    	}
	    }
	};
}

renewalTimeline();