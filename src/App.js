import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// GEWIJZIGD: Nu importeren we het hele object en halen we initCosmicElements eruit
import cosmicModule from './components/cosmic_tradelingo';
// We halen de functie uit het geïmporteerde object
const { initCosmicElements } = cosmicModule;

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

// Define course structure met bijgewerkte lesinhoud
const courseStructure = {
  level1: {
    id: 'level1',
    title: 'What is Trading?',
    icon: 'chart-line',
    nextLevel: 'level2',
    position: { top: 100, left: 100 },
    lessons: [
      { 
        id: 'basics1',
        title: "How Does Trading Work?", 
        description: "Understanding the fundamentals of trading",
        content: [
          {
            type: "text",
            value: "Trading is the process of buying and selling financial assets with the goal of making a profit. Traders buy assets when they believe prices will rise and sell when they think prices will fall."
          },
          {
            type: "text",
            value: "Trading works through exchanges and marketplaces where buyers and sellers come together to transact. Modern trading is primarily electronic, happening through online platforms provided by brokers or exchanges."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading process flow diagram",
            caption: "The flow of a typical trade from order placement to execution"
          },
          {
            type: "text",
            value: "When you place a trade, you're essentially placing an order to buy or sell an asset at a specific price. This order goes to the exchange where it's matched with a counterparty willing to take the other side of your trade."
          },
          {
            type: "text",
            value: "Trading can be done in two directions: going 'long' (buying first, then selling later at a hopefully higher price) or going 'short' (selling borrowed assets first, then buying them back later at a hopefully lower price)."
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
              question: "What are the two main directions for trading?",
              options: [
                "Up and down",
                "Long and short",
                "Buy and hold",
                "Fast and slow"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'basics2',
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
            value: "Risk management is a crucial part of a trader's activities. They determine how much capital to risk on each trade, use stop-loss orders to limit potential losses, and diversify their trades across different assets or markets."
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
              question: "Why is risk management important for traders?",
              options: [
                "It's not important; traders aim for maximum gains",
                "To protect their capital and ensure longevity in the markets",
                "Only because regulations require it",
                "Just to impress other traders"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is a trading plan?",
              options: [
                "A guarantee of profits",
                "A set of guidelines including entry/exit points and risk management",
                "A list of hot tips from other traders",
                "A schedule of when to trade during the day"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'basics3',
        title: "Trading vs Investing", 
        description: "Key differences between trading and investing",
        content: [
          {
            type: "text",
            value: "Trading and investing are both ways to participate in financial markets, but they differ significantly in approach, timeframe, and goals."
          },
          {
            type: "text",
            value: "Traders typically focus on short-term price movements, holding positions for minutes, hours, days, or weeks. They aim to profit from market volatility and price fluctuations."
          },
          {
            type: "text",
            value: "Investors, on the other hand, take a long-term approach, often holding assets for years or decades. They focus on the fundamental value of assets and their potential for growth over time."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading vs Investing comparison chart",
            caption: "Key differences between trading and investing approaches"
          },
          {
            type: "text",
            value: "Trading typically requires more active market monitoring and frequent decision-making, while investing often follows a 'buy and hold' strategy with less frequent adjustments."
          },
          {
            type: "text",
            value: "Both trading and investing have their own advantages and risks, and many market participants use a combination of both approaches in their financial strategy."
          }
        ],
        quiz: {
          title: "Trading vs Investing Quiz",
          questions: [
            {
              id: "q1",
              question: "What is the typical timeframe for trading?",
              options: [
                "Minutes to weeks",
                "Months to years",
                "Only seconds",
                "Decades"
              ],
              correctAnswer: 0
            },
            {
              id: "q2",
              question: "How would you characterize an investor's approach compared to a trader's?",
              options: [
                "More focus on short-term price movements",
                "More concern with day-to-day market volatility",
                "More emphasis on long-term growth and fundamental value",
                "More focus on leveraged positions"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "Which approach typically requires more frequent market monitoring?",
              options: [
                "Investing",
                "Trading",
                "Both require the same amount",
                "Neither requires monitoring"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'basics4',
        title: "How Does a Broker Work?", 
        description: "Understanding brokers, orderbooks, and matching",
        content: [
          {
            type: "text",
            value: "A broker is a financial intermediary who executes trades on behalf of clients. Brokers provide access to markets that individuals typically cannot access directly."
          },
          {
            type: "text",
            value: "When you place an order through a broker, it's sent to an exchange or market where it's added to the order book. An order book is a list of all buy and sell orders for a specific asset, organized by price level."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Order book visualization",
            caption: "Example of an order book showing buy and sell orders at different price levels"
          },
          {
            type: "text",
            value: "Order matching is the process where buy orders are paired with sell orders. When a buy order price matches or exceeds a sell order price, a trade executes. This typically happens automatically on electronic exchanges."
          },
          {
            type: "text",
            value: "Most modern brokers offer services beyond just executing trades, including providing trading platforms, research tools, educational resources, and sometimes financial advice."
          }
        ],
        quiz: {
          title: "Broker and Order Book Quiz",
          questions: [
            {
              id: "q1",
              question: "What is an order book?",
              options: [
                "A record of all executed trades",
                "A list of all buy and sell orders organized by price",
                "A broker's client list",
                "A trader's personal trade journal"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "When does order matching occur?",
              options: [
                "When a broker decides to execute an order",
                "At the end of the trading day",
                "When buy and sell prices match or overlap",
                "When new market data is released"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "What is the primary role of a broker?",
              options: [
                "To provide financial advice",
                "To manage your investment portfolio",
                "To execute trades on behalf of clients",
                "To predict market movements"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics5',
        title: "Trading Terminology", 
        description: "Understanding spreads, slippage, and liquidity",
        content: [
          {
            type: "text",
            value: "The spread is the difference between the bid price (what buyers are willing to pay) and the ask price (what sellers are willing to accept). Tighter spreads generally indicate more liquid markets."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Bid-ask spread illustration",
            caption: "Visual representation of the bid-ask spread in a market"
          },
          {
            type: "text",
            value: "Slippage occurs when an order executes at a different price than expected. This typically happens during periods of high volatility or in markets with low liquidity, when orders cannot be filled at the exact requested price."
          },
          {
            type: "text",
            value: "Liquidity refers to how easily an asset can be bought or sold without affecting its price. Highly liquid markets have many buyers and sellers, making it easier to execute trades at expected prices."
          },
          {
            type: "text",
            value: "Other important terms include 'volume' (the number of shares or contracts traded), 'volatility' (the degree of variation in price over time), and 'market depth' (the market's ability to absorb large orders without price impact)."
          }
        ],
        quiz: {
          title: "Trading Terminology Quiz",
          questions: [
            {
              id: "q1",
              question: "What is the spread in trading?",
              options: [
                "The range between the highest and lowest price in a day",
                "The difference between bid and ask prices",
                "The commission charged by brokers",
                "The average price movement of an asset"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What causes slippage?",
              options: [
                "Technical errors in trading platforms",
                "Traders changing their minds after placing orders",
                "Low liquidity or high volatility in markets",
                "Brokers deliberately changing prices"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "What characterizes a highly liquid market?",
              options: [
                "High trading fees",
                "Large price gaps between trades",
                "Many active buyers and sellers",
                "Few trades but in large volume"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics6',
        title: "Bulls and Bears", 
        description: "Understanding market sentiment and trends",
        content: [
          {
            type: "text",
            value: "The terms 'bull' and 'bear' are used to describe market sentiment and trends. A bull market is characterized by rising prices and optimism, while a bear market features falling prices and pessimism."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Bull and bear market comparison",
            caption: "Visual comparison of bull and bear market patterns"
          },
          {
            type: "text",
            value: "Bulls are traders who believe prices will rise and therefore take 'long' positions. The term comes from the way a bull thrusts its horns upward when attacking."
          },
          {
            type: "text",
            value: "Bears are traders who believe prices will fall and take 'short' positions. The term comes from the way a bear swipes its paws downward when attacking."
          },
          {
            type: "text",
            value: "Market sentiment can shift between bullish and bearish based on economic indicators, company earnings, geopolitical events, and many other factors that influence trader psychology."
          }
        ],
        quiz: {
          title: "Bulls and Bears Quiz",
          questions: [
            {
              id: "q1",
              question: "What characterizes a bull market?",
              options: [
                "Falling prices and pessimism",
                "Rising prices and optimism",
                "Stable prices with low volatility",
                "High trading volume but no price change"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What position would a bear typically take in the market?",
              options: [
                "Long position, buying assets",
                "Short position, selling assets",
                "No position, staying in cash",
                "Neutral position with equal buys and sells"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What can cause shifts between bullish and bearish market sentiment?",
              options: [
                "Only central bank decisions",
                "Only company earnings reports",
                "Only technical chart patterns",
                "Economic indicators, earnings, geopolitical events, and more"
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
    title: 'Financial Markets',
    icon: 'analytics',
    nextLevel: null, // Last level for now
    position: { top: 250, left: 450 },
    lessons: [
      { 
        id: 'markets1',
        title: "Forex Market", 
        description: "Understanding currency trading",
        content: [
          {
            type: "text",
            value: "The foreign exchange (forex) market is where currencies are traded. It's the largest financial market in the world, with an average daily trading volume exceeding $6 trillion."
          },
          {
            type: "text",
            value: "Forex trading involves buying one currency while simultaneously selling another, creating currency pairs such as EUR/USD (Euro/US Dollar) or GBP/JPY (British Pound/Japanese Yen)."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Forex trading chart",
            caption: "Example of a forex trading chart showing currency pair movements"
          },
          {
            type: "text",
            value: "The forex market operates 24 hours a day, five days a week, closing only for weekends. It spans across major financial centers in different time zones, allowing for continuous trading."
          },
          {
            type: "text",
            value: "Forex traders profit from changes in currency exchange rates, which are influenced by economic indicators, interest rates, geopolitical events, and market sentiment."
          }
        ],
        quiz: {
          title: "Forex Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What are traded in the forex market?",
              options: [
                "Stocks",
                "Commodities",
                "Currency pairs",
                "Bonds"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "What is the approximate daily trading volume in the forex market?",
              options: [
                "$1 billion",
                "$100 billion",
                "$6 trillion",
                "$10 trillion"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "When does the forex market operate?",
              options: [
                "During US business hours only",
                "24 hours a day, 7 days a week",
                "24 hours a day, 5 days a week",
                "9 AM to 5 PM in each local market"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'markets2',
        title: "Stock Market", 
        description: "Trading company shares",
        content: [
          {
            type: "text",
            value: "The stock market is where shares of publicly traded companies are bought and sold. When you buy a stock, you're purchasing a small ownership stake in a company."
          },
          {
            type: "text",
            value: "Stocks are traded on exchanges like the New York Stock Exchange (NYSE), NASDAQ, or Tokyo Stock Exchange (TSE). These exchanges provide organized marketplaces with rules and regulations."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Stock market trading floor",
            caption: "Stock exchange trading floor (though most trading is now electronic)"
          },
          {
            type: "text",
            value: "Stock prices are influenced by company performance, industry trends, economic conditions, investor sentiment, and many other factors. Traders analyze these factors using fundamental or technical analysis."
          },
          {
            type: "text",
            value: "Unlike forex, stock markets have specific opening hours. For example, the NYSE operates from 9:30 AM to 4:00 PM Eastern Time, Monday through Friday, excluding holidays."
          }
        ],
        quiz: {
          title: "Stock Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What do you own when you buy a stock?",
              options: [
                "A loan to the company",
                "A share of company ownership",
                "A company product",
                "A right to manage the company"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "Where are stocks traded?",
              options: [
                "Only in private transactions",
                "On stock exchanges like NYSE and NASDAQ",
                "Directly at company headquarters",
                "Only through banks"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What are the trading hours for the New York Stock Exchange?",
              options: [
                "24 hours a day",
                "9:30 AM to 4:00 PM Eastern Time, weekdays",
                "8:00 AM to 8:00 PM, including weekends",
                "7:00 AM to 2:00 PM, weekdays"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'markets3',
        title: "Cryptocurrency Market", 
        description: "Trading digital assets",
        content: [
          {
            type: "text",
            value: "The cryptocurrency market involves the trading of digital or virtual currencies like Bitcoin, Ethereum, and thousands of other alternative coins (altcoins)."
          },
          {
            type: "text",
            value: "Unlike traditional markets, cryptocurrencies trade 24/7, 365 days a year on various exchanges worldwide. These exchanges can be centralized (like Coinbase or Binance) or decentralized (like Uniswap)."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Cryptocurrency trading interface",
            caption: "Example of a cryptocurrency trading platform interface"
          },
          {
            type: "text",
            value: "Cryptocurrency prices are highly volatile and can be influenced by technological developments, regulatory news, market sentiment, and broader adoption trends."
          },
          {
            type: "text",
            value: "Trading cryptocurrencies involves specific considerations including wallet security, blockchain transaction confirmations, and understanding the unique technologies behind different digital assets."
          }
        ],
        quiz: {
          title: "Cryptocurrency Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What are the trading hours for cryptocurrency markets?",
              options: [
                "Same as stock markets",
                "24 hours a day, 7 days a week",
                "9 AM to 9 PM globally",
                "Only during US business hours"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What are two examples of major cryptocurrencies?",
              options: [
                "Dollar and Euro",
                "Gold and Silver",
                "Bitcoin and Ethereum",
                "NYSE and NASDAQ"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "What's a characteristic of cryptocurrency markets?",
              options: [
                "Low volatility",
                "Government-backed stability",
                "Central bank regulation",
                "High price volatility"
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      { 
        id: 'markets4',
        title: "Commodities Market", 
        description: "Trading physical goods",
        content: [
          {
            type: "text",
            value: "Commodities markets involve the trading of raw materials or primary agricultural products. Major categories include energy (oil, natural gas), metals (gold, silver), and agricultural products (wheat, coffee)."
          },
          {
            type: "text",
            value: "Most commodity trading happens through futures contracts, which are agreements to buy or sell a specific amount of a commodity at a predetermined price at a specified time in the future."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Commodity trading chart",
            caption: "Gold futures price chart showing historical price movements"
          },
          {
            type: "text",
            value: "Commodity prices are influenced by supply and demand factors, weather conditions (for agricultural commodities), geopolitical events, and broader economic trends."
          },
          {
            type: "text",
            value: "Traders can participate in commodity markets through futures exchanges like the Chicago Mercantile Exchange (CME), through commodity ETFs, or via stocks of companies involved in commodity production."
          }
        ],
        quiz: {
          title: "Commodities Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What are examples of commodities?",
              options: [
                "Stocks and bonds",
                "Oil, gold, and wheat",
                "Real estate properties",
                "Currency pairs"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "How are commodities typically traded?",
              options: [
                "Only through direct physical exchange",
                "Primarily through futures contracts",
                "Only in small retail quantities",
                "Through cryptocurrency exchanges"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What factors influence agricultural commodity prices?",
              options: [
                "Only company earnings",
                "Only interest rates",
                "Weather conditions and supply/demand",
                "Only stock market performance"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'markets5',
        title: "Indices Market", 
        description: "Trading market indexes",
        content: [
          {
            type: "text",
            value: "Market indices track the performance of groups of stocks, providing a snapshot of market performance. Examples include the S&P 500, Dow Jones Industrial Average, and NASDAQ Composite in the US, and others like FTSE 100 (UK) or Nikkei 225 (Japan)."
          },
          {
            type: "text",
            value: "Traders can't directly buy or sell an index, but they can trade index funds, futures, options, or ETFs that track these indices."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Market index chart",
            caption: "Performance chart of a major market index"
          },
          {
            type: "text",
            value: "Indices are weighted differently: some are price-weighted (like the Dow Jones), while others are market-capitalization-weighted (like the S&P 500), affecting how individual stock movements impact the index."
          },
          {
            type: "text",
            value: "Trading index-based products offers exposure to broad market segments without the need to buy individual stocks, providing instant diversification."
          }
        ],
        quiz: {
          title: "Indices Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What is a market index?",
              options: [
                "A single company's stock",
                "A measure tracking a group of stocks' performance",
                "A type of cryptocurrency",
                "A government bond"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "Can traders directly buy an index like the S&P 500?",
              options: [
                "Yes, directly from the exchange",
                "No, they must use index funds, futures, or ETFs",
                "Only during specific market hours",
                "Only with special broker permissions"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What's an advantage of trading index-based products?",
              options: [
                "Guaranteed returns",
                "No risk exposure",
                "Instant diversification across multiple stocks",
                "No trading fees"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'markets6',
        title: "Futures Market", 
        description: "Trading future delivery contracts",
        content: [
          {
            type: "text",
            value: "Futures are standardized contracts obligating the buyer to purchase, or the seller to sell, a specific asset at a predetermined price on a specified future date."
          },
          {
            type: "text",
            value: "Originally developed for agricultural producers and consumers to hedge against price fluctuations, futures now cover a wide range of assets including commodities, currencies, indices, and even interest rates."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Futures trading terminal",
            caption: "Example of a futures trading platform showing various contracts"
          },
          {
            type: "text",
            value: "Futures trading typically involves leverage, meaning traders only need to put up a fraction of the contract's value (margin) to control the full position, amplifying both potential profits and losses."
          },
          {
            type: "text",
            value: "Unlike many other markets, futures contracts have expiration dates. Traders who don't want to take or make delivery must close or roll over their positions before expiration."
          }
        ],
        quiz: {
          title: "Futures Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What is a futures contract?",
              options: [
                "An option to buy or sell at your discretion",
                "An agreement to buy/sell an asset at a predetermined future price/date",
                "A loan to purchase stocks",
                "A type of cryptocurrency"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What happens if you hold a futures contract until expiration?",
              options: [
                "The contract automatically renews",
                "You're obligated to take or make delivery of the underlying asset",
                "The contract becomes worthless",
                "The broker closes it for you with no consequences"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What does trading on margin mean in futures markets?",
              options: [
                "Trading with borrowed money",
                "Trading with only a fraction of the contract value as deposit",
                "Trading only at market open",
                "Trading without fees"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      { 
        id: 'markets7',
        title: "Options Market", 
        description: "Trading the right to buy or sell",
        content: [
          {
            type: "text",
            value: "Options are contracts that give the holder the right, but not the obligation, to buy (call option) or sell (put option) an underlying asset at a specified price (strike price) before a certain date (expiration date)."
          },
          {
            type: "text",
            value: "The buyer of an option pays a premium to the seller for this right. If the market moves favorably, the option can be exercised for profit; if not, the buyer can let it expire worthless, losing only the premium paid."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Options chain display",
            caption: "Example of an options chain showing various strike prices and expiration dates"
          },
          {
            type: "text",
            value: "Options are used for speculation, income generation, and risk management (hedging). They offer flexibility and can be combined in various strategies to profit from different market conditions."
          },
          {
            type: "text",
            value: "Option pricing is influenced by several factors including the underlying asset's price, time until expiration, volatility, interest rates, and dividends. These components are measured by 'the Greeks' (delta, gamma, theta, vega, and rho)."
          }
        ],
        quiz: {
          title: "Options Market Quiz",
          questions: [
            {
              id: "q1",
              question: "What right does a call option give its holder?",
              options: [
                "The right to sell an asset at the strike price",
                "The right to buy an asset at the strike price",
                "The right to change the strike price",
                "The right to extend the expiration date"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What does the buyer of an option pay?",
              options: [
                "Strike price",
                "Premium",
                "Margin",
                "Commission only"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What happens if you don't exercise an option by expiration?",
              options: [
                "You're forced to exercise it",
                "The option is automatically renewed",
                "The option expires worthless",
                "You pay a penalty fee"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'markets8',
        title: "ETFs and Funds", 
        description: "Trading baskets of assets",
        content: [
          {
            type: "text",
            value: "Exchange-Traded Funds (ETFs) are investment funds traded on stock exchanges, similar to individual stocks. They hold assets like stocks, bonds, or commodities and typically track an underlying index."
          },
          {
            type: "text",
            value: "ETFs offer diversification benefits as they contain multiple securities, reducing the risk compared to holding individual assets. They can track broad markets, specific sectors, commodities, or even investment strategies."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "ETF structure diagram",
            caption: "How ETFs are structured and traded on exchanges"
          },
          {
            type: "text",
            value: "Unlike mutual funds, ETFs trade throughout the day at market prices that may differ from their net asset value (NAV). They generally have lower expense ratios and greater tax efficiency than mutual funds."
          },
          {
            type: "text",
            value: "Other fund types include mutual funds (pooled investments managed by professionals, priced once daily), index funds (similar to ETFs but structured as mutual funds), and hedge funds (private investment vehicles with more flexibility and higher minimums)."
          }
        ],
        quiz: {
          title: "ETFs and Funds Quiz",
          questions: [
            {
              id: "q1",
              question: "What is an ETF?",
              options: [
                "A type of cryptocurrency",
                "An individual stock",
                "An investment fund traded on exchanges like a stock",
                "A type of options contract"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "How do ETFs differ from mutual funds in terms of trading?",
              options: [
                "ETFs can only be bought, not sold",
                "ETFs trade throughout the day at market prices",
                "ETFs can only be traded monthly",
                "ETFs have fixed prices set by the fund manager"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What's a primary benefit of ETFs?",
              options: [
                "Guaranteed returns",
                "No risk exposure",
                "Diversification across multiple securities",
                "Free trading without fees"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'markets9',
        title: "Trading Hours Per Market", 
        description: "Understanding when markets are open",
        content: [
          {
            type: "text",
            value: "Different financial markets operate during specific hours, often aligned with business hours in their respective regions. Understanding these hours is crucial for traders."
          },
          {
            type: "text",
            value: "Stock markets typically follow set schedules based on their location. For example, the New York Stock Exchange (NYSE) and NASDAQ operate from 9:30 AM to 4:00 PM Eastern Time (ET), Monday through Friday, excluding holidays."
          },
          {
            type: "text",
            value: "Asian markets like the Tokyo Stock Exchange (8:00 AM to 3:00 PM Japan Standard Time) and Hong Kong Stock Exchange (9:30 AM to 4:00 PM Hong Kong Time) open first, followed by European markets like the London Stock Exchange (8:00 AM to 4:30 PM GMT), and then North American markets."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Global trading hours chart",
            caption: "Time overlap of major financial markets around the world"
          },
          {
            type: "text",
            value: "The forex market operates 24 hours a day, five days a week, with trading beginning in Asia, moving to Europe, and then to North America before beginning again in Asia the next day."
          },
          {
            type: "text",
            value: "Cryptocurrency markets operate 24/7, while futures and options markets often have regular trading hours with additional electronic trading sessions outside standard hours. Commodity markets frequently follow the hours of the exchanges where they're traded."
          }
        ],
        quiz: {
          title: "Trading Hours Quiz",
          questions: [
            {
              id: "q1",
              question: "What are the trading hours for the New York Stock Exchange (NYSE)?",
              options: [
                "24 hours a day, 7 days a week",
                "9:30 AM to 4:00 PM Eastern Time, weekdays",
                "8:00 AM to 5:00 PM Eastern Time, including weekends",
                "7:00 AM to 2:00 PM Eastern Time, weekdays"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "Which market operates continuously, 24 hours a day, 7 days a week?",
              options: [
                "Stock markets",
                "Bond markets",
                "Cryptocurrency markets",
                "Commodity markets"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "How does the forex market operate?",
              options: [
                "Only during US business hours",
                "24 hours a day, 5 days a week",
                "Only when stock markets are open",
                "9 AM to 5 PM in each local timezone"
              ],
              correctAnswer: 1
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

// Space background component
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

// Home component
const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  
  // Apply cosmic elements with debugging
  useEffect(() => {
    console.log("Home component gemonteerd, kosmische elementen voorbereiden...");
    
    const timeoutId = setTimeout(() => {
      console.log("Timeout voorbij, initCosmicElements aanroepen...");
      try {
        if (typeof initCosmicElements === 'function') {
          console.log("initCosmicElements is een functie, nu aanroepen");
          initCosmicElements();
        } else {
          console.error("FOUT: initCosmicElements is GEEN functie!", typeof initCosmicElements);
          console.error("Waarde van initCosmicElements:", initCosmicElements);
        }
      } catch (err) {
        console.error("Fout bij aanroepen van initCosmicElements:", err);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
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
    
    const pathString = `M${fromCenterX},${fromCenterY} Q${(fromCenterX + toCenterX) / 2},${(fromCenterY + toCenterY) / 2 - 50} ${toCenterX},${toCenterY}`;
    return pathString;
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
        
        {/* Level nodes */}
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

// Level page component
const LevelPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  const [showPopup, setShowPopup] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Apply cosmic elements with debugging
  useEffect(() => {
    console.log("LevelPage component gemonteerd, kosmische elementen voorbereiden...");
    
    const timeoutId = setTimeout(() => {
      console.log("Timeout voorbij, initCosmicElements aanroepen...");
      try {
        if (typeof initCosmicElements === 'function') {
          console.log("initCosmicElements is een functie, nu aanroepen");
          initCosmicElements();
        } else {
          console.error("FOUT: initCosmicElements is GEEN functie!", typeof initCosmicElements);
          console.error("Waarde van initCosmicElements:", initCosmicElements);
        }
      } catch (err) {
        console.error("Fout bij aanroepen van initCosmicElements:", err);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
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
    console.log("App component gemonteerd, localStorage controleren...");
    
    if (!localStorage.getItem('tradeLingo_progress')) {
      console.log("Geen localStorage data gevonden, initiële data aanmaken");
      const initialProgress = {
        completedLessons: [],
        quizScores: {},
        unlockedLevels: ['level1']
      };
      localStorage.setItem('tradeLingo_progress', JSON.stringify(initialProgress));
    } else {
      console.log("Bestaande localStorage data gevonden");
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
