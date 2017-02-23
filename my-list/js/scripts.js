document.addEventListener("DOMContentLoaded", () => {
	var getData = () => {
		return fetch("data.json")
	}

	var randomNumber = () => {
		return Math.floor(Math.random() * 3 + 1)
	}

	var ListObj = function(img, title, description) {
		this.img = img;
		this.title = title;
		this.description = description;
	}

	var template = (element, randomNumb) => {
		var template = "";

		template = "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-12  noMargin noPadding forJS relative floatRight overflowHidden\">"
		template += "<img src=\"" + element.img.src + "\" class=\"img-responsive\">";
		template += "<div class=\"opacityBackground" + randomNumb + " widePadding\">"
		template += "<div class=\"description\">"
		template += "<h3 class=\"colorWhite\">" + element.title + "</h3>"
		template += "<p>" + element.description + "</p>"
		template += "</div></div></div>";

		return template
	}

	var getRandomImage = () => {
		return new Promise((resolve, reject) => {
			var image = new Image();
			var randNumber = Math.floor(Math.random() * 1000);

			image.src = "https://unsplash.it/600/600?image=" + randNumber;

			image.onload = () => {
				resolve(image);
			}
			image.onerror = () => {
				createListItems();
			}
		})
	}

	var createListItems = () => {
		var objArray = [];

		getData()
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				var array = [];

				for (var i = 0; i < data.elements.length; i++) {
					array.push(getRandomImage());
				}

				Promise.all(array).then((imageArr) => {
						for (var i = 0; i < imageArr.length; i++) {
							objArray[i] = new ListObj(imageArr[i], data.elements[i].title, data.elements[i].description);
						}
						return objArray
					})
					.then((data) => {
						var listWrapper = document.getElementsByClassName("listWrapper")[0];
						listWrapper.innerHTML = "";

						for (var i = 0; i < data.length; i++) {
							listWrapper.innerHTML += template(data[i], randomNumber());
						}
					})
					.then(() => {
						var elements = document.getElementsByClassName("forJS");

						for (var i = 0; i < elements.length; i++) {
							elements[i].addEventListener("mouseenter", moveBackground);
							elements[i].addEventListener("mouseleave", moveBackgroundBack);
						}
					})
			})
	}

	createListItems();

	var moveBackground = (e) => {
		console.log(e.target.childNodes)
		if (e.target.childNodes[1].className.indexOf("rollIn") == -1 && e.target.childNodes[1].className.indexOf("rollOut") == -1) {
			e.target.childNodes[1].className += " rollOut";
		} else if (e.target.childNodes[1].className.indexOf("rollIn") != -1) {
			e.target.childNodes[1].className = e.target.childNodes[1].className.replace(" rollIn", " rollOut");
		}
	}

	var moveBackgroundBack = (e) => {
		e.target.childNodes[1].className = e.target.childNodes[1].className.replace(" rollOut", " rollIn");
	}
});