// Classic or New
let classicCollection = document.querySelector(".classic");
let newCollection = document.querySelector(".updated-base-colors");
let classicThemes = document.querySelector(".theme_classic");
let newThemes = document.querySelector(".theme_updated");
//Font Colors
let darkFontButton = document.querySelectorAll(".dark-text");
let lightFontButton = document.querySelectorAll(".light-text");
//Theme Colors
let darkThemeButton = document.querySelector(".dark-theme-button");
let lightThemeButton = document.querySelector(".light-theme-button");
let mintThemeButton = document.querySelector(".mint-theme-button");
let blueThemeButton = document.querySelector(".blue-theme-button");
let redThemeButton = document.querySelector(".red-theme-button");
let goldThemeButton = document.querySelector(".gold-theme-button");
let greenThemeButton = document.querySelector(".green-theme-button");
let purpleThemeButton = document.querySelector(".purple-theme-button");
let aquaThemeButton = document.querySelector(".aqua-theme-button");
let darkSalmonButton = document.querySelector(".dark-salmon-button");
let darkPurpleButtton = document.querySelector(".dark-purple-button");
let slateButton = document.querySelector(".slate-button");
let fireBushButton = document.querySelector(".fire-bush-button");
let thunderButton = document.querySelector(".thunder-button");
let burntSiennaButton = document.querySelector(".burnt-sienna-button");
let plumButton = document.querySelector(".plum-button");
let forrestButton = document.querySelector(".forrest-button");
let vistaBlueButton = document.querySelector(".vista-blue-button");
let themeChangeEvent = new Event("Theme Changed");
let saveThemeEvent = new Event("Save");
let themeSetting;
let themeHex;
let allColors = Array.from(document.querySelectorAll('.color'));

let saveButton = document.querySelector(".save-button");

const handleActive = (e) => {
    e.preventDefault();
    allColors.forEach(node => {
        node.classList.remove('active');
    })
    e.currentTarget.classList.add('active');
}

const activeTheme = () => {
    if (localStorage.getItem("theme") && localStorage.getItem("theme") !== "undefined") {
        let userColor = localStorage.getItem("theme");
        userColor = '.' + userColor;
        document.querySelector(userColor).classList.add("active");
    }
}

activeTheme();

//Choose whether to show classic or new collections on the panel pane.
classicCollection.addEventListener("click", () => {
    if (!classicCollection.classList.contains("active")) {
        newCollection.classList.toggle("active");
        classicCollection.classList.toggle("active");

    }
    if (!newThemes.classList.contains("hidden")) {
        newThemes.classList.toggle("hidden");
        classicThemes.classList.toggle("hidden");
    }
});

newCollection.addEventListener("click", () => {
    if (!newCollection.classList.contains("active")) {
        newCollection.classList.toggle("active");
        classicCollection.classList.toggle("active");
    }
    if (!classicThemes.classList.contains("hidden")) {
        classicThemes.classList.toggle("hidden");
        newThemes.classList.toggle("hidden");
    }
});

//Font color selections
darkFontButton.forEach(item => item.addEventListener("click", () => {
    localStorage.setItem("fontColor", "#000");
    //this.dispatchEvent(themeChangeEvent);
}));
lightFontButton.forEach(item => item.addEventListener("click", () => {
    localStorage.setItem("fontColor", "#e5e5e5");
    //this.dispatchEvent(themeChangeEvent);
}));

//Save button
saveButton.addEventListener("click", () => {
    localStorage.setItem("theme", themeSetting);
    localStorage.setItem("backgroundColor", themeHex);
    this.dispatchEvent(themeChangeEvent);
    this.dispatchEvent(saveThemeEvent);
});

//Background Color selections
darkThemeButton.addEventListener("click", (e) => {
    themeSetting = "dark";
    themeHex = "#222";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
lightThemeButton.addEventListener("click", (e) => {
    themeSetting = "light";
    themeHex = "#e5e5e5";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
mintThemeButton.addEventListener("click", (e) => {
    themeSetting = "mint";
    themeHex = "#5cbf94";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
blueThemeButton.addEventListener("click", (e) => {
    themeSetting = "blue";
    themeHex = "#84c0d7";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
redThemeButton.addEventListener("click", (e) => {
    themeSetting = "red";
    themeHex = "#903d3d";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
goldThemeButton.addEventListener("click", (e) => {
    themeSetting = "gold";
    themeHex = "#d2ab59";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
greenThemeButton.addEventListener("click", (e) => {
    themeSetting = "green";
    themeHex = "#6fb269";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
purpleThemeButton.addEventListener("click", (e) => {
    themeSetting = "purple";
    themeHex = "#6c5287";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
aquaThemeButton.addEventListener("click", (e) => {
    themeSetting = "aqua";
    themeHex = "#3193a5";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});


//2.0 Colors
darkSalmonButton.addEventListener("click", (e) => {
    themeSetting = "darksalmon";
    themeHex = "#C34D40";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
darkPurpleButtton.addEventListener("click", (e) => {
    themeSetting = "darkpurple";
    themeHex = "#4242BA";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
slateButton.addEventListener("click", (e) => {
    themeSetting = "slate";
    themeHex = "#2E3C56";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
fireBushButton.addEventListener("click", (e) => {
    themeSetting = "firebush";
    themeHex = "#E59C2F";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
thunderButton.addEventListener("click", (e) => {
    themeSetting = "thunder";
    themeHex = "#412F3F";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
burntSiennaButton.addEventListener("click", (e) => {
    themeSetting = "burntsienna";
    themeHex = "#EA724C";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
plumButton.addEventListener("click", (e) => {
    themeSetting = "plum";
    themeHex = "#5C2533";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
forrestButton.addEventListener("click", (e) => {
    themeSetting = "forrest";
    themeHex = "#2D442F";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});
vistaBlueButton.addEventListener("click", (e) => {
    themeSetting = "vistablue";
    themeHex = "#8DD397";
    mainContainer.style.backgroundColor = themeHex;
    handleActive(e);
});