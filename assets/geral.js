function main(){
    ScrollReveal().reveal('.apresentacao', {delay: 200});

    let modeAtual = JSON.parse(getLocalstorage());
    modeAtual ? changeColors(initialColors) : changeColors(darkMode);
}

document.querySelectorAll('a[href^="#"]').forEach(
    e => {
        e.addEventListener('click', scrollToArea)
    }
)
function scrollToArea(){
    setTimeout(
        () => {
            let hash = location.hash;

            if(hash){
                let area = document.querySelector(hash.replace('#', "."));
                let areaTop = area.getBoundingClientRect().top;//distancia do topo
                window.scrollTo({
                    top: areaTop,
                    behavior:"smooth"
                })
            }
        }, 300
    );
}
/* ------------------------------*/
const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=mode]");

const getStyle = (elemento, style) => window.getComputedStyle(elemento).getPropertyValue(style);

const initialColors = {
    navBgcolor: getStyle(html, "--nav-bgcolor"),
    bg: getStyle(html, "--bg"),
    bgBtn: getStyle(html, "--bg-btn"),
    textColor: getStyle(html, "--text-color"),
    svgNavPathFill: getStyle(html, "--svg-nav-path-fill"),
    svgNavPathStroke: getStyle(html, "--svg-nav-path-stroke"),
    svgPathFill: getStyle(html, "--svg-path-fill"),
    svgPathStroke: getStyle(html, "--svg-path-stroke"),
    bgSelection: getStyle(html, "--bg-selection"),
    textColorSelection: getStyle(html, "--text-color-selection"),
};
const darkMode = {
    navBgcolor: "deeppink",
    bg: "black",
    bgBtn: "white",
    textColor: "white",
    svgNavPathFill: "white",
    svgNavPathStroke: "white",
    svgPathFill: "black",
    svgPathStroke: "black",
    bgSelection: "deeppink",
    textColorSelection: "white",
};

const changeColors = (colors) => {
    
    Object.keys(colors).forEach(k => {
        html.style.setProperty(formatProperty(k), colors[k])
    });

    let setIcon = colors.bg == "black" ? "light" : "dark";
    let unsetIcon = colors.bg == "black" ? "dark": "light";
    document.getElementById(setIcon).style.display = "inline-block";
    document.getElementById(unsetIcon).style.display = "none";
}
const formatProperty = (property) => {
    return "--"+ property.replace(/([A-Z])/g, "-$1").toLowerCase();
}
checkbox.addEventListener('change', ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
})
/* -------------- */
function getLocalstorage(){
    if(localStorage.getItem("mode")){
        return localStorage.getItem("mode");
    }else{
        localStorage.setItem("mode", "true");
        return "true";
    }
}

function setMode(){
    let modeAtual = JSON.parse(getLocalstorage());
    localStorage.setItem("mode", !modeAtual);
}
