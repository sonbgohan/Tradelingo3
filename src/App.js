import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// Track user progress in localStorage
const getUserProgress = () => {
  const savedProgress = localStorage.getItem('tradeLingo_progress');
  return savedProgress ? JSON.parse(savedProgress) : {
    completedLessons: [],
    quizScores: {},
    unlockedLevels: ['level1']
  };
};

const saveUserProgress = (progress) => {
  localStorage.setItem('tradeLingo_progress', JSON.stringify(progress));
};

// Define course structure
const courseStructure = {
  level1: {
    id: 'level1',
    title: 'Trading Basics',
    icon: 'chart-line',
    nextLevel: 'level2',
    position: { top: 100, left: 100 },
    lessons: [
      { 
        id: 'basics1',
        title: "What is Trading?", 
        description: "Introduction to financial markets and trading",
        content: [
          {
            type: "text",
            value: "Trading is the process of buying and selling financial assets with the goal of making a profit. Traders participate in various markets like stocks, forex, cryptocurrencies, and commodities, analyzing price movements to make informed decisions."
          },
          {
            type: "text",
            value: "Unlike long-term investors who might hold assets for years, traders often operate on shorter timeframes, from minutes to months, trying to capitalize on price fluctuations."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading chart showing buy and sell points",
            caption: "Example of trading decisions on a price chart"
          },
          {
            type: "text",
            value: "Trading involves different strategies including day trading (completing all trades within a single day), swing trading (holding positions for several days or weeks), and position trading (holding for weeks or months)."
          }
        ],
        quiz: {
          title: "Test Your Understanding",
          questions: [
            {
              id: "q1",
              question: "What is the main goal of trading?",
              options: [
                "To own a part of a company long-term",
                "To make a profit from price movements",
                "To support businesses you believe in",
                "To diversify your portfolio"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "How does trading differ from long-term investing?",
              options: [
                "Trading involves only stocks, while investing involves all assets",
                "Trading requires more capital than investing",
                "Trading typically uses shorter timeframes to capitalize on price movements",
                "Trading is risk-free compared to investing"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "Which of the following is NOT a common trading timeframe?",
              options: [
                "Day trading",
                "Swing trading",
                "Position trading",
                "Decade trading"
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      { 
        id: 'basics2',
        title: "How Does Trading Work?", 
        description: "Understanding the mechanics of trading",
        content: [
          {
            type: "text",
            value: "Trading works through exchanges and marketplaces where buyers and sellers come together to transact. Modern trading is primarily electronic, happening through online platforms provided by brokers or exchanges."
          },
          {
            type: "text",
            value: "When you place a trade, you're essentially placing an order to buy or sell an asset at a specific price. This order goes to the exchange where it's matched with a counterparty willing to take the other side of your trade."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading process flow diagram",
            caption: "The flow of a typical trade from order placement to execution"
          },
          {
            type: "text",
            value: "Trading can be done in two directions: going 'long' (buying first, then selling later at a hopefully higher price) or going 'short' (selling borrowed assets first, then buying them back later at a hopefully lower price)."
          },
          {
            type: "text",
            value: "Most trading platforms allow you to use leverage (borrowed funds) to control larger positions than your account balance would normally allow. This amplifies both potential profits and losses."
          }
        ],
        quiz: {
          title: "How Trading Works Quiz",
          questions: [
            {
              id: "q1",
              question: "What happens when you place a trade order?",
              options: [
                "Your order is automatically executed at your desired price",
                "Your order goes to an exchange to be matched with a counterparty",
                "A broker buys the asset from their inventory to sell to you",
                "The asset is created at the moment you place the order"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What does 'going long' in trading mean?",
              options: [
                "Trading with long-term goals in mind",
                "Using a long and complex trading strategy",
                "Buying first and selling later, hoping prices rise",
                "Trading with a large amount of capital"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "What effect does leverage have on trading?",
              options: [
                "It guarantees profits regardless of market movements",
                "It reduces the risk of trading completely",
                "It allows trading larger positions than your capital alone permits",
                "It slows down the execution of trades"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics3',
        title: "What Does a Trader Do?", 
        description: "The day-to-day activities of a trader",
        content: [
          {
            type: "text",
            value: "Traders analyze markets to identify opportunities for profitable trades. This involves studying price charts, economic news, company reports, and other factors that might affect asset prices."
          },
          {
            type: "text",
            value: "A typical trader's day often starts with reviewing overnight market movements and news that could impact their trading plans. They'll check their existing positions and adjust their strategy accordingly."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trader at desk with multiple screens",
            caption: "A trader monitors multiple markets and data sources simultaneously"
          },
          {
            type: "text",
            value: "Traders develop and follow trading plans to guide their decisions. These plans include entry and exit points, risk management rules, and criteria for identifying good trade setups."
          },
          {
            type: "text",
            value: "Record-keeping is crucial for traders. They track their trades, analyze their performance, identify patterns in their winning and losing trades, and continuously work to improve their strategy."
          },
          {
            type: "text",
            value: "Successful traders spend significant time on risk management, ensuring they don't risk too much on any single trade and that their overall risk exposure is controlled."
          }
        ],
        quiz: {
          title: "Trader Activities Quiz",
          questions: [
            {
              id: "q1",
              question: "What do traders analyze to find trading opportunities?",
              options: [
                "Only company financial statements",
                "Only technical chart patterns",
                "Price charts, news, reports, and other market-moving factors",
                "Only the advice of other traders"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "Why is record-keeping important for traders?",
              options: [
                "It's only required for tax purposes",
                "To track performance and improve trading strategies",
                "It's not important; successful traders rely on intuition",
                "Only to impress other traders with their results"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is a key aspect of a trading plan?",
              options: [
                "A guarantee of profits",
                "A list of hot stock tips from friends",
                "Entry and exit points, risk management rules",
                "Predictions about market crashes"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics4',
        title: "Trading vs Investing", 
        description: "Understanding the key differences",
        content: [
          {
            type: "text",
            value: "Trading and investing are two different approaches to financial markets. While they both aim to generate returns, they differ significantly in timeframe, strategy, and philosophy."
          },
          {
            type: "text",
            value: "Timeframe: Traders operate on shorter timeframes, from seconds (scalping) to months (position trading). Investors typically hold assets for years or even decades, focusing on long-term growth."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading vs Investing comparison",
            caption: "Key differences between trading and investing approaches"
          },
          {
            type: "text",
            value: "Return sources: Traders primarily profit from price movements (capital gains). Investors may benefit from both price appreciation and income (dividends, interest, etc.)."
          },
          {
            type: "text",
            value: "Analysis approach: Traders often rely heavily on technical analysis (chart patterns, indicators). Investors typically emphasize fundamental analysis (company financials, economic factors, competitive advantages)."
          },
          {
            type: "text",
            value: "Activity level: Trading requires frequent monitoring and decision-making. Investing can be more passive, with periodic portfolio reviews and rebalancing."
          }
        ],
        quiz: {
          title: "Trading vs Investing Quiz",
          questions: [
            {
              id: "q1",
              question: "What is the primary difference in timeframe between trading and investing?",
              options: [
                "There is no difference in timeframe",
                "Traders operate on shorter timeframes, investors on longer ones",
                "Investors operate on shorter timeframes, traders on longer ones",
                "Both use exactly the same timeframes"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "Which analysis approach is more commonly used by traders?",
              options: [
                "Fundamental analysis only",
                "Technical analysis",
                "Sentiment analysis only",
                "No analysis at all"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "How do investors typically generate returns compared to traders?",
              options: [
                "Only through price appreciation",
                "Only through dividend income",
                "Through both price appreciation and income (dividends, interest)",
                "Investors don't aim to generate returns"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics5',
        title: "How Does a Broker Work", 
        description: "Understanding brokers, orderbooks, and matching",
        content: [
          {
            type: "text",
            value: "A broker is a financial intermediary that connects traders and investors to financial markets. Brokers execute trades on behalf of their clients, providing access to exchanges where securities are traded."
          },
          {
            type: "text",
            value: "Orderbooks are the core mechanism that makes trading possible. An orderbook is a list of all buy and sell orders for a specific asset, organized by price level. It shows the quantity of the asset being bid for (buy orders) or offered (sell orders) at each price."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Order book visualization",
            caption: "Example of an orderbook showing bids (buy orders) and asks (sell orders)"
          },
          {
            type: "text",
            value: "Order matching is the process of pairing buy and sell orders. When you place a market order (to buy or sell at the current market price), your broker matches it with the best available opposite order in the orderbook. For limit orders (specifying a price), your order waits in the orderbook until a matching order arrives."
          },
          {
            type: "text",
            value: "Brokers make money through various fees: commissions (a fee per trade), spreads (the difference between buy and sell prices), margin fees (interest on borrowed funds), or subscription fees for premium services."
          },
          {
            type: "text",
            value: "Modern brokers offer various types of orders beyond simple buy and sell: stop orders, limit orders, stop-limit orders, trailing stops, and more, giving traders precise control over their executions."
          }
        ],
        quiz: {
          title: "Brokers and Order Matching Quiz",
          questions: [
            {
              id: "q1",
              question: "What is an orderbook in trading?",
              options: [
                "A physical book where traders write down their trades",
                "A list of all buy and sell orders for an asset, organized by price",
                "A broker's record of their clients' personal information",
                "A historical record of all past trades"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "How does order matching work for a market order?",
              options: [
                "It's matched with another market order from a different trader",
                "It's matched with the best available opposite order in the orderbook",
                "It's always executed at the exact middle price between bid and ask",
                "It's held until the price reaches a specified level"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "How do brokers typically make money?",
              options: [
                "Only through commissions on trades",
                "Through spreads, commissions, margin fees, and subscription services",
                "Through taking the opposite side of client trades",
                "Only through monthly subscription fees"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'basics6',
        title: "Trading Terminology", 
        description: "Essential terms: spreads, slippage, liquidity",
        content: [
          {
            type: "text",
            value: "Spread is the difference between the bid price (what buyers are willing to pay) and the ask price (what sellers are willing to accept). Wider spreads generally indicate less liquidity and higher transaction costs."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Bid-ask spread visualization",
            caption: "Illustration of bid-ask spread in a market"
          },
          {
            type: "text",
            value: "Liquidity refers to how easily an asset can be bought or sold without affecting its price. High liquidity means many buyers and sellers are active, making it easier to execute trades at expected prices. Low liquidity can lead to difficulty entering or exiting positions."
          },
          {
            type: "text",
            value: "Slippage occurs when an order executes at a different price than expected. This typically happens during periods of high volatility or low liquidity. For example, if you place a market order to buy at $100, but it executes at $102, you've experienced $2 of slippage."
          },
          {
            type: "text",
            value: "Volume represents the total amount of an asset traded during a specific period. High volume often indicates high interest and liquidity in a market."
          },
          {
            type: "text",
            value: "Volatility measures how much and how quickly prices change. High volatility markets have large price swings, offering both greater profit potential and higher risk."
          },
          {
            type: "text",
            value: "Margin is borrowed money used to purchase securities. Trading on margin amplifies both gains and losses. Margin call occurs when your account value falls below the minimum required level, requiring you to deposit more funds."
          }
        ],
        quiz: {
          title: "Trading Terminology Quiz",
          questions: [
            {
              id: "q1",
              question: "What is the 'spread' in trading?",
              options: [
                "The overall range of prices in a day",
                "The difference between bid and ask prices",
                "The commission charged by brokers",
                "The difference between opening and closing prices"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What does high liquidity in a market indicate?",
              options: [
                "The market is about to crash",
                "There are many active buyers and sellers making trading easier",
                "Trading is temporarily suspended",
                "Prices will remain stable and never change"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is slippage in trading?",
              options: [
                "When an order executes at a different price than expected",
                "When orders are rejected by the exchange",
                "When your internet connection is too slow for trading",
                "When you make a typing error in your order"
              ],
              correctAnswer: 0
            }
          ]
        }
      },
      { 
        id: 'basics7',
        title: "Bulls and Bears", 
        description: "Understanding market sentiment and trends",
        content: [
          {
            type: "text",
            value: "In financial markets, 'bulls' and 'bears' represent opposing market sentiments. A bull market is characterized by rising prices and general optimism, while a bear market features falling prices and pessimism."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Bull and bear market comparison chart",
            caption: "Comparison of bull and bear market price patterns"
          },
          {
            type: "text",
            value: "The terms come from how these animals attack: bulls thrust upward with their horns, while bears swipe downward with their paws. Traders who believe prices will rise are called 'bullish,' while those who expect prices to fall are 'bearish.'"
          },
          {
            type: "text",
            value: "Bull markets typically occur during periods of economic strength, growing corporate profits, and positive investor sentiment. They can last for years and are generally characterized by gradual, sustained price increases with occasional corrections."
          },
          {
            type: "text",
            value: "Bear markets often coincide with economic recessions, declining corporate profits, and fearful market sentiment. Technically, a bear market is declared when prices fall 20% or more from recent highs."
          },
          {
            type: "text",
            value: "Trading strategies differ significantly between bull and bear markets. In bull markets, 'buy the dip' strategies often work well, while bear markets may require shorter-term trading, more hedging, or focusing on defensive assets."
          }
        ],
        quiz: {
          title: "Bulls and Bears Quiz",
          questions: [
            {
              id: "q1",
              question: "What does it mean when a trader is 'bullish'?",
              options: [
                "They're afraid to enter the market",
                "They expect prices to fall",
                "They expect prices to rise",
                "They're undecided about market direction"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "When is a bear market officially declared?",
              options: [
                "When prices fall for one trading day",
                "When prices fall 20% or more from recent highs",
                "When the central bank announces a recession",
                "When the majority of traders are bearish"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "Bull markets are typically associated with:",
              options: [
                "Economic recessions and corporate bankruptcies",
                "Flat, sideways price action",
                "Economic strength and growing corporate profits",
                "Government intervention in markets"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics8',
        title: "Financial Markets", 
        description: "Understanding different market types",
        content: [
          {
            type: "text",
            value: "Financial markets are platforms where traders buy and sell various assets. Each market has its own characteristics, trading hours, and regulations."
          },
          {
            type: "text",
            value: "The stock market involves trading shares of publicly listed companies. When you buy a stock, you're purchasing a small ownership stake in that company."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Different financial markets comparison",
            caption: "Comparison of major financial markets"
          },
          {
            type: "text",
            value: "The forex (foreign exchange) market is where currencies are traded in pairs, like EUR/USD or GBP/JPY. It's the largest and most liquid financial market in the world."
          },
          {
            type: "text",
            value: "Cryptocurrency markets operate 24/7 and allow trading of digital currencies like Bitcoin and Ethereum. These markets are relatively new and can be highly volatile."
          },
          {
            type: "text",
            value: "Commodity markets involve trading raw materials like gold, oil, natural gas, and agricultural products. These are often traded through futures contracts."
          }
        ],
        quiz: {
          title: "Financial Markets Quiz",
          questions: [
            {
              id: "q1",
              question: "What are you purchasing when you buy a stock?",
              options: [
                "A loan agreement with the company",
                "A small ownership stake in the company",
                "The right to manage the company",
                "A guaranteed dividend payment"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "Which financial market is the largest and most liquid in the world?",
              options: [
                "Stock market",
                "Cryptocurrency market",
                "Forex market",
                "Commodities market"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "Which of the following is true about cryptocurrency markets?",
              options: [
                "They operate only during business hours",
                "They are regulated by central banks",
                "They are the oldest financial markets",
                "They operate 24 hours a day, 7 days a week"
              ],
              correctAnswer: 3
            }
          ]
        }
      }
    ]
  },
  level2: {
    id: 'level2',
    title: 'Technical Analysis',
    icon: 'analytics',
    nextLevel: null, // Last level for now
    position: { top: 250, left: 450 },
    lessons: [
      { 
        id: 'tech1',
        title: "Chart Types", 
        description: "Understanding different chart representations",
        content: [
          {
            type: "text",
            value: "Charts are visual representations of price movements over time. There are several types of charts traders use to analyze markets."
          },
          {
            type: "text",
            value: "Line charts are the simplest form, showing a single line connecting closing prices. They provide a clean overview of price movement but lack detail about price action within each period."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Line chart example",
            caption: "Example of a simple line chart showing price movement"
          },
          {
            type: "text",
            value: "Candlestick charts show opening, closing, high, and low prices for each time period. They form patterns that traders use to predict future price movements."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Candlestick chart explained",
            caption: "Anatomy of a candlestick chart with bullish and bearish candles"
          },
          {
            type: "text",
            value: "Bar charts (OHLC charts) also display opening, high, low, and closing prices, but in a different format than candlesticks. They use vertical bars with small horizontal lines."
          }
        ],
        quiz: {
          title: "Chart Types Quiz",
          questions: [
            {
              id: "q1",
              question: "What information does a line chart typically show?",
              options: [
                "Opening, high, low, and closing prices",
                "Only opening and closing prices",
                "Only closing prices connected by a line",
                "Trading volume and price averages"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "Which chart type shows opening, closing, high, and low prices in a format that makes patterns easier to identify?",
              options: [
                "Point and figure charts",
                "Candlestick charts",
                "Line charts",
                "Scatter plots"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is a limitation of line charts compared to candlestick charts?",
              options: [
                "Line charts cannot show long time periods",
                "Line charts are more complex to read",
                "Line charts lack detail about price action within each period",
                "Line charts cannot be used for technical analysis"
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
};

// Define the connections between levels
const levelConnections = [
  { from: 'level1', to: 'level2' }
];

// Functie voor het transformeren van levels naar planeten
const transformLevelsToPlanets = () => {
  const levelNodes = document.querySelectorAll('.level-node');
  
  levelNodes.forEach(node => {
    // Controleer of de node al is getransformeerd
    if (node.querySelector('.planet-container')) return;
    
    // Haal bestaande elementen op
    const levelIcon = node.querySelector('.level-icon');
    const levelInfo = node.querySelector('.level-info');
    
    if (!levelIcon) return; // Skip als icon niet bestaat
    
    // Haal voortgangspercentage op
    const progressBar = node.querySelector('.progress-bar .progress');
    const progressStyle = progressBar ? progressBar.style.width : '0%';
    const progressPercentage = parseInt(progressStyle) || 0;
    
    // Maak planeet container
    const planetContainer = document.createElement('div');
    planetContainer.className = 'planet-container';
    
    // Maak planeet
    const planet = document.createElement('div');
    planet.className = 'planet';
    
    // Voeg voortgangsindicator toe in het midden van de planeet
    const planetProgress = document.createElement('div');
    planetProgress.className = 'planet-progress';
    
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `${progressPercentage}%`;
    
    planetProgress.appendChild(progressText);
    planet.appendChild(planetProgress);
    
    // Voeg willekeurige planeetkenmerken toe (kraters)
    for (let i = 0; i < 8; i++) {
      const feature = document.createElement('div');
      feature.className = 'planet-feature';
      
      // Willekeurige positie binnen de planeet
      feature.style.left = `${15 + Math.random() * 70}%`;
      feature.style.top = `${15 + Math.random() * 70}%`;
      
      // Willekeurige grootte
      const featureSize = 3 + Math.random() * 12;
      feature.style.width = `${featureSize}px`;
      feature.style.height = `${featureSize}px`;
      
      // Willekeurige transparantie
      feature.style.opacity = 0.1 + Math.random() * 0.3;
      
      planet.appendChild(feature);
    }
    
    // Voeg gloed-effect toe
    const planetGlow = document.createElement('div');
    planetGlow.className = 'planet-glow';
    
    // Plaats alles samen
    planetContainer.appendChild(planet);
    planetContainer.appendChild(planetGlow);
    
    // Vervang level icon met planeet
    node.replaceChild(planetContainer, levelIcon);
    
    // Pas de layout aan naar verticaal
    node.style.flexDirection = 'column';
    node.style.alignItems = 'center';
    
    // Pas text alignment aan
    if (levelInfo) {
      levelInfo.style.textAlign = 'center';
    }
  });
};

// Functie om raket toe te voegen op pad tussen levels
const addRocketToPath = () => {
  // Controleer of de raket al bestaat
  if (document.querySelector('.rocket')) return;
  
  const paths = document.querySelectorAll('.level-path');
  paths.forEach((path, index) => {
    // Controleer of pad actief is (niet uitgegrijsd)
    const isPathActive = path.style.opacity !== '0.4';
    if (!isPathActive) return;
    
    // Maak raket element
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    rocket.id = `rocket-${index}`;
    
    const rocketBody = document.createElement('div');
    rocketBody.className = 'rocket-body';
    
    const rocketShape = document.createElement('div');
    rocketShape.className = 'rocket-shape';
    
    const rocketWindow = document.createElement('div');
    rocketWindow.className = 'rocket-window';
    
    const rocketFlame = document.createElement('div');
    rocketFlame.className = 'rocket-flame';
    
    rocketBody.appendChild(rocketShape);
    rocketBody.appendChild(rocketWindow);
    rocketBody.appendChild(rocketFlame);
    rocket.appendChild(rocketBody);
    
    // Voeg raket toe aan de DOM
    document.querySelector('.world-map').appendChild(rocket);
    
    // Beweeg raket langs pad
    animateRocketAlongPath(rocket, path, index);
  });
};

// Functie voor raket animatie langs het pad
const animateRocketAlongPath = (rocket, path, pathIndex) => {
  let progress = 0;
  const speed = 0.5; // percentage per frame
  
  // Bereken pad positie
  const pathRect = path.getBoundingClientRect();
  const mapRect = document.querySelector('.world-map').getBoundingClientRect();
  
  // Start en eindpunten van het pad
  const startPoint = {
    x: pathRect.left - mapRect.left,
    y: pathRect.top - mapRect.top
  };
  
  const endPoint = {
    x: pathRect.right - mapRect.left,
    y: pathRect.bottom - mapRect.top
  };
  
  // Controlpunt voor de kromming (voor quadratische bezier curve)
  const controlPoint = {
    x: (startPoint.x + endPoint.x) / 2,
    y: (startPoint.y + endPoint.y) / 2 - 50
  };
  
  // Functie om een punt op een quadratische bezier curve te berekenen
  const getPointOnQuadraticCurve = (t, p0, p1, p2) => {
    const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    return { x, y };
  };
  
  // Functie om hoek te berekenen voor raket rotatie
  const getAngle = (p1, p2) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  };
  
  // Animatie functie
  function animate() {
    // Update voortgang
    progress += speed;
    if (progress > 100) progress = 0;
    
    const t = progress / 100;
    const position = getPointOnQuadraticCurve(t, startPoint, controlPoint, endPoint);
    
    // Bereken positie iets verder op het pad voor de rotatie
    const nextT = Math.min(t + 0.01, 1);
    const nextPosition = getPointOnQuadraticCurve(nextT, startPoint, controlPoint, endPoint);
    
    // Bereken rotatie hoek
    const angle = getAngle(position, nextPosition);
    
    // Pas positie en rotatie toe
    rocket.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle + 90}deg)`;
    
    // Vervolg animatie
    requestAnimationFrame(animate);
  }
  
  // Start animatie
  requestAnimationFrame(animate);
};

// Functie om kosmische elementen toe te passen
const applyCosmicElements = () => {
  setTimeout(() => {
    transformLevelsToPlanets();
    setTimeout(addRocketToPath, 500);
  }, 500);
};

// Generate space background elements
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() < 0.6 ? 'small' : Math.random() < 0.9 ? 'medium' : 'large';
    const twinkle = Math.random() < 0.7;
    const speed = Math.random() < 0.33 ? 'slow' : Math.random() < 0.66 ? '' : 'fast';
    
    stars.push({
      id: `star-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      twinkle,
      speed
    });
  }
  return stars;
};

const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 150) + 50;
    const speed = Math.random() < 0.33 ? 'float-slow' : Math.random() < 0.66 ? 'float' : 'float-fast';
    
    particles.push({
      id: `particle-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      speed,
      delay: Math.random() * 5
    });
  }
  return particles;
};

// Space background components
const SpaceBackground = () => {
  const [stars] = useState(() => generateStars(150));
  const [particles] = useState(() => generateParticles(10));
  
  return (
    <>
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.size} ${star.twinkle ? 'twinkle' : ''} ${star.speed}`}
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle ${particle.speed}`}
            style={{ 
              top: particle.top, 
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

// Homepage component
const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  
  // Voeg kosmische elementen toe na render
  useEffect(() => {
    applyCosmicElements();
  }, []);
  
  const handleNavigation = (levelId) => {
    if (progress.unlockedLevels.includes(levelId)) {
      navigate(`/level/${levelId}`);
    }
  };

  const getLevelProgress = (levelId) => {
    const level = courseStructure[levelId];
    const completedInLevel = level.lessons.filter(lesson => 
      progress.completedLessons.includes(lesson.id)
    ).length;
    
    return {
      completed: completedInLevel,
      total: level.lessons.length,
      percentage: (completedInLevel / level.lessons.length) * 100
    };
  };

  const getLevelConnectionPath = (from, to) => {
    const fromLevel = courseStructure[from];
    const toLevel = courseStructure[to];
    
    // Calculate the center points of each level node
    const fromCenterX = fromLevel.position.left + 125; // Half of the width
    const fromCenterY = fromLevel.position.top + 50;  // Half of the height
    
    const toCenterX = toLevel.position.left + 125;
    const toCenterY = toLevel.position.top + 50;
    
    return `M${fromCenterX},${fromCenterY} Q${(fromCenterX + toCenterX) / 2},${(fromCenterY + toCenterY) / 2 - 50} ${toCenterX},${toCenterY}`;
  };

  return (
    <div className="home-container">
      <header>
        <h1>TRADELINGO</h1>
        <p>Master trading in a cosmic journey through space</p>
      </header>
      
      <div className="world-map">
        {/* Path connections between levels */}
        <svg className="level-paths" width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="none">
          {levelConnections.map((connection, index) => {
            const isPathUnlocked = progress.unlockedLevels.includes(connection.to);
            return (
              <path 
                key={index} 
                d={getLevelConnectionPath(connection.from, connection.to)} 
                className="level-path" 
                style={{ 
                  opacity: isPathUnlocked ? 1 : 0.4,
                  strokeDasharray: isPathUnlocked ? "8" : "8",
                  animation: isPathUnlocked ? "dash 30s linear infinite" : "none"
                }}
              />
            );
          })}
        </svg>
        
        {Object.keys(courseStructure).map((levelId) => {
          const level = courseStructure[levelId];
          const isUnlocked = progress.unlockedLevels.includes(levelId);
          const levelProgress = getLevelProgress(levelId);
          
          return (
            <div 
              key={levelId} 
              className={`level-node ${isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => isUnlocked && handleNavigation(levelId)}
              style={{ top: `${level.position.top}px`, left: `${level.position.left}px` }}
            >
              <div className="level-icon">
                <i className={`fas fa-${level.icon}`}></i>
              </div>
              <div className="level-info">
                <h2>{level.title}</h2>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${levelProgress.percentage}%` }}></div>
                </div>
                <p>{levelProgress.completed}/{levelProgress.total}</p>
              </div>
              {!isUnlocked && <div className="lock-overlay"><i className="fas fa-lock"></i></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Quiz component
const Quiz = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (!submitted) {
      setAnswers({
        ...answers,
        [questionId]: optionIndex
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    
    // Pass score back to parent
    onComplete(finalScore);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <h3>{submitted ? `Your Score: ${score}%` : "Quiz"}</h3>
      
      {questions.map((question, index) => (
        <div key={question.id} className="quiz-question">
          <p className="question-text">{`${index + 1}. ${question.question}`}</p>
          <div className="options-container">
            {question.options.map((option, optionIndex) => (
              <div 
                key={optionIndex}
                className={`option ${
                  submitted 
                    ? optionIndex === question.correctAnswer 
                      ? "correct" 
                      : answers[question.id] === optionIndex 
                        ? "incorrect" 
                        : "" 
                    : answers[question.id] === optionIndex 
                      ? "selected" 
                      : ""
                }`}
                onClick={() => handleAnswerSelect(question.id, optionIndex)}
              >
                {option}
                {submitted && optionIndex === question.correctAnswer && (
                  <span className="check-icon"><i className="fas fa-check"></i></span>
                )}
                {submitted && answers[question.id] === optionIndex && optionIndex !== question.correctAnswer && (
                  <span className="cross-icon"><i className="fas fa-times"></i></span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="quiz-actions">
        {!submitted ? (
          <button className="submit-button" onClick={handleSubmit}>Submit Answers</button>
        ) : (
          <div className="post-submit-actions">
            <button className="try-again-button" onClick={handleTryAgain}>Try Again</button>
            {score >= 70 && (
              <button className="continue-button" onClick={() => onComplete(score, true)}>
                Continue to Next Lesson
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Level page component
const LevelPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  const [showPopup, setShowPopup] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Voeg kosmische elementen toe na render
  useEffect(() => {
    applyCosmicElements();
  }, []);
  
  // Get level ID from URL
  const pathParts = window.location.pathname.split('/');
  const levelId = pathParts[pathParts.length - 1];
  const level = courseStructure[levelId];
  
  // Redirect if level doesn't exist or is not unlocked
  if (!level || !progress.unlockedLevels.includes(levelId)) {
    return <Navigate to="/" />;
  }
  
  const openLesson = (lesson, index) => {
    // Check if previous lessons are completed
    const previousLessonsCompleted = level.lessons
      .slice(0, index)
      .every(prevLesson => progress.completedLessons.includes(prevLesson.id));
      
    if (previousLessonsCompleted || progress.completedLessons.includes(lesson.id)) {
      setActiveLesson({...lesson, index});
      setShowPopup(true);
      setShowQuiz(false);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setShowQuiz(false);
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, continueToNext = false) => {
    const newProgress = { ...progress };
    
    // Save the quiz score
    if (!newProgress.quizScores) {
      newProgress.quizScores = {};
    }
    
    newProgress.quizScores[activeLesson.id] = score;
    
    // Mark lesson as completed if score is above 70%
    if (score >= 70 && !newProgress.completedLessons.includes(activeLesson.id)) {
      newProgress.completedLessons.push(activeLesson.id);
      
      // Check if all lessons in this level are completed
      const allCompleted = level.lessons.every(lesson => 
        newProgress.completedLessons.includes(lesson.id)
      );
      
      // Unlock next level if exists
      if (allCompleted && level.nextLevel && !newProgress.unlockedLevels.includes(level.nextLevel)) {
        newProgress.unlockedLevels.push(level.nextLevel);
      }
    }
    
    setProgress(newProgress);
    saveUserProgress(newProgress);
    
    if (continueToNext && activeLesson.index < level.lessons.length - 1) {
      // Move to the next lesson
      const nextLesson = level.lessons[activeLesson.index + 1];
      setActiveLesson({...nextLesson, index: activeLesson.index + 1});
      setShowQuiz(false);
    }
  };
  
  const isLessonAvailable = (index) => {
    if (index === 0) return true;
    
    // Check if all previous lessons are completed
    return level.lessons
      .slice(0, index)
      .every(lesson => progress.completedLessons.includes(lesson.id));
  };
  
  return (
    <div className="level-page">
      <header>
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1>{level.title} <i className={`fas fa-${level.icon}`}></i></h1>
      </header>
      
      <div className="lesson-list">
        {level.lessons.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const isAvailable = isLessonAvailable(index);
          const quizScore = progress.quizScores && progress.quizScores[lesson.id];
          
          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
              onClick={() => isAvailable && openLesson(lesson, index)}
            >
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-details">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                {quizScore !== undefined && (
                  <div className="quiz-score">
                    Quiz Score: {quizScore}%
                  </div>
                )}
              </div>
              <div className="lesson-status">
                {isCompleted ? (
                  <i className="fas fa-check-circle"></i>
                ) : !isAvailable ? (
                  <i className="fas fa-lock"></i>
                ) : (
                  <i className="fas fa-circle-notch"></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {showPopup && activeLesson && (
        <div className="lesson-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>{activeLesson.title}</h2>
              <button className="close-button" onClick={closePopup}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="popup-body">
              {!showQuiz ? (
                <>
                  {activeLesson.content.map((item, index) => {
                    if (item.type === "text") {
                      return <p key={index}>{item.value}</p>;
                    } else if (item.type === "image") {
                      return (
                        <div key={index} className="lesson-image-container">
                          <img 
                            src={item.src} 
                            alt={item.alt} 
                            className="lesson-image" 
                          />
                          {item.caption && (
                            <p className="image-caption">{item.caption}</p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="lesson-actions">
                    {progress.completedLessons.includes(activeLesson.id) ? (
                      <div className="completion-badge">
                        <i className="fas fa-trophy"></i>
                        <p>Completed</p>
                      </div>
                    ) : (
                      <button 
                        className="start-quiz-button"
                        onClick={startQuiz}
                      >
                        Start Quiz
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <Quiz 
                  questions={activeLesson.quiz.questions} 
                  onComplete={handleQuizComplete} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App component
function App() {
  // Initialize progress if not already in localStorage
  useEffect(() => {
    if (!localStorage.getItem('tradeLingo_progress')) {
      const initialProgress = {
        completedLessons: [],
        quizScores: {},
        unlockedLevels: ['level1']
      };
      localStorage.setItem('tradeLingo_progress', JSON.stringify(initialProgress));
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <SpaceBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level/:levelId" element={<LevelPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
