// levels.js - Bevat de structuur en data voor het level-gebaseerde leertraject

const levels = [
    {
        id: 1,
        title: "Wat is traden?",
        completed: false,
        locked: false,
        content: `
            <div class="level-content">
                <h2>Introductie tot Trading</h2>
                <p>Trading is het kopen en verkopen van financiële instrumenten met als doel winst te maken uit de schommelingen in de marktprijzen. 
                Als trader probeer je instrumenten te kopen wanneer de prijs laag is en te verkopen wanneer de prijs hoger is.</p>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Trading illustratie" />
                    <p class="caption">Een visuele representatie van trading activiteit op de financiële markten</p>
                </div>
                
                <h3>Belangrijke concepten in trading:</h3>
                <ul>
                    <li><strong>Marktanalyse</strong> - Het onderzoeken van marktomstandigheden om handelsbeslissingen te nemen</li>
                    <li><strong>Risicobeheer</strong> - Strategieën om potentiële verliezen te beperken</li>
                    <li><strong>Koersvorming</strong> - Hoe prijzen tot stand komen op basis van vraag en aanbod</li>
                </ul>
                
                <h3>Handelsinstrumenten begrijpen</h3>
                <p>Traders kunnen handelen in verschillende instrumenten zoals:</p>
                <ul>
                    <li>Aandelen</li>
                    <li>Valuta (Forex)</li>
                    <li>Grondstoffen</li>
                    <li>Cryptovaluta</li>
                    <li>Futures en opties</li>
                </ul>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Candlestick patroon" />
                    <p class="caption">Een typisch candlestick patroon dat prijsbewegingen over tijd weergeeft</p>
                </div>
                
                <h3>Candlestick Patronen</h3>
                <p>Candlestick grafieken zijn een van de meest gebruikte instrumenten om prijsbewegingen te visualiseren. 
                Een enkele candlestick toont de open-, hoog-, laag- en sluitprijs voor een specifieke periode.</p>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Candlestick uitleg" />
                    <p class="caption">Anatomie van een candlestick</p>
                </div>
            </div>
        `,
        quiz: [
            {
                question: "Wat is het primaire doel van trading?",
                options: [
                    "Het verzamelen van zoveel mogelijk aandelen",
                    "Winst maken uit prijsschommelingen in de markt",
                    "Het stabiel houden van de economie",
                    "Het minimaliseren van belastingen"
                ],
                correctAnswer: 1
            },
            {
                question: "Welk van de volgende is GEEN financieel instrument waarin je kunt handelen?",
                options: [
                    "Aandelen",
                    "Valuta",
                    "Verzekeringen",
                    "Cryptovaluta"
                ],
                correctAnswer: 2
            },
            {
                question: "Wat toont een candlestick in een grafiek?",
                options: [
                    "Alleen de slotkoers van een periode",
                    "De open-, hoog-, laag- en sluitprijzen voor een periode",
                    "Het volume van de handel",
                    "De marktkapitalisatie van een bedrijf"
                ],
                correctAnswer: 1
            },
            {
                type: "image",
                question: "Welk candlestick patroon wordt hier getoond?",
                imageUrl: "/api/placeholder/400/300",
                options: [
                    "Bullish Engulfing",
                    "Doji",
                    "Hammer",
                    "Evening Star"
                ],
                correctAnswer: 2
            },
            {
                question: "Wat is risicobeheer in de context van trading?",
                options: [
                    "Het uitlenen van geld aan andere traders",
                    "Het voorspellen van marktcycli",
                    "Strategieën om potentiële verliezen te beperken",
                    "Het gebruik van complexe wiskundige formules"
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: 2,
        title: "Futures",
        completed: false,
        locked: true,
        content: `
            <div class="level-content">
                <h2>Futures Trading</h2>
                <p>Futures zijn gestandaardiseerde contracten waarin twee partijen overeenkomen om een specifiek activum te kopen of verkopen tegen 
                een vooraf bepaalde prijs op een toekomstige datum.</p>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Futures contract illustratie" />
                    <p class="caption">Visuele representatie van een futures contract</p>
                </div>
                
                <h3>Kenmerken van Futures:</h3>
                <ul>
                    <li><strong>Hefboomwerking</strong> - Traders hoeven slechts een fractie van de contractwaarde als margin te storten</li>
                    <li><strong>Standaardisatie</strong> - Contracten hebben gestandaardiseerde specificaties (grootte, leveringsdata)</li>
                    <li><strong>Centraal gecleard</strong> - Transacties verlopen via een clearinghouse dat als tegenpartij optreedt</li>
                    <li><strong>Dagelijkse verrekening</strong> - Winsten en verliezen worden dagelijks verrekend</li>
                </ul>
                
                <h3>Futures Markten</h3>
                <p>Futures worden verhandeld op verschillende types activa:</p>
                <ul>
                    <li>Grondstoffen (goud, olie, graan)</li>
                    <li>Financiële instrumenten (indices, obligaties)</li>
                    <li>Valuta</li>
                    <li>Crypto (Bitcoin futures)</li>
                </ul>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Futures termijnstructuur" />
                    <p class="caption">Een typische termijnstructuur (term structure) van futures contracten</p>
                </div>
                
                <h3>Contango vs. Backwardation</h3>
                <p>De termijnstructuur van futures kan in twee staten voorkomen:</p>
                <ul>
                    <li><strong>Contango</strong> - Futures prijzen zijn hoger dan de spotprijs</li>
                    <li><strong>Backwardation</strong> - Futures prijzen zijn lager dan de spotprijs</li>
                </ul>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Contango vs Backwardation" />
                    <p class="caption">Vergelijking tussen contango en backwardation in futures markten</p>
                </div>
            </div>
        `,
        quiz: [
            {
                question: "Wat is een futures contract?",
                options: [
                    "Een aandeel in een toekomstig bedrijf",
                    "Een overeenkomst om iets te kopen of verkopen tegen een vooraf bepaalde prijs op een toekomstige datum",
                    "Een voorspelling van toekomstige marktbewegingen",
                    "Een type cryptocurrency"
                ],
                correctAnswer: 1
            },
            {
                question: "Wat betekent 'margin' bij futures trading?",
                options: [
                    "De winst die je maakt op een trade",
                    "Het bedrag dat je moet storten als onderpand om een positie te openen",
                    "De maximale verlieslimiet",
                    "De commissie die je betaalt aan de broker"
                ],
                correctAnswer: 1
            },
            {
                type: "image",
                question: "Welke marktsituatie wordt in deze grafiek getoond?",
                imageUrl: "/api/placeholder/400/300",
                options: [
                    "Contango",
                    "Backwardation",
                    "Arbitrage",
                    "Short squeeze"
                ],
                correctAnswer: 0
            },
            {
                question: "Wat gebeurt er bij de dagelijkse verrekening van futures?",
                options: [
                    "De contracten worden automatisch gesloten",
                    "De marges worden verhoogd",
                    "Winsten en verliezen worden dagelijks bijgeschreven of afgeschreven",
                    "De leveringsdatum wordt aangepast"
                ],
                correctAnswer: 2
            },
            {
                question: "Waarom zouden traders futures gebruiken in plaats van direct in de onderliggende activa te handelen?",
                options: [
                    "Futures hebben altijd lagere transactiekosten",
                    "Futures kunnen niet in waarde dalen",
                    "Futures bieden hefboomwerking en de mogelijkheid om te speculeren op prijsdalingen",
                    "Futures hebben geen volatiliteit"
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: 3,
        title: "Hefbomen",
        completed: false,
        locked: true,
        content: `
            <div class="level-content">
                <h2>Hefboomwerking in Trading</h2>
                <p>Hefboomwerking (leverage) stelt traders in staat om posities te openen die groter zijn dan hun eigen kapitaal. 
                Dit vergroot zowel de potentiële winsten als verliezen.</p>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Hefboomwerking illustratie" />
                    <p class="caption">Visualisatie van hefboomwerking in trading</p>
                </div>
                
                <h3>Hoe werkt hefboomwerking?</h3>
                <p>Bij een hefboom van 10:1 kun je met €1.000 eigen kapitaal een positie van €10.000 innemen. Je margin (onderpand) is dan €1.000.</p>
                
                <h3>Hefboomwerking in verschillende markten:</h3>
                <ul>
                    <li><strong>Forex</strong> - Typisch 30:1 tot 500:1 (afhankelijk van de regelgeving)</li>
                    <li><strong>Futures</strong> - Verschilt per contract, vaak 10:1 tot 30:1</li>
                    <li><strong>CFD's</strong> - 2:1 tot 30:1 (beperkt door regelgeving in veel landen)</li>
                    <li><strong>Crypto</strong> - Kan oplopen tot 100:1 op sommige exchanges</li>
                </ul>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Margin call illustratie" />
                    <p class="caption">Het concept van een margin call gevisualiseerd</p>
                </div>
                
                <h3>Risico's van hefboomwerking</h3>
                <p>Met hefboomwerking komen specifieke risico's:</p>
                <ul>
                    <li><strong>Margin calls</strong> - Als de markt tegen je beweegt, kan je broker extra kapitaal vragen</li>
                    <li><strong>Liquidatie</strong> - Bij onvoldoende margin wordt je positie automatisch gesloten</li>
                    <li><strong>Versterkte verliezen</strong> - Verliezen worden met dezelfde factor vergroot als winsten</li>
                </ul>
                
                <h3>Risk Management bij hefboomgebruik</h3>
                <p>Essentiële technieken om risico's te beheersen:</p>
                <ul>
                    <li>Stop-loss orders gebruiken</li>
                    <li>Positiegrootte beperken tot een klein percentage van je kapitaal</li>
                    <li>Realistische winstdoelen stellen</li>
                    <li>Niet meer dan 2-5% risico per trade</li>
                </ul>
                
                <div class="image-container">
                    <img src="/api/placeholder/500/300" alt="Risk management illustratie" />
                    <p class="caption">Visuele weergave van effectief risicobeheer bij trading met hefboom</p>
                </div>
            </div>
        `,
        quiz: [
            {
                question: "Bij een hefboom van 20:1, hoeveel kapitaal heb je nodig om een positie van €40.000 te openen?",
                options: [
                    "€800",
                    "€2.000",
                    "€4.000",
                    "€20.000"
                ],
                correctAnswer: 1
            },
            {
                question: "Wat is een margin call?",
                options: [
                    "Een telefoontje om je te feliciteren met je winst",
                    "Een verzoek van je broker om extra kapitaal te storten omdat je margin te laag is geworden",
                    "Een automatische winstneming",
                    "Een beloningssysteem voor actieve traders"
                ],
                correctAnswer: 1
            },
            {
                type: "calculation",
                question: "Als je €1.000 investeert met een hefboom van 10:1 en de prijs stijgt met 5%, wat is dan je winst in percentage van je oorspronkelijke investering?",
                options: [
                    "5%",
                    "10%",
                    "50%",
                    "500%"
                ],
                correctAnswer: 2
            },
            {
                question: "Welke van de volgende markten staat bekend om de hoogste beschikbare hefbomen?",
                options: [
                    "Aandelenmarkt",
                    "Obligatiemarkt",
                    "Forex markt",
                    "Vastgoedmarkt"
                ],
                correctAnswer: 2
            },
            {
                type: "image",
                question: "Welk concept wordt geïllustreerd in deze grafiek?",
                imageUrl: "/api/placeholder/400/300",
                options: [
                    "Stop-loss plaatsing",
                    "Liquidatieniveau",
                    "Winstneming",
                    "Positiegrootte berekening"
                ],
                correctAnswer: 1
            }
        ]
    }
];

// Functie om de progressie van de gebruiker op te slaan
function saveProgress() {
    localStorage.setItem('tradingAppProgress', JSON.stringify({
        currentLevel: currentLevel,
        levels: levels.map(level => ({
            id: level.id,
            completed: level.completed,
            locked: level.locked
        }))
    }));
}

// Functie om de progressie van de gebruiker te laden
function loadProgress() {
    const savedProgress = localStorage.getItem('tradingAppProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentLevel = progress.currentLevel;
        
        progress.levels.forEach(savedLevel => {
            const levelIndex = levels.findIndex(l => l.id === savedLevel.id);
            if (levelIndex !== -1) {
                levels[levelIndex].completed = savedLevel.completed;
                levels[levelIndex].locked = savedLevel.locked;
            }
        });
    }
}

// Functie om een level te voltooien
function completeLevel(levelId) {
    const levelIndex = levels.findIndex(l => l.id === levelId);
    if (levelIndex !== -1) {
        levels[levelIndex].completed = true;
        
        // Ontgrendel het volgende level als dat bestaat
        if (levelIndex + 1 < levels.length) {
            levels[levelIndex + 1].locked = false;
        }
        
        saveProgress();
        renderLevelMap();
        showCompletionMessage(levelId);
    }
}

// Functie om een completie bericht te tonen
function showCompletionMessage(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (level) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="completion-message">
                <h2>Gefeliciteerd!</h2>
                <p>Je hebt level ${levelId}: "${level.title}" succesvol afgerond.</p>
                <div class="level-completion-animation"></div>
                <button class="futuristic-button" onclick="renderLevelMap()">Terug naar de Level Map</button>
            </div>
        `;
    }
}

// Functie om de quiz te controleren
function checkQuiz(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;
    
    let correctAnswers = 0;
    const totalQuestions = level.quiz.length;
    
    level.quiz.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
            correctAnswers++;
        }
    });
    
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    const resultElement = document.getElementById('quiz-result');
    resultElement.innerHTML = `Je score: ${correctAnswers} van de ${totalQuestions} correct (${percentage.toFixed(1)}%)`;
    
    if (percentage >= 80) {
        resultElement.innerHTML += `
            <div class="success-message">Je hebt voldoende score behaald om door te gaan!</div>
            <button class="futuristic-button complete-button" onclick="completeLevel(${levelId})">Voltooi Level</button>
        `;
    } else {
        resultElement.innerHTML += `
            <div class="failure-message">Je hebt minimaal 80% nodig om door te gaan. Probeer het opnieuw!</div>
            <button class="futuristic-button retry-button" onclick="loadLevel(${levelId})">Probeer Opnieuw</button>
        `;
    }
    
    resultElement.classList.remove('hidden');
    document.getElementById('quiz-submit').disabled = true;
}

// Functie om een specifiek level te laden
function loadLevel(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (!level || level.locked) return;
    
    currentLevel = levelId;
    
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div class="level-container">
            <h1 class="level-title">Level ${level.id}: ${level.title}</h1>
            ${level.content}
            
            <div class="quiz-section">
                <h2>Test je kennis</h2>
                <p>Beantwoord de volgende vragen. Je moet minimaal 80% correct hebben om door te gaan naar het volgende level.</p>
                
                <form id="quiz-form">
                    ${level.quiz.map((question, index) => `
                        <div class="question">
                            <p class="question-text">${index + 1}. ${question.question}</p>
                            ${question.type === 'image' ? `
                                <div class="question-image">
                                    <img src="${question.imageUrl}" alt="Quiz vraag afbeelding">
                                </div>
                            ` : ''}
                            <div class="options">
                                ${question.options.map((option, optIndex) => `
                                    <div class="option">
                                        <input type="radio" id="q${index}-opt${optIndex}" name="question-${index}" value="${optIndex}">
                                        <label for="q${index}-opt${optIndex}">${option}</label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                    
                    <button type="button" id="quiz-submit" class="futuristic-button" onclick="checkQuiz(${level.id})">Controleer Antwoorden</button>
                    
                    <div id="quiz-result" class="hidden"></div>
                </form>
            </div>
            
            <div class="navigation-buttons">
                <button class="futuristic-button back-button" onclick="renderLevelMap()">Terug naar Level Map</button>
            </div>
        </div>
    `;
}

// Functie om de level map te renderen
function renderLevelMap() {
    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="level-map-container">
            <h1>Trading Academy</h1>
            <p>Voltooi alle levels om een expert te worden in trading!</p>
            
            <div class="level-path">
                ${levels.map(level => `
                    <div class="level-node ${level.completed ? 'completed' : ''} ${level.locked ? 'locked' : ''}">
                        <div class="level-circle" onclick="${level.locked ? '' : `loadLevel(${level.id})`}">
                            ${level.completed ? '<span class="check-icon">✓</span>' : level.id}
                        </div>
                        <p class="level-node-title">${level.title}</p>
                        ${level.locked ? '<span class="lock-icon">🔒</span>' : ''}
                    </div>
                    ${level.id < levels.length ? '<div class="level-path-connector"></div>' : ''}
                `).join('')}
            </div>
        </div>
    `;
}

// Huidige level instellen (begint bij level 1)
let currentLevel = 1;

// Export de functies en variabelen die nodig zijn in andere bestanden
export { levels, loadLevel, renderLevelMap, loadProgress };
