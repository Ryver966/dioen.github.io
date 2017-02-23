 "use strict";

 var myModule = (() => {
     var output; // Global variable which contains data from "data.json"
     var aboutContent = "<div id=\"aboutDiv\" class=\"boxed\"><h2 id=\"aboutTitle\">Słowem wstępu...</h2><p id=\"aboutDescription\">Swoją drogę z programowaniem zacząłem podczas studiów na kierunku automatyka i robotyka. Pierwsze linie kodu, które napisałem były pisane w Pascalu. Było to coś nowego, coś nieznanego. Po całym semestrze byłem w stanie napisać program, który posiadał słaby UI i potrafił obliczyć średnie spalanie samochodu, a także koszta podróży. Podczas studiów poznałem kolegę, dzięki któremu postanowiłem, wraz z nim, przenieść się na informatykę. Wielokrotnie zmieniałem podejście do języków programowania. Od Javy, poprzez C#, .NET aż do JavaScript. Obecnie uczę się w kierunku front-end'u." + "</br>" + "</br>" + "Oczywiście w życiu nie zajmuję się wyłącznie programowaniem. Od paru miesięcy systematycznie trenuję na siłowni, co daje mi wiele radości i buduje każdego dnia. Zachęcam wszystkich do odwiedzenia podstrony \"Motywatory\", gdzie może i Wy znajdziecie odrobinę motywacji do zmiany siebie, nie tylko odnośnie swojego ciała.</p><div id=\"technologiesDiv\"><img id=\"JSimg\" class=\"icon\" src=\"sources/icons/js4560_450.png\"/><img id=\"HTML5img\" class=\"icon\" src=\"sources/icons/HTML5_Logo_512.png\"/><img id=\"CSS3img\" class=\"icon\" src=\"sources/icons/8b61de4c84033266e15317a6eb9fda2d-css3.png\"/></div></div>";
     var windowProtocole = window.location.protocol;
     var windowHost = window.location.host;
     var URL = windowProtocole + "//" + windowHost;

     var getData = () => {
         var request;
         // https://api.myjson.com/bins/4asgv

         // Safari
         if ($.browser.safari) {

             return new Promise((resolve, reject) => {
                 request = new XMLHttpRequest();
                 request.open("GET", "data.json", false);

                 request.onload = () => {
                     output = JSON.parse(request.responseText);
                 }
                 request.send();
             });
         } else {
             return fetch("data.json").then((data) => {
                 output = data.json();
             });
         }
     };

     getData();

     var scrollToTop = () => {
         document.body.scrollTop = document.documentElement.scrollTop = 0;
     };

     History.Adapter.bind(window, 'statechange', (data) => {
         var State = History.getState();

         scrollToTop();

         if (State.url == URL + "/?motywatory") {
             motivationData(output);
             setActiveMenu(document.getElementById("motivators"));
         } else if (State.url == URL + "/?projekty") {
             projectsData(output);
             setActiveMenu(document.getElementById("projects"));
         } else if (State.url == URL + "/?kontakt") {
             contactData();
             setActiveMenu(document.getElementById("contact"));
         } else if (State.url == URL + "/") {
             mainPageData(aboutContent);
             setActiveMenu(document.getElementById("about"));
         }
     });

     var motivationData = (value) => {
         var _output = "";

         var receiveElement = (elem) => {
             return "<div class=\"movie\"><div class=\"movieFrame\"><iframe src=" + elem.src + " allowfullscreen frameborder=\"0\"></iframe></div><h2>" + elem.title + "</h2><div class=\"showMore\">POKAŻ WIĘCEJ</div></div>";
         };

         checkIfContentProperly(value, "motivators").then((response) => {
             var responseElement = response.data.motivators.map(receiveElement);
             responseElement = responseElement.join("");

             _output += "<div id=\"motivationElementsContainer\" class=\"boxed\">";
             _output += responseElement;
             _output += "</div>";

             regenerateRightDiv(_output);
         });
     };

     var projectsData = (value) => {
         var _output = "";

         checkIfContentProperly(value, "projects").then((response) => {
             for (var i in response.data.projects) {
                 _output += "<div class=\"project boxed\">";
                 // _output += "<h2>" + response.data.projects[i].title + "</h2>";
                 _output += "<div class=\"thumbnail\">";
                 _output += "<img class=\"project\" src=\"" + response.data.projects[i].imgSrc + "\"/>";
                 _output += "<div class=\"moreInfo\"><div class=\"linksWrapper\"><a href=\"" + response.data.projects[i].link + "\" target=\"_blank\"><i class=\"icon-link\"></i></a> <a href=\"\"><i class=\"icon-code\"></i></a></div></div>";
                 _output += "</div>";
                 _output += "</div>";

                 regenerateRightDiv(_output);
             }
         });
     };

     var contactData = () => {
         var data = "<div id=\"contactForm\" class=\"boxed\"><div id=\"mailToBox\"><a href=\"mailto:piotr.b.ek@gmail.com\"><img id=\"mailImg\" src=\"../sources/backgrounds/color-icons-blue-email11.png\"</a></div></div><div id=\"map\"></div>";
         regenerateRightDiv(data);
         initMap();
     };

     var mainPageData = (value) => {
         regenerateRightDiv(value);
     };

     var checkIfContentProperly = (value, userChoice) => {
         return new Promise((resolve, reject) => {
             if (value === undefined) {
                 getData().then(() => {
                     selectRightDivContent(userChoice);
                 });
             } else {
                 resolve(value);
             }
         });
     };

     var generateNewsDiv = (newsContent) => {
         var newsDiv = document.getElementById("newsDiv");

         checkIfContentProperly(newsContent).then((response) => {
             for (var i = 0; i < response.data.news.length; i++) {
                 var article = document.createElement("article");
                 var newsWrapper = document.createElement("div");
                 var img = document.createElement("img");
                 var imgContainerDiv = document.createElement("div");
                 var p = document.createElement("p");
                 var floatClearDiv = document.createElement("div");

                 article.setAttribute("id", "article" + i);
                 article.setAttribute("class", "inactive");
                 newsWrapper.setAttribute("class", "news-wrapper boxed");
                 imgContainerDiv.setAttribute("class", "news-image-container");
                 floatClearDiv.setAttribute("class", "clear");

                 if (i == 0) article.setAttribute("class", "active");

                 img.src = response.data.news[i].imgSrc;
                 p.innerHTML = response.data.news[i].description;

                 img.setAttribute("class", "news-image");
                 p.setAttribute("class", "news-description");
                 imgContainerDiv.appendChild(img);
                 newsWrapper.appendChild(imgContainerDiv);
                 newsWrapper.appendChild(p);
                 article.appendChild(newsWrapper);
                 article.appendChild(floatClearDiv);
                 newsDiv.appendChild(article);
             }
         });
     };

     var scrollNews = () => {
         if (output !== undefined) {
             generateNewsDiv(output);
             var news = document.getElementById("newsDiv");
             var i = 1;

             var interval = setInterval(() => {

                 removeActiveAtt(news);
                 news.childNodes[i].className = "active";

                 i++;
                 if (i >= news.childNodes.length) i = 0;
             }, 7000);
         } else {
             getData().then(() => {
                 scrollNews();
             });
         }
     };

     scrollNews();

     var generateBody = (bodyContent) => {
         var body = document.body;
         var divContainer = document.createElement("div");
         var menuDiv = document.createElement("div");
         var mobileMainMenu = document.createElement("div");
         var mobileMainMenuTxt = document.createElement("span");
         var mobileMainMenuIcon = document.createElement("i");
         var newsDiv = document.createElement("div");
         var imageTag = document.createElement("img");
         var rightDiv = document.createElement("div");
         var bodyStructure;

         divContainer.setAttribute("id", "divContainer");

         mobileMainMenu.setAttribute("id", "mobileMenu");
         mobileMainMenuTxt.innerHTML = "Menu";
         mobileMainMenuIcon.setAttribute("id", "mobileMenuIcon");
         mobileMainMenuIcon.setAttribute("class", "icon-menu");
         mobileMainMenuTxt.setAttribute("id", "mobileMenuText");
         mobileMainMenu.appendChild(mobileMainMenuTxt);
         mobileMainMenu.appendChild(mobileMainMenuIcon);

         menuDiv.setAttribute("id", "menuDiv");
         newsDiv.setAttribute("id", "newsDiv");
         imageTag.setAttribute("id", "newsImage");
         rightDiv.setAttribute("id", "rightDiv");

         menuDiv.appendChild(mobileMainMenu);
         menuDiv.appendChild(generateMenuDiv());

         divContainer.appendChild(menuDiv);
         divContainer.appendChild(newsDiv);
         divContainer.appendChild(rightDiv);

         body.appendChild(divContainer);

         menuButtonsListeners();
         showHideMobileMenuListeners();
     };

     var generateMenuDiv = () => {
         var mainMenu = document.createElement("ul");
         var firstListElement = document.createElement("li");
         var secondListElement = document.createElement("li");
         var thirdListElement = document.createElement("li");
         var fourthListElement = document.createElement("li");

         mainMenu.setAttribute("id", "navMenu");
         mainMenu.setAttribute("class", "boxed closed");

         firstListElement.innerHTML = "O mnie";
         firstListElement.setAttribute("id", "about");

         secondListElement.innerHTML = "Projekty";
         secondListElement.setAttribute("id", "projects");

         thirdListElement.innerHTML = "Kontakt";
         thirdListElement.setAttribute("id", "contact");

         fourthListElement.innerHTML = "Motywatory";
         fourthListElement.setAttribute("id", "motivators");

         mainMenu.appendChild(firstListElement);
         mainMenu.appendChild(secondListElement);
         mainMenu.appendChild(thirdListElement);
         mainMenu.appendChild(fourthListElement);

         return mainMenu;
     };

     var regenerateRightDiv = (content) => {
         var existingRightDiv = document.getElementById("rightDiv");

         existingRightDiv.innerHTML = content;

         showMoreListener();
     };

     var selectRightDivContent = (userChoice) => {
         switch (userChoice) {

             case "about":
                 History.pushState(null, "O mnie", "/");
                 break;

             case "projects":
                 History.pushState(null, "Projekty", "/?projekty");
                 break;

             case "contact":
                 History.pushState(null, "Kontakt", "/?kontakt");
                 break;

             case "motivators":
                 History.pushState(null, "Motywatory", "/?motywatory");
                 break;

             default:
                 return mainPageData(aboutContent);
         }
     };

     var menuButtonsListeners = () => {
         var menuElements = document.getElementById("navMenu");

         menuElements.addEventListener('click', (e) => {
             if (e.target.tagName === 'LI') {
                 selectRightDivContent(e.target.id);
                 setActiveMenu(e.target);
                 showHideMobileMenu();
                 changeMobileMenuText(e.target.innerHTML);
             }
         });
     };

     var showMoreListener = () => {
         var showMoreElements = document.getElementsByClassName("showMore");

         for (var i = 0; i < showMoreElements.length; i++) {
             showMoreElements[i].addEventListener("click", (e) => {

                 if (e.target.parentNode.className.includes("activeElement")) {
                     e.target.parentNode.className = e.target.parentNode.className.replace(" activeElement", " closedElement");
                     e.target.innerHTML = "POKAŻ WIĘCEJ";
                 } else if (e.target.parentNode.className.includes("closedElement")) {
                     e.target.parentNode.className = e.target.parentNode.className.replace(" closedElement", " activeElement");
                     e.target.innerHTML = "POKAŻ MNIEJ";
                 } else {
                     e.target.parentNode.className += " activeElement";
                     e.target.innerHTML = "POKAŻ MNIEJ";
                 }
             });
         }
     };

     var setActiveMenu = (selectedElement) => {
         removeActiveAtt(menuElementsActiveClass());
         selectedElement.className = "active";
     };

     var menuElementsActiveClass = () => {
         var menuElements = document.getElementById("navMenu");
         return menuElements;
     };

     var removeActiveAtt = (ActiveClassElements) => {
         for (var i = 0; i < ActiveClassElements.childNodes.length; i++) {
             ActiveClassElements.childNodes[i].className = "inactive";
         }
     };

     var showHideMobileMenuListeners = () => {
         var icon = document.getElementById("mobileMenuIcon");

         icon.addEventListener("click", showHideMobileMenu);
     };

     var showHideMobileMenu = () => {
         var navMenu = document.getElementById("navMenu");

         if (navMenu.className.includes("closed")) {
             navMenu.className = navMenu.className.replace(" closed", " open");
         } else if (navMenu.className.includes("open")) {
             navMenu.className = navMenu.className.replace(" open", " closed");
         }
     };

     var changeMobileMenuText = (menuElementValue) => {
         var mobileMenuText = document.getElementById("mobileMenuText");

         mobileMenuText.innerHTML = menuElementValue;
     };

     var initMap = () => {
         var town = {
             lat: 49.88072990000001,
             lng: 19.222800300000017
         };
         var map = new google.maps.Map(document.getElementById('map'), {
             zoom: 10,
             center: town
         });
         var marker = new google.maps.Marker({
             position: town,
             map: map
         });
     };

     var firstPageLoad = () => {
         var State = History.getState();

         History.replaceState(null, null, State.url + "/");
         History.replaceState(null, null, State.url);
     };

     return {
         generateBody: generateBody,
         firstPageLoad: firstPageLoad
     };
 })();

 myModule.generateBody();
 myModule.firstPageLoad();
