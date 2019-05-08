import React, { useEffect, useRef, useState } from 'react'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { Faq, More } from '../../components/Icon'
import Table from '../../components/Table'
import Hr from '../../components/Hr'
import smartupIcon from '../../images/smartup.png'

const faqText = lang.faq

function Ans({ ansTitle, ansContent, image }) {
  return (
    <Col left>
      <Text L bold wordSpaceL>{ansTitle}</Text>
      { image && <Image source={image} LeftS RightS TopS actualSize /> }
      <Text LeftS RightS newline XS wordSpaceS TopS BottomS>{ansContent}</Text>
    </Col>
  )
}

const faqs = [
  {
    title: 'What is SmartUp?',
    ansTitle: null, 
    ansContent: 'SmartUp Incubator is a platform to realize your dreams! SmartUp Incubator provide a blockchain based platform for creators to build up their project. This platform connects projects, investors and service providers around the world. With distributed ledger technology and smart contracts, we can help project teams access to capital and resources with greater efficiency and help investors gain transparency throughout the investment cycle like never before. ', 
    image: null
  },
  {
    title: 'Who can use SmartUp platform?',
    ansTitle: null, 
    ansContent: `Startup dreamers who are an artist, musician, product designer or entrepreneur, can make ideas and dreams a reality by raising fund, finding resources and support on SmartUp Incubator Platform. 
If you are finding potential and creative projects for investment or speculation, you can also search the market on SmartUp Incubator Platform, and make use of the Trade function in different market to make benefits. 
SmartUp Incubator Platform is available to individuals who are 18 years of age or older.
You may see more guidelines clicking on the following links:
•	Startuppers/ Startup dreamer
•	Investors/ Speculators`, 
    image: null
  },
  {
    title: 'What can I do with SmartUp?',
    ansTitle: null, 
    ansContent: `For a Startuppers, you can create a market to realize your idea. After created the market, you can buy the idea tokens at the starting point with the lowest price. With more investors joining the market, more idea tokens are generated that caused higher spot price. You may sell the tokens to earn the capital to realize your idea. 
    As an Investors, you can find the potential and creative projects to invest. The price of the idea token is proportional to the quantity of the idea token. Earlier investment in a potential projects make greater opportunity to earn more benefits because the potential project can keep attracting investors. `, 
    image: null
  },
  {
    title: 'Is SmartUp available in the country I stayed?',
    ansTitle: null, 
    ansContent: 'People all over the world can use SmartUp Incubator Platform.', 
    image: null
  },
  {
    title: 'What should I prepare before using SmartUp Incubator Platform? ',
    ansTitle: null, 
    ansContent: `The followings are required for using SmartUp: 
1. Google Chrome Browser
   Download the Chrome at this link: https://www.google.com/chrome/
2. Metamask 
   Install Metamask Chrome extension at this link: https://metamask.io/ 
3. Ensure there is enough ETH & SmartUp Tokens in MetaMask Wallet
4. Lastly, you can start by clicking on "creating market"! `, 
    image: null
  },
  {
    title: 'What is Metamask? ',
    ansTitle: null, 
    ansContent: `MetaMask is a 3rd party bridge that allows you to visit the distributed web and dapp like SmartUp Incubator Platform in Google Chrome Browser. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node. 
    You may see it as an ETH wallet where ETH and SmartUp Token are stored. Simply install the MetaMask extension, click on connecting with SmartUp Incubator Platform, then you can start make good use of the SmartUp Incubator Platform. `, 
    image: null
  },
  {
    title: 'How do I buy SmartUp Token?',
    ansTitle: null, 
    ansContent: 'SmartUp Token is now can be traded on CoinBene.https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH ', 
    image: null
  },
  {
    title: 'What can SmartUp Token be used for?',
    ansTitle: null, 
    ansContent: 'SmartUp Token can be used for creating market (cost 2500 SmartUp Token), and buy for idea tokens. ', 
    image: null
  },
  {
    title: 'How do I top up my Metamask wallet?',
    ansTitle: null, 
    ansContent: 'You may open a new wallet and send the SmartUp Token and ETH to your wallet, or you may export a private key from your ERC20 wallet and import the wallet into your metamask, see more in this link. https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account', 
    image: null
  },
  {
    title: 'Can I use my own cryptocurrency wallet?',
    ansTitle: null, 
    ansContent: 'Yes, you can export your Private Key from your wallet and import the private key to Metamask , see more in this link: https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account ', 
    image: null
  },
  {
    title: 'What is NTT?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'What kind of project or market I can create?',
    ansTitle: null, 
    ansContent: 'You can create any kind of appropriate projects, including product designing and manufacturing, providing commercial services, establishing a conceptual café, etc. Nearly everything you think you can do, you can make it true on SmartUp Incubator Platform. ', 
    image: null
  },
  {
    title: 'What should I prepare for creating a market?',
    ansTitle: null, 
    ansContent: `Firstly, you should prepare the software for running the platform, including Chrome Browser and MetaMask, and ETH and SmartUp Tokens for create market and trading tokens. Click here to see more details. #link to previous question.
Second, establishing the plan of your project and business, including background, aims, timeline and rules that your investors and community member need to know. You also need to think about how to the attract investors to invest in your market. 
Lastly, click on ‘Create Market’, step forward to your dream! `, 
    image: null
  },
  {
    title: 'How do I create a project?',
    ansTitle: null, 
    ansContent: `Click on the second icon of the navigation bar in the left-hand side of the Main Page. 
Enter the market name and description, upload the photos for market icon and cover, click on "next".
Preview the price curve of the idea token, then click on "Next".
Deposit for creatinf the market. Fix 2500 SmartUp Token deposit.`, 
    image: null
  },
  {
    title: 'How much SUT is needed for creating a market?',
    ansTitle: null, 
    ansContent: '2500 SmartUp Token is needed for creating a market. ', 
    image: null
  },
  {
    title: 'How can I manage my project/ business?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'What is the idea token of my project?',
    ansTitle: null, 
    ansContent: 'Each market issues its own tokens individually. Investors can invest in the project by buying the tokens. As the price of the idea tokens is proportional to the quantity of the idea tokens, more investors buying the tokens and more tokens issued, the price will be higher. By selling the tokens at a higher price, investors can be benefited. ', 
    image: null
  },
  {
    title: 'What is the difference between SmartUp token and the community token?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'How do I earn the idea tokens?',
    ansTitle: null, 
    ansContent: `You can only buy more idea tokens with SmartUp Tokens at this moment. 
    You can buy the tokens at the lower price (the quantity of the token in the market is small at that time) and sell them at the higher price (the quantity of the token in the market is larger at that time).`, 
    image: null
  },
  {
    title: 'How can I benefit from my project and make use of the money to move on my start-up? ',
    ansTitle: null, 
    ansContent: 'The price of the idea token is lowest at the beginning of the market because the quantity of issued tokens is 0 at the beginning. To benefit from your project, you should invest in your own market once your market is created. After that, you may sell your tokens when more investors buy the token and get profit.  ', 
    image: null
  },
  {
    title: 'How can I attract more people to invest into my project?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'What can we do with the community token?',
    ansTitle: null, 
    ansContent: 'You can buy the tokens at the lower price (the quantity of the token in the market is small at that time) and sell them at the higher price (the quantity of the token in the market is larger at that time) to earn a profit', 
    image: null
  },
  {
    title: 'How do I communicate with the community members?',
    ansTitle: null, 
    ansContent: 'You can communicate with the community members in discussion of each market. Posts can be created and comments can be made in the discussion page.', 
    image: null
  },
  {
    title: 'Can I edit the rules/ information of my project?',
    ansTitle: null, 
    ansContent: 'You cannot edit the information of the market once the market is created because of the immutability of blockchain based platform.', 
    image: null
  },
  {
    title: 'Can I shut down my project?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'What is the project/market community?',
    ansTitle: null, 
    ansContent: 'Everyone who has invested in the market is the community member. They can discuss the development and make decisions of the project and market.', 
    image: null
  },
  {
    title: 'How do I find out the project that I interested in?',
    ansTitle: null, 
    ansContent: `You make use of the search function in the main page of the platform to find out the potential project you interested in. You may use any keywords to find any related market and evaluate if that is worth to invest.
  Can't find the related idea? Move to create your own market!`, 
    image: null
  },
  {
    title: 'How do I invest into a project as a community member?',
    ansTitle: null, 
    ansContent: 'You can simply buy the idea tokens and you will become the community member. Check on the quantity and the price of the idea tokens. Buy low, sell high to make profits. ', 
    image: null
  },
  {
    title: 'What is the idea token?',
    ansTitle: null, 
    ansContent: 'Each market issues its own tokens individually. Investors can invest in the project by buying the tokens. As the spot price of the idea tokens is proportional to the quantity of the idea tokens, more investors buying the tokens and more tokens issued, the price will be higher. By selling the tokens at a higher price, investors can be benefited.', 
    image: null
  },
  {
    title: 'What can I do as a community member?',
    ansTitle: null, 
    ansContent: `You can buy the idea tokens to support the project and sell the idea tokens to make profit. You may also contribute the project by creating constructive discussion that determining the development of the project.
    Greater community makes the project to be more potential to invest.  `, 
    image: null
  },
  {
    title: 'How do I get more idea tokens?',
    ansTitle: null, 
    ansContent: 'You can only buy more idea tokens with SmartUp Tokens at this moment.', 
    image: null
  },
  {
    title: 'How can I be benefited from the project I invested?',
    ansTitle: null, 
    ansContent: `As the price of the idea tokens is proportional to the quantity of the idea tokens. The idea tokens buy at the beginning after the market usually have the lowest cost. 
    To benefit from the project, firstly, find out the potential project. Then, invest in the targeted market when the quantity of the tokens is low. After that, you may sell your tokens when more investors buy the tokens and sell to get profits.
    `, 
    image: null
  },
  {
    title: 'Can I withdraw my investment, and how?',
    ansTitle: null, 
    ansContent: 'Yes, you can withdraw your investment by selling the idea tokens.', 
    image: null
  },
  {
    title: 'How do I communicate with the project creator and community members?',
    ansTitle: null, 
    ansContent: 'You can communicate with the community members in discussion of each market. Posts can be created and comments can be made in the discussion page.', 
    image: null
  },
  {
    title: 'How do I trade with SmartUp Token?',
    ansTitle: null, 
    ansContent: 'You can trade the SmartUp Token in exchange, like Coinbene: https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH', 
    image: null
  },
  {
    title: 'How do I know if the trading of idea tokens is succeed?',
    ansTitle: null, 
    ansContent: 'Every trading, no matter successful trade or failed trade, the platform will generate notifications to inform users the status of the trade.', 
    image: null
  },
  {
    title: 'Why did the trading fail?',
    ansTitle: null, 
    ansContent: `Failed trade may be caused by the insufficient amount of ETH (for transaction fee), Smart Tokens or idea tokens. You can check the balance in the Portfolio, MetaMask and Market Wallet.
While a new market is creating, buy action may fail because the market address has not yet built up. Please try again later. `, 
    image: null
  },
  {
    title: 'How can I find my trading records? ',
    ansTitle: null, 
    ansContent: 'You may find all the trading records in the personal center.', 
    image: null
  },
  {
    title: 'What is gas fee?  ',
    ansTitle: null, 
    ansContent: 'SmartUp is using the Ethernet, therefore every transaction cost gas fee. Please make sure you have sufficient ETH for transaction fee.', 
    image: null
  }
];

export default function () {
  const [expandedRecord, setExpandedRecord] = useState([0])
  const onRecordClick = (index)=>{
    let tempRecords = [...expandedRecord];
    let tempIndex = tempRecords.indexOf(index);
    if(tempIndex > -1){
      tempRecords.splice(tempIndex,1);
    }else{
      tempRecords.push(index);
    }
    setExpandedRecord(tempRecords);
  }
  return (
    <Col>
      <Row center centerVertical VS >
        <Faq S color={theme.white}  />
        <Text LeftS M center wordSpaceS>{faqText.title[currentLang]}</Text>
      </Row>
      <Hr />
      {
        faqs.map( (faq, index) => 
          <Panel
            key={index}
            header={faq.title}
            body={<Ans {...faq} />}
            expandedDark
            expanded={expandedRecord.includes(index)}
            onClick={() => onRecordClick(index)}
          />
        )
      }
    </Col>
  );
}