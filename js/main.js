// maken van een array voor de verhalen.
const verhalen = [
    "In een pittoresk dorpje woonde een jongen genaamd Tim. Op een dag, terwijl hij buiten speelde, vond hij een oude sleutel op de grond. Intrigerend genoeg had de sleutel geen label of markering, maar Tim was vastbesloten om te ontdekken waar deze sleutel voor diende. Hij begon zijn zoektocht door het hele dorp en vroeg aan iedereen of ze de sleutel herkenden. Helaas, niemand wist ervan. Na vele mislukte pogingen om de sleutel te gebruiken, ging Tim naar zijn grootvader. Zijn grootvader vertelde hem over een oud verlaten landhuis aan de rand van het bos, waarvan hij ooit hoorde dat het geheimzinnige schatten zou herbergen. Tim besloot om het landhuis te onderzoeken. De sleutel paste perfect op de verroeste deur, en tot zijn verbazing opende de deur met een zwaar krakend geluid. Binnenin ontdekte Tim een prachtige tuin vol met bloemen die hij nog nooit eerder had gezien. In het midden stond een fontein met een verborgen compartiment. Met de sleutel opende hij het en vond een oude, vergeelde brief. De brief onthulde het geheim van de tuin en een schatkaart die naar een verloren stad leidde.",
    "In een betoverend bos leefde een eenzame jongen genaamd Oliver. Op een dag stuitte hij op een bijzondere vlinder, met kleurrijke vleugels die leken te glinsteren in het zonlicht. Terwijl Oliver dichterbij kwam, begon de vlinder te spreken. Het vertelde hem dat het een magische vlinder was, met de kracht om wensen te vervullen. Oliver was dolgelukkig en vroeg de vlinder om hem naar het meest opwindende avontuur te brengen dat hij ooit had kunnen bedenken. De vlinder aanvaardde de wens en nam hem mee op een adembenemende reis door een fantastische wereld vol met wonderlijke wezens en prachtige landschappen. Samen beleefden ze spannende avonturen en overwonnen ze grote uitdagingen. Na een paar dagen bracht de vlinder Oliver terug naar het bos, waar hij dankbaar afscheid nam. Maar in plaats van nog meer wensen te doen, besefte Oliver dat het echte avontuur in zijn hart lag. Hij besloot om het leven met open armen te omarmen en elk moment als een magisch avontuur te beschouwen.",
    "Lang geleden, in een koninkrijk vol betovering, leefde een jonge ridder genaamd Arthur. Hij was vastberaden om de dapperste ridder van het rijk te worden en de prinses te redden uit de klauwen van een boze tovenaar. Na maanden van intensieve training en avonturen, stond Arthur eindelijk oog in oog met de tovenaar. Met zijn zwaard in de hand en moed in zijn hart, daagde Arthur de tovenaar uit. Een epische strijd volgde, waarbij Arthur toverkunsten moest trotseren en verschillende beproevingen moest doorstaan. Uiteindelijk wist Arthur de tovenaar te verslaan en de prinses te bevrijden. Als beloning werd Arthur niet alleen tot de dapperste ridder van het rijk gekroond, maar ook tot de nieuwe beschermer van het koninkrijk. Hij leefde nog lang en gelukkig, terwijl zijn legendarische daden werden doorverteld van generatie op generatie.",
    "Op een dag kreeg de verlegen Mia een mysterieus pakket. In het pakket zat een antiek zakhorloge met een gravure erop: De tijd onthult geheimen. Nieuwsgierig besloot Mia om het horloge om haar pols te dragen. Tot haar verbazing begon het horloge plotseling te tikken en licht uit te stralen. Wanneer Mia het horloge vasthield, werd ze getransporteerd naar verschillende momenten in de geschiedenis. Ze beleefde avonturen met piraten, ontmoette beroemde kunstenaars, en stond oog in oog met dinosaurussen. Met elk tijdreisavontuur groeide Mia in zelfvertrouwen en leerde ze veel over de wereld en zichzelf. Uiteindelijk ontdekte Mia het geheim van het horloge: het toonde haar de geschiedenis en bracht lessen over het belang van tijd en momenten in het leven. Na vele avonturen besloot Mia het horloge te delen met anderen, zodat ook zij hun eigen waardevolle lessen konden leren.",
    "In een klein dorpje woonde een meisje genaamd Lily, die dol was op zeepbellen. Elke dag blies ze zeepbellen in alle kleuren van de regenboog. Op een bijzondere dag gebeurde er iets magisch: een van de zeepbellen kwam tot leven en begon te groeien! Lily volgde de vliegende zeepbel, die haar meenam op een reis hoog in de lucht. Ze ontmoette wolkenwezens, dansende vogels en vliegende vissen. Samen verkenden ze fantastische plekken die niemand ooit had gezien. Na een betoverend avontuur bracht de zeepbel Lily veilig terug naar huis. Ze besefte dat de magie altijd aanwezig was, zelfs in de eenvoudigste dingen. Vanaf die dag deelde Lily haar zeepbellen met andere kinderen in het dorp, waardoor ze allemaal een beetje van de magie konden ervaren die ze in de vliegende zeepbel had ontdekt.",
];

const typingText = document.getElementById("verhalen")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

// random inladen van verhalen
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * verhalen.length);
    typingText.innerHTML = "";
    verhalen[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    inpField.focus();
}

// registreren of persoon aan het typen is en alle fouten registreren
function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        mistakeTag.innerText = mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

// zorgen dat de timer aftelt
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

// zorgen dat de game wordt gereset 
function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = 0;
}

// ervoor zorgen dat er verhalen kunnen worden ingeladen
loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);