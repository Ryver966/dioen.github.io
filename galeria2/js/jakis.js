var fetchImage = (path) => {
		return fetch(path);
	}

	fetchImage("http://dioen.o6.pl/images/1.jpg")
		.then((data) => {
			
			// img = data;
			// document.getElementById("gallery").appendChild(img);
			console.log(data);

			return data.blob();
		})
		.then((response) => {
			var obj = URL.createObjectURL(response);
			var img = document.createElement("img");
			img.src = obj;

			document.getElementById("gallery").appendChild(img);
		});