// src/data/levels/level2.js
const level2 = {
  id: 'level2',
  title: 'Financial Markets',
  icon: 'analytics',
  nextLevel: null, // Last level for now
  position: { top: 250, left: 450 },
  lessons: [
    {
      id: 'lesson2_1',
      title: 'Stock Markets Explained',
      description: 'Understand how stock markets function and how to participate',
      content: [
        {
          type: 'text',
          value: 'Stock markets are organized marketplaces where shares of publicly traded companies are bought and sold. These markets can be physical locations (like the NYSE trading floor) or electronic networks (like NASDAQ).'
        },
        {
          type: 'text',
          value: 'When companies want to raise capital, they can issue shares through an Initial Public Offering (IPO). After the IPO, these shares trade on secondary markets where investors buy and sell them based on their perceived value.'
        },
        {
          type: 'text',
          value: 'Stock prices are determined by supply and demand dynamics. When more investors want to buy a stock than sell it, the price typically rises. Conversely, when more investors want to sell than buy, the price usually falls.'
        },
        {
          type: 'image',
          src: 'https://via.placeholder.com/600x300',
          alt: 'Stock market trading',
          caption: 'Modern stock trading happens primarily through electronic networks'
        }
      ],
      quiz: {
        questions: [
          {
            id: 'q3_1',
            question: 'What is an IPO?',
            options: [
              'International Portfolio Optimization',
              'Initial Public Offering',
              'Internal Price Oscillation',
              'Investor Protection Order'
            ],
            correctAnswer: 1
          },
          {
            id: 'q3_2',
            question: 'What happens to a stock\'s price when more investors want to sell it than buy it?',
            options: [
              'The price typically rises',
              'The price remains stable',
              'The price typically falls',
              'Trading gets suspended'
            ],
            correctAnswer: 2
          },
          {
            id: 'q3_3',
            question: 'Which of these is NOT a major stock exchange?',
            options: [
              'NYSE (New York Stock Exchange)',
              'NASDAQ',
              'LSE (London Stock Exchange)',
              'IMF (International Monetary Fund)'
            ],
            correctAnswer: 3
          }
        ]
      }
    },
    {
      id: 'lesson2_2',
      title: 'Bond Markets and Debt Securities',
      description: 'Learn about bonds, treasuries, and other debt instruments',
      content: [
        {
          type: 'text',
          value: 'Bond markets, also known as debt markets or fixed-income markets, allow governments, municipalities, and corporations to issue debt securities to raise capital. Investors who buy bonds are essentially lending money to the issuer.'
        },
        {
          type: 'text',
          value: 'Bonds typically pay regular interest (known as coupon payments) and return the principal amount at maturity. They are generally considered less risky than stocks, though the risk level varies depending on the issuer\'s creditworthiness.'
        },
        {
          type: 'text',
          value: 'Government bonds, such as U.S. Treasury securities, are backed by the full faith and credit of the issuing government and are considered among the safest investments. Corporate bonds, issued by companies, generally offer higher yields but come with higher risk.'
        },
        {
          type: 'image',
          src: 'https://via.placeholder.com/600x300',
          alt: 'Bond market illustration',
          caption: 'Bonds trade in various markets with different characteristics and risk profiles'
        }
      ],
      quiz: {
        questions: [
          {
            id: 'q4_1',
            question: 'What is a coupon payment in bond investing?',
            options: [
              'A discount voucher for purchasing more bonds',
              'The regular interest payment made to bondholders',
              'The fee charged by brokers for bond transactions',
              'The principal amount returned at maturity'
            ],
            correctAnswer: 1
          },
          {
            id: 'q4_2',
            question: 'Which type of bonds are generally considered the safest?',
            options: [
              'Corporate bonds',
              'Municipal bonds',
              'Junk bonds',
              'Government treasury bonds'
            ],
            correctAnswer: 3
          },
          {
            id: 'q4_3',
            question: 'What happens to existing bonds when interest rates rise?',
            options: [
              'Their prices typically rise',
              'Their prices typically fall',
              'Their coupon rates automatically adjust upward',
              'They automatically mature earlier'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  ]
};

export default level2;
