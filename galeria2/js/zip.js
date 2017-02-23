document.addEventListener("DOMContentLoaded", function() {
	var thumbArray = new Array();
	var galleryContainer = document.getElementById("gallery");
	var galleryView = document.createElement("div");
	galleryView.setAttribute("id", "galleryView");
	var leftArrowDiv = document.createElement("div");
	leftArrowDiv.setAttribute("id", "leftArrowDiv");
	var rightArrowDiv = document.createElement("div");
	rightArrowDiv.setAttribute("id", "rightArrowDiv");
	var exitButtonDiv = document.createElement("div");
	exitButtonDiv.setAttribute("id", "exitButtonDiv");
	var exitButton = document.createElement("i");
	exitButton.setAttribute("class", "icon-cancel");
	var imageWindow = document.createElement("div");
	imageWindow.setAttribute("id", "imageWindow");
	var loadIcon = document.createElement("div");
		loadIcon.setAttribute("id", "loadIcon");
		imageWindow.appendChild(loadIcon);
	var galleryContainerElements = [];
	var currentImgIndex;
	var galleryContainerElements = document.getElementById("galleryThumbs").getElementsByTagName("img");
	var nextButton = document.createElement("i");
	nextButton.setAttribute("class", "icon-right-open");
	nextButton.setAttribute("id", "rightButton");
	var previousButton = document.createElement("i");
	previousButton.setAttribute("class", "icon-left-open");
	previousButton.setAttribute("id", "leftButton");
	leftArrowDiv.appendChild(previousButton);
	rightArrowDiv.appendChild(nextButton);
	imageWindow.appendChild(rightArrowDiv);
	imageWindow.appendChild(leftArrowDiv);
	galleryView.appendChild(imageWindow);
	exitButtonDiv.appendChild(exitButton);
	imageWindow.appendChild(exitButtonDiv);

	galleryView.appendChild(imageWindow);
	galleryContainer.appendChild(galleryView);



	var createImgPath = (imgElem) => {
		return imgElem.replace("_thumb", "")
	}

	var imgOnClick = (e) => {
		loadImage(createImgPath(e.src));
	}

	var galleryInit = () => {
		var galleryContainerElements1 = document.getElementById("galleryThumbs").getElementsByTagName("img");

		for (var i = 0; i < galleryContainerElements.length; i++) {
			galleryContainerElements[i] = galleryContainerElements1[i];
			galleryContainerElements[i].index = i;
			galleryContainerElements[i].addEventListener("click", (e) => {
				imgOnClick(e.target);
				setActiveClass();
				currentImgIndex = e.target.index;
			});
		}
	}

	var getImage = (imgSrc) => {
		return new Promise((resolve, reject) => {
			var image = new Image();

			image.src = imgSrc;
			image.onload = () => {
				resolve(image);
			};
			image.onerror = (err) => {
				loadImage("https://pbs.twimg.com/profile_images/582787323831549952/et6CmUtF.jpg");
				reject("404 not found");
			};
		});
	}

	var loadImage = (imgSrc) => {
			var loadIcon = document.getElementById("loadIcon");
			loadIcon.innerHTML = "<i class=\"icon-spinner animate-spin\"></i>";
			getImage(imgSrc)
				.then((response) => {
					if (document.getElementById("imageWindow").getElementsByTagName("img") > -1) {
						removeCurrentImg();
					}
					loadIcon.innerHTML = "";
					imageWindow.appendChild(response);
				})
				.catch((err) => {
					console.log(err);
				});
	}

	var removeCurrentImg = () => {
		var imgWindow = document.getElementById("imageWindow");
		var child = imgWindow.getElementsByTagName("img")[0];
		imgWindow.removeChild(child);
	}

	var slideNext = () => {

		if (currentImgIndex < galleryContainerElements.length - 1) {
			removeCurrentImg();
			loadImage(createImgPath(galleryContainerElements[currentImgIndex + 1].src));
			currentImgIndex++;
		}
	}

	var slidePrevious = () => {


		if (currentImgIndex > 0) {
			removeCurrentImg();
			loadImage(createImgPath(galleryContainerElements[currentImgIndex - 1].src));
			currentImgIndex--;
		}
	}

	var exit = () => {
		document.getElementById("imageWindow").className = "";
		removeCurrentImg();
	}

	var setActiveClass = () => {
		document.getElementById("imageWindow").className = "active";
	}

	document.getElementById("leftArrowDiv").addEventListener("click", slidePrevious);
	document.getElementById("rightArrowDiv").addEventListener("click", slideNext);
	document.getElementById("exitButtonDiv").childNodes[0].addEventListener("click", exit);

	galleryInit();
});