(() => {
	var changeElementClassName = () => {
		var menuContainer = document.getElementById("menuElements");
		var menuElements = menuContainer.childNodes;

		if (menuContainer.className.indexOf("opened") !== -1) {
			menuContainer.className = menuContainer.className.replace(" opened", " closed");
		} else {
			menuContainer.className = menuContainer.className.replace(" closed", " opened");
		}

		for (var i = 1; i < menuElements.length; i++) {
			menuElements[i].childNodes[0].addEventListener("click", changeElementClassName);
		}
	}

	var closeMenu = () => {
		var menuContainer = document.getElementById("menuElements");

		if (menuContainer.className.indexOf("opened") !== -1) {
			menuContainer.className = menuContainer.className.replace(" opened", " closed");
		}
	}

	document.getElementById("mobileMenu").addEventListener("click", changeElementClassName);
	document.getElementsByClassName("wrapper")[0].addEventListener("click", closeMenu);
})();