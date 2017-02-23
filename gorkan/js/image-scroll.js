(() => {
	var scrollImage = () => {
		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		var image = document.getElementById("mainSiteImage");
		var scale = top/4;

		if (screen.width <= 992) scale = top/2;

		image.style.transform = "translatey(-" + scale + "px)"; 
	}
	window.addEventListener("scroll", scrollImage);
})();