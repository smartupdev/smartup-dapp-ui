import React, { useState, Fragment } from 'react'
import Image from '../../components/Image'
import Text from '../../components/Text'
import Panel from '../../components/Panel'
import { Row, Col } from '../../components/Layout'
import lang, { currentLang } from '../../lang'
import theme from '../../theme'
import { Faq } from '../../components/Icon'
// import Table from '../../components/Table'
import Hr from '../../components/Hr'
// import smartupIcon from '../../images/smartup.png'

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
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text bold>SmartUp Incubator is a platform to realize your dreams!</Text>
        <Text  TopXS lineHeight S>It is a blockchain-based platform connecting projects, investors and service providers around the world. With distributed ledger technology and smart contracts, we help project teams access to capital and resources with greater efficiency and help investors gain transparency and 24/7 accessibility throughout the investment cycle like never before.</Text>
        <Text  TopXS lineHeight S>Implementing an unpresented concept – <Text inline S bold>Stimergy</Text> (a universal coordination mechanism) – allows teammates to analyze self-organizing activities in an ever-widening range of domains, in order to achieve an ever greater success with worldwide ingenuity.</Text>
      </Col>
    )
  },
  {
    title: 'Who can use SmartUp platform?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
        <Text bold>All kinds of dreamers!</Text>
        <Text  TopXS lineHeight S>Artist, musician, product designer or entrepreneur, are all welcome! All peoples can create your own market introducing ideas and dreams, seeking peoples sharing same spirits, recruiting resources and raising fund from SmartUp Incubator Platform.</Text>
        <Text  TopXS lineHeight S>Now, go clicking ‘Create Market’ in the navigation bar at your left-hand side!</Text>
        <Text TopL bold>Investors who looking for potential investment opportunities!</Text>
        <Text  TopXS lineHeight S>SmartUp Incubator Platform provides a platform gathering quality projects supported with high-caliber collaborators. Investors are able to oversee the projects’ status and progress with full transparency. “Trade” function also allows investors and speculators to trade different market token in 24/7 environment!</Text>
        <Text  TopXS lineHeight S>Now, go searching markets in main page and go into “Trading” page to buy market token!</Text>
        <Text TopL bold>Skillful collaborators!</Text>
        <Text  TopXS lineHeight S>You got talents and here is the platform to show off! </Text>
        <Text  TopXS lineHeight S>Skillful collaborators are definitely a key component facilitating a project’s success. You can join and follow multiple projects and provide your talents to team who is frustrating on searching talent you have in nowhere until they got you!</Text>
        <Text  TopXS lineHeight S>Now, go searching markets in main page and click “Bookmark” at the right-hand top corner to keep tracking with the market!</Text>
      </Col>
    )
  },
  {
    title: 'How can I start with SmartUp?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
        <Text bold>Create Market</Text>
        <Text  TopXS lineHeight S>For a Startuppers, you can create a market to realize your idea. After created the market, you can buy market tokens at the starting point with the lowest price. With more investors joining the market, more market tokens are generated and the price will go up. By that time, you can request to withdraw raised fund to realize your idea.</Text>
        <Text  TopXS lineHeight S>1.	Click on the second icon ‘Create Market’ of the navigation bar at your left-hand side. Or, you can click on <a style={{ color: '#fff' }} href='https://ipfs.smartup.global/ipfs/QmXR4x6snQ9EME6SNLNMcGmTje4sYzMeJb7xRHTHB1Jiqi/#/create/market'> here </a> to create your market.</Text>
        <Text  TopXS lineHeight S>2.	Input market name and overview, upload the market icon and photo</Text>
        <Text  TopXS lineHeight S>3.	Click “Next”</Text>
        <Text  TopXS lineHeight S>4.	Review the price curve of market token</Text>
        <Text  TopXS lineHeight S>5.	Click “Next”</Text>
        <Text  TopXS lineHeight S>6.	Confirm the market creation deposit – 2500 SmartUp token</Text>
        <Text  TopXS lineHeight S>7.	Click “Create” and wait for few minutes</Text>
        <Text  TopXS lineHeight S>8.	You can preview your market page at this moment; however functions will be all disabled until the market is successfully created</Text>
        <Text TopL bold>To invest</Text> 
        <Text  TopXS lineHeight S>As an Investors, you can find potential and creative projects to invest. Earlier investment in a potential project make greater benefits onward.</Text>
        <Text  TopXS lineHeight S>1.	Go to targeted market</Text>
        <Text  TopXS lineHeight S>2.	Click “Trading” tab</Text>
        <Text  TopXS lineHeight S>3.	Input the amount of market tokens you want to buy</Text>
        <Text  TopXS lineHeight S>4.	Click on the Terms of Service</Text>
        <Text  TopXS lineHeight S>5.	Click “Trade” </Text>
        <Text  TopXS lineHeight S>6.	Wait for the confirmation in the Notification in the dashboard at right-hand side</Text>
        <Text  TopXS lineHeight S>7.	You will become a market follower after you have successfully bought market tokens. Buy low and sell high to make profits</Text>

      </Col>
    )
  },
  {
    title: 'Is SmartUp available in the country I stayed?',
    ansTitle: null, 
    ansContent: 'People all over the world can use SmartUp Incubator Platform.', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>People all over the world can use SmartUp Incubator Platform.</Text>
      </Col>
    )
  },
  {
    title: 'What should I prepare before using SmartUp Incubator Platform? ',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>The followings are required for using SmartUp:</Text>
         <Text TopXS lineHeight S>1. Open Google Chrome Browser</Text>
         <Text lineHeight S>Download the Chrome at this link: <a style={{ color: '#fff' }} href='https://www.google.com/chrome/'>https://www.google.com/chrome/ </a></Text>
         <Text TopXS lineHeight S>2.	Metamask</Text>
         <Text lineHeight S>Install Metamask Chrome extension at this link: <a style={{ color: '#fff' }} href='https://metamask.io/'>https://metamask.io/ </a></Text>
         <Text TopXS lineHeight S>3.	Ensure there is enough ETH & SmartUp Tokens in MetaMask Wallet</Text>
         <Text TopXS lineHeight S>4.	Lastly, you go clicking ‘Create Market’ in the navigation bar at your left-hand side!</Text>
      </Col>
    )
  },
  {
    title: 'What is Metamask? ',
    ansTitle: null, 
    ansContent: `MetaMask is a 3rd party bridge that allows you to visit the distributed web and dapp like SmartUp Incubator Platform in Google Chrome Browser. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node. 
    You may see it as an ETH wallet where ETH and SmartUp Token are stored. Simply install the MetaMask extension, click on connecting with SmartUp Incubator Platform, then you can start make good use of the SmartUp Incubator Platform. `, 
    image: null,
    body: (
      <Col>
         <Text  lineHeight S>MetaMask is a 3rd party bridge that allows you to visit the distributed web and dapp like SmartUp Incubator Platform in Google Chrome Browser. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.</Text>
         <Text TopXS lineHeight S>You may see it as an ETH wallet where ETH and SmartUp Token are stored. Simply install the MetaMask extension, click on connecting with SmartUp Incubator Platform, then you can start make good use of the SmartUp Incubator Platform.</Text>
         <Text  TopXS lineHeight S>Download MetaMask extension here: <a style={{ color: '#fff' }} href='https://metamask.io'>https://metamask.io</a></Text>
      </Col>
    )
  },
  {
    title: 'How do I buy/ trade SmartUp Token?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>SmartUp Token is now can be traded on CoinBene.</Text>
         <Text lineHeight S><a style={{ color: '#fff' }} href='https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH'>https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH </a></Text>
      </Col>
    )
  },
  {
    title: 'What can SmartUp Token be used for?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text  lineHeight S>SmartUp Token can be used for creating market (cost 2500 SmartUp Token) and buying market tokens in SmartUp Incubator platform.</Text>
      </Col>
    )
  },
  {
    title: 'How do I top up my Metamask wallet?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text  lineHeight S bold>Receive from another wallet</Text>
         <Text  TopXS lineHeight S>1.	Copy the Metamask wallet address by clicking the account name in Metamask</Text>
         <Text  TopXS lineHeight S>2.	Click “Send” in your old wallet</Text>
         <Text  TopXS lineHeight S>3.	Input the amount</Text>
         <Text  TopXS lineHeight S>4.	Paste the Metamask wallet address in recipient’s address</Text>
         <Text  TopXS lineHeight S>5.	Click “Confirm”</Text>
         <Text  TopXS lineHeight S>6.	Transaction will be completed within few minutes</Text>
         <Text  TopXS lineHeight S>** Procedure may vary between different wallet</Text>
         <Text  TopL lineHeight S bold>Import old wallet with its private key</Text>
         <Text  TopXS lineHeight S>1.	Copy the private key of your old wallet</Text>
         <Text  TopXS lineHeight S>2.	Click the flavicon at the top right corner of your MetaMask pop-up</Text>
         <Text  TopXS lineHeight S>3.	Select “Import Account”</Text>
         <Text  TopXS lineHeight S>4.	You will be directed to the New Account page. Paste your private key and click “Import”</Text>
         <Text  TopXS lineHeight S>5.	Click on the flavicon to check new imported account</Text>
         <Text  TopXS lineHeight S>** Detailed procedure in this link:<a style={{ color: '#fff' }} href=' https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account '> https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account </a></Text>
      </Col>
    )
  },
  {
    title: 'Can I use my own cryptocurrency wallet?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text  lineHeight S>Yes, you can and just follow the procedure here:</Text>
         <Text  TopXS lineHeight S>1.	Copy the private key of your old wallet</Text>
         <Text  TopXS lineHeight S>2.	Click the flavicon at the top right corner of your MetaMask pop-up</Text>
         <Text  TopXS lineHeight S>3.	Select “Import Account”</Text>
         <Text  TopXS lineHeight S>4.	You will be directed to the New Account page. Paste your private key and click “Import”</Text>
         <Text  TopXS lineHeight S>5.	Click on the flavicon to check new imported account</Text>
         <Text  TopXS lineHeight S>** Detailed procedure in this link:<a style={{ color: '#fff' }} href=' https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account '> https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account </a></Text>
      </Col>
    )
  },
  {
    title: 'What is NTT?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null,
    body: (
      <Col>
         <Text  lineHeight S>NTT stands for non-transferable token. User got NTT reward from contributions to platform like being juror (function will be delivered in later 2019). The more NTT a user owned, the more contributions a user contributed to the platform. Details will be shared more soon.</Text>
      </Col>
    )
  },
  {
    title: 'What kind of project or market I can create?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can create any kind of appropriate projects, including   designing and manufacturing, providing commercial services, establishing a conceptual café, etc. Nearly everything you think you can do, you can make it true on SmartUp Incubator Platform.</Text>
      </Col>
    )
  },
  {
    title: 'What should I prepare for creating a market?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>1. Install softwares you need:</Text>
         <Text TopXS lineHeight S>•	Open Google Chrome Browser</Text>
         <Text lineHeight S>Download the Chrome at this link: <a style={{ color: '#fff' }} href='https://www.google.com/chrome/'>https://www.google.com/chrome/ </a></Text>
         <Text TopXS lineHeight S>•	Metamask</Text>
         <Text lineHeight S>Install Metamask Chrome extension at this link: <a style={{ color: '#fff' }} href='https://metamask.io/'>https://metamask.io/ </a></Text>
         <Text TopXS lineHeight S>•	Ensure there is enough ETH & SmartUp Tokens in MetaMask Wallet</Text>
         <Text TopL lineHeight S>2. Prepare your idea details including:</Text>
         <Text TopXS lineHeight S>•	<Text inline S bold>Attractive Name</Text> for your idea/ market/ project which can attract peoples!</Text>
         <Text TopXS lineHeight S>•	<Text inline S bold>Descriptive Overview</Text> to let your followers know what you wanna do!</Text>
         <Text TopXS lineHeight S>•	<Text inline S bold>Intuitive icon</Text> to distinguish your market from others!</Text>
         <Text TopXS lineHeight S>•	<Text inline S bold>Market Photo</Text> to demonstrate how your product or idea look like, including background, aims and timeline that your investors and market followers need to know!</Text>
         <Text  TopXS lineHeight S>3.	Lastly, click on the second icon ‘Create Market’ of the navigation bar at your left-hand side Or, you can click on <a style={{ color: '#fff' }} href='https://ipfs.smartup.global/ipfs/QmXR4x6snQ9EME6SNLNMcGmTje4sYzMeJb7xRHTHB1Jiqi/#/create/market'> here </a> to create your market.</Text>
         <Text  TopXS lineHeight S>4.	Input market name and overview, upload the market icon and photo</Text>
         <Text  TopXS lineHeight S>5.	Click “Next”</Text>
         <Text  TopXS lineHeight S>6.	Review the price curve of market token</Text>
         <Text  TopXS lineHeight S>7.	Click “Next”</Text>
         <Text  TopXS lineHeight S>8.	Confirm the market creation deposit – 2500 SmartUp token</Text>
         <Text  TopXS lineHeight S>9.	Click “Create” and wait for few minutes</Text>
         <Text  TopXS lineHeight S>10.	You can preview your market page at this moment; however, functions will be all disabled until the market is successfully created</Text>
      </Col>
    )
  },
  {
    title: 'How do I create a project?',
    ansTitle: null, 
    ansContent: `Click on the second icon of the navigation bar in the left-hand side of the Main Page. 
Enter the market name and description, upload the photos for market icon and cover, click on "next".
Preview the price curve of the market token, then click on "Next".
Deposit for creatinf the market. Fix 2500 SmartUp Token deposit.`, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>1.	Click on the second icon ‘Create Market’ of the navigation bar at your left-hand side (Or, you can click on <a style={{ color: '#fff' }} href='https://ipfs.smartup.global/ipfs/QmXR4x6snQ9EME6SNLNMcGmTje4sYzMeJb7xRHTHB1Jiqi/#/create/market'> here </a> to create your market.)</Text>
         <Text  TopXS lineHeight S>2.	Input market name and overview, upload the market icon and photo</Text>
         <Text  TopXS lineHeight S>3.	Click “Next”</Text>
         <Text  TopXS lineHeight S>4.	Review the price curve of market token</Text>
         <Text  TopXS lineHeight S>5.	Click “Next”</Text>
         <Text  TopXS lineHeight S>6.	Confirm the market creation deposit – 2500 SmartUp token</Text>
         <Text  TopXS lineHeight S>7.	Click “Create” and wait for few minutes</Text>
         <Text  TopXS lineHeight S>8.	You can preview your market page at this moment; however, functions will be all disabled until the market is successfully created</Text>
      </Col>
    )
  },
  {
    title: 'How much SUT is needed for creating a market?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>2500 SmartUp Token is needed for creating a market. </Text>
      </Col>
    )
  },
/*   {
    title: 'How can I manage my project/ business?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  }, */
  {
    title: 'What is the market token of my project?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Each market issues its own unique market tokens. Investors can invest in the project by buying market tokens. The more market tokens issued, the higher price of each market token. By selling the tokens at a higher price, investors can be benefited.</Text>
      </Col>
    )
  },
  {
    title: 'What is the difference between SmartUp token and the market token?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>SmartUp token is a utility token which can be used in creating market and buying market token in the platform. It can be traded offline in exchange.</Text>
         <Text TopXS lineHeight S>Market token is a unique token belongs to different market. It is a real token which can be stored in MetaMask wallet but can only be traded in the corresponding market in SmartUp Incubator Platform.</Text>
      </Col>
    )
  },
  {
    title: 'How do I earn the market tokens?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can only buy more market tokens with SmartUp tokens at this moment. In the future, you can earn market token by contributing your effort to different idea.</Text>         
      </Col>
    )
  },
/*   {
    title: 'How can I benefit from my project and make use of the money to move on my start-up? ',
    ansTitle: null, 
    ansContent: 'The price of the market token is lowest at the beginning of the market because the quantity of issued tokens is 0 at the beginning. To benefit from your project, you should invest in your own market once your market is created. After that, you may sell your tokens when more investors buy the token and get profit.  ', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>The price of the market token is lowest at the beginning of the market because the quantity of issued tokens is 0 at the beginning. To benefit from your project, you should invest in your own market once your market is created. After that, you may sell your tokens when more investors buy the token and get profit. </Text>
      </Col>
    )
  },
  {
    title: 'How can I attract more people to invest into my project?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  },
  {
    title: 'What can we do with the market token?',
    ansTitle: null, 
    ansContent: 'You can buy the tokens at the lower price (the quantity of the token in the market is small at that time) and sell them at the higher price (the quantity of the token in the market is larger at that time) to earn a profit', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can buy the tokens at the lower price (the quantity of the token in the market is small at that time) and sell them at the higher price (the quantity of the token in the market is larger at that time) to earn a profit. </Text>
      </Col>
    )
  }, */
  {
    title: 'How do I communicate with the market follower members?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can communicate with followers in “Discussion” of each market by creating post and comment.</Text>
      </Col>
    )
  },
  {
    title: 'Can I edit information of my project?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You cannot edit the information of the market once the market is created.</Text>
      </Col>
    )
  },
/*   {
    title: 'Can I shut down my project?',
    ansTitle: null, 
    ansContent: 'i am content', 
    image: null
  }, */
  {
    title: 'What is follower in the market?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Everyone who has invested (buying market token) in the market is the market followers. They can participate, discussion and make decision for the idea development.</Text>
      </Col>
    )
  },
  {
    title: 'How do I find out the idea/ project that I am interested in?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can make use of the search function in the main page of the platform to find out potential projects you are interested in. You may use of any keywords to find any related market and evaluate if that is worth to invest.</Text>
         <Text TopXS lineHeight S>Can’t find the related idea? Move to create your own market!</Text>
      </Col>
    )
  },
  {
    title: 'How do I invest into a project as a market follower?',
    ansTitle: null, 
    ansContent: 'You can simply buy the market tokens and you will become the market follower. Check on the quantity and the price of the market tokens. Buy low, sell high to make profits. ', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>1.	Go to targeted market</Text>
         <Text  TopXS lineHeight S>2.	Click “Trading” tab</Text>
         <Text  TopXS lineHeight S>3.	Input the amount of market tokens you want to buy</Text>
         <Text  TopXS lineHeight S>4.	Click on the Terms of Service</Text>
         <Text  TopXS lineHeight S>5.	Click “Trade” </Text>
         <Text  TopXS lineHeight S>6.	Wait for the confirmation in the Notification in the dashboard at right-hand side</Text>
         <Text  TopXS lineHeight S>7.	You will become a market follower after you have successfully bought market tokens. Buy low and sell high to make profits. </Text>
      </Col>
    )
  },
/*   {
    title: 'What is the market token?',
    ansTitle: null, 
    ansContent: 'Each market issues its own tokens individually. Investors can invest in the project by buying the tokens. As the spot price of the market tokens is proportional to the quantity of the market tokens, more investors buying the tokens and more tokens issued, the price will be higher. By selling the tokens at a higher price, investors can be benefited.', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Each market issues its own tokens individually. Investors can invest in the project by buying the tokens. As the spot price of the market tokens is proportional to the quantity of the market tokens, more investors buying the tokens and more tokens issued, the price will be higher. By selling the tokens at a higher price, investors can be benefited.</Text>
      </Col>
    )
  }, */
  {
    title: 'What can I do as a market follower?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can contribute the project by creating constructive discussion that determining the development of the project.</Text>
         <Text TopXS lineHeight S>You can also vote for different proposal (this function will be delivered in later 2019) to determine the direction in the future.</Text>
         <Text  TopXS lineHeight S>Greater community makes the idea to be more potential to invest! </Text>
      </Col>
    )
  },
/*   {
    title: 'How do I get more market tokens?',
    ansTitle: null, 
    ansContent: 'You can only buy more market tokens with SmartUp Tokens at this moment.', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can only buy more market tokens with SmartUp Tokens at this moment.</Text>
      </Col>
    )
  },
  {
    title: 'How can I be benefited from the project I invested?',
    ansTitle: null, 
    ansContent: `As the price of the market tokens is proportional to the quantity of the market tokens. The market tokens buy at the beginning after the market usually have the lowest cost. 
    To benefit from the project, firstly, find out the potential project. Then, invest in the targeted market when the quantity of the tokens is low. After that, you may sell your tokens when more investors buy the tokens and sell to get profits.
    `, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>As the price of the market tokens is proportional to the quantity of the market tokens. The market tokens buy at the beginning after the market usually have the lowest cost. 
    To benefit from the project, firstly, find out the potential project. Then, invest in the targeted market when the quantity of the tokens is low. After that, you may sell your tokens when more investors buy the tokens and sell to get profits.
    </Text>
      </Col>
    )
  }, */
  {
    title: 'Can I withdraw my investment, and how?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Yes, with the following procedures:</Text>
         <Text  TopXS lineHeight S>1.	Go to targeted market</Text>
         <Text  TopXS lineHeight S>2.	Click “Trading” tab</Text>
         <Text  TopXS lineHeight S>3.	Input the amount of market tokens you want to sell</Text>
         <Text  TopXS lineHeight S>4.	Click on the Terms of Service</Text>
         <Text  TopXS lineHeight S>5.	Click “Trade” </Text>
         <Text  TopXS lineHeight S>6.	Wait for the confirmation in the Notification in the dashboard at right-hand side</Text>
         <Text  TopXS lineHeight S>7.	You will quit the market after you have successfully sold out all market tokens. </Text>         
      </Col>
    )
  },
  {
    title: 'How do I know my order (buying and selling market token) is placed and succeed?',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You will receive notification for all your order, whatever it is failed or succeed transaction.</Text>
      </Col>
    )
  },
/*   {
    title: 'How do I trade with SmartUp Token?',
    ansTitle: null, 
    ansContent: 'You can trade the SmartUp Token in exchange, like Coinbene: https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You can trade the SmartUp Token in exchange, like Coinbene: </Text>
         <Text lineHeight S><a style={{ color: '#fff' }} href='https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH'>https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH </a></Text>
      </Col>
    )
  }, */
/*   {
    title: 'How do I know if the trading of market tokens is succeed?',
    ansTitle: null, 
    ansContent: 'Every trading, no matter successful trade or failed trade, the platform will generate notifications to inform users the status of the trade.', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Every trading, no matter successful trade or failed trade, the platform will generate notifications to inform users the status of the trade.</Text>
      </Col>
    )
  }, */
  {
    title: 'Why did the trading fail?',
    ansTitle: null, 
    ansContent: ``, 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>Failed trade may be caused by the following reasons:</Text>
         <Text TopXS lineHeight S>•	Insufficient amount of ETH (for gas fee)</Text>
         <Text  TopXS lineHeight S>•	Insufficient amount of SmartUp Tokens </Text>
         <Text  TopXS lineHeight S>•	Insufficient amount of market tokens</Text>
         <Text  TopXS lineHeight S>•	Weak network</Text>
         <Text  TopXS lineHeight S>You can check the token balance in the “Portfolio” tab in the dashboard at your right-hand side.</Text>
      </Col>
    )
  },
  {
    title: 'How can I find my trading records? ',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>You may find all trading records in the “Transaction” tab in “Personal Center”.</Text>
         <Text lineHeight S>Personal Center: <a style={{ color: '#fff' }} href='https://ipfs.smartup.global/ipfs/QmXR4x6snQ9EME6SNLNMcGmTje4sYzMeJb7xRHTHB1Jiqi/#/account/transaction'>https://ipfs.smartup.global/ipfs/QmXR4x6snQ9EME6SNLNMcGmTje4sYzMeJb7xRHTHB1Jiqi/#/account/transaction</a></Text>
      </Col>
    )
  },
  {
    title: 'What is gas fee?  ',
    ansTitle: null, 
    ansContent: '', 
    image: null,
    body: (
      <Col>
         <Text lineHeight S>SmartUp is using the Ethernet, therefore every transaction cost gas fee. Please make sure you have sufficient ETH for transaction fee.</Text>
      </Col>
    )
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
        faqs.map( (faq, index) => {
          const isExpanded = expandedRecord.includes(index)
          return (
            <Fragment key={index}>
              <Panel
                headerLeft
                header={faq.title}
                body={faq.body ? 
                  <Col VM HXL>{faq.body}</Col> :
                  <Ans {...faq} />
                }
                expandedDark
                expanded={isExpanded}
                onClick={() => onRecordClick(index)}
              />
              { isExpanded && <Hr /> }
            </Fragment>
          )
        }
        )
      }
    </Col>
  );
}