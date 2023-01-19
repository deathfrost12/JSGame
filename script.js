//úvodní reference
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//hodnoty možností pro tlačítka
let options = {
    fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
    ],
    animals: ["Hedgehog",
        "Rhinoceros",
        "Squirrel",
        "Panther",
        "Walrus",
        "Zebra"],
    countries: [
        "India",
        "Hungary",
        "Kyrgyzstan",
        "Switzerland",
        "Zimbabwe",
        "Dominica",
    ],
};


//počty přírůstků
let winCount = 0;
let count = 0;

let chosenWord = "";

//tlačítka možností kategorie
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//zablokování tlačítek po vybrání kategorie
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //zakázaní kategorie
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //zakázaní písmen
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//generátor slov
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //pokud se optionValur shoduje s vnitřním textem tlačítka, zvýraznit tlačítko
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //skrytí písmen a následné vymazání vymazání předchozího slova
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    //vybraní náhodného slova
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //nahrazení každého písmena ve vybraném slovu pomlčkou
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //zobrazení každého elementu pomlčkou
    userInputSection.innerHTML = displayItem;
};

//počáteční funkce (vyvolaná při načtení stránky/uživatel stiskne tlačítko new game)
const initializer = () => {
    winCount = 0;
    count = 0;

    //počáteční vymazání veškerého obsah a skrytí písmen a tlačítko nové hry
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //vytvoření tlačítek písmen
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //číslo na ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //kliknutí na tlačítko písmena
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //pokud pole obsahuje clicked hodnotu, nahradí odpovídající pomlčku písmenem
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    //pokud je písmeno v poli stejné jako kliknuté tlačítko
                    if (char === button.innerText) {
                        //nahrazení pomlčky písmenem
                        dashes[index].innerText = char;
                        //počítadlo přírůstků
                        winCount += 1;
                        //pokud se winCount rovná délce slova
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            //blokovaní všech tlačítek
                            blocker();
                        }
                    }
                });
            } else {
                //prohra
                count += 1;
                //vykreslní panáčka
                drawMan(count);
                //Count==6 protože hlava,tělo,levá ruka, pravá ruka,levá noha,pravá noha
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            //vypnutí kliknutých tlačítek
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    //vyvolání canvasCreator (pro vymazání předchozího plátna a vytvoření počátečního plátna)
    let { initialDrawing } = canvasCreator();
    //nové plátno
    initialDrawing();
};

window.onload = initializer;