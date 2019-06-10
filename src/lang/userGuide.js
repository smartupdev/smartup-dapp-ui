import { name } from './index'

export default {
  tab: {
    getstarted: name('Get Started', '使用前準備', '使用前准备'),
    installChrome: name('Install Google Chrome', '安裝Google Chrome', '安装Google Chrome'),
    installMetamask: name('Install MetaMask', '安裝MetaMask', '安装MetaMask'),
    addEth: name('Top-up ETH','增值ETH'),
    addSut: name('Top-up SmartUp','增值SmartUp'),
    loginSetting: name('Login & Setting', '登入及個人設定', '登入及个人设定'),
    login: name('Login', '登入'),
    setting: name('Setting', '個人設定', '个人设定'),
    notification: name('Notification', '通知'),
    market: name('Market', '使用巿場', '使用巿场'),
    createMkt: name('Create Market', '創建巿場', '创建巿场'),
    trade:name('Trading', '巿場交易', '巿场交易'),
    mktdiscussion: name('Disucssion', '巿場討論', '巿场讨论'),
    faq: name('FAQ', '常見問題', '常见问题'),
    general: name('General', '一般問題', '一般问题'),
    creator: name('As a Creator', '作為項目創建者', '作为项目创建者'),
    investor: name('As an Investor', '作為投資者', '作为投资者')
  },

  installChrome: name(
    `a.	Go to https://www.google.com/chrome/
b.	Click on “Download Chrome”
c.	Download Chrome and click on ChromeSetup.exe to install
`,
`a.	到https://www.google.com/chrome/
b.	點撃“Download Chrome”
c.	下載Chrome後點撃ChromeSetup.exe安裝
`,
`a.	到https://www.google.com/chrome/
b.	点撃“Download Chrome”
c.	下载Chrome后点撃ChromeSetup.exe安装
`  
  ),
  installMetamask: name(
`MetaMask is a 3rd party bridge that allows you to visit the distributed web and dapp like SmartUp Incubator Platform in Google Chrome Browser. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
You may see it as an ETH wallet where ETH and SmartUp Token are stored. Simply install the MetaMask extension, click on connecting with SmartUp Incubator Platform, then you can start make good use of the SmartUp Incubator Platform.
   
a.	Use Chrome to visit https://metamask.io/
b.	Click on “GET CHROME EXTENSION”
c.	Click on “Add to Chrome”
d.	Click on ”Get Started” after installation
e.	If you have not used MetaMask before, click on “Create a Wallet”
f.	Create your MetaMask password
g.	Click to unhide the 12 words, write down those words in sequence in order to recover and import your account later. Then click on “Next”
h.	Input the words in sequence  and click on “Confirm”
i.	Click on “All Done” to finish creating the wallet and enter the wallet interface
j.	The platform is now running on the test network of Ethernet, switch “Main Ethereum Network” to “Ropsten Test Network” at the right comer
k.	Click on “Add Token”，go to “Custom Token” tabs, input “0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03” in “Token Contract Address”, click on “Next” to show SmartUp Token in MetaMask
`,
`MetaMask是第三方網橋，讓你能在Google Chrome瀏覽器中的訪問分散式網路和dapp， 如 SmartUp 孵化器平台。 它允許您直接在瀏覽器中運行以太坊 dApp，而無須運行完整的以太坊節點。 
您可能會將其視為存儲ETH和SmartUp的ETH錢包。 只需安裝MetaMask擴展，點擊與SmartUp 孵化器平台連接，即可開始充分利用SmartUp 孵化器平台。 

a.	使用Chrome到https://metamask.io/
b.	點撃“GET CHROME EXTENSION”
c.	點撃“加到 Chrome”
d.	完成安裝後點撃”Get Started”
e.	如你重未有過MetaMask的錢包，點擊“Create a Wallet”
f.	創建你的MetaMask錢包密碼
g.	點擊隱藏的12個英文生字，記錄下顯示出來的12個英文生字以便日後取回 /匯入帳號，然後點擊下一步
h.	根據剛才生字顯示的順序重新排列12個生字，然後點擊“Confirm”
i.	點擊“All Done”完成創建錢包，並進入錢包介面
j.	因現時平台使用測試用的乙太網，在右上角把“Main Ethereum Network” 轉換至“Ropsten Test Network”
k.	點擊左下方“Add Token”，在“Custom Token”分頁中“Token Contract Address”一欄輸入“0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03”，點擊“Next”以顯示SmartUp
`,
`MetaMask是第三方网桥，让你能在Google Chrome浏览器中的访问分布式网络和dapp，如 SmartUp 孵化器平台。 它允许您直接在浏览器中运行以太坊 dApp，而无须运行完整的以太坊节点。 
你可能会将其视为存储ETH和SmartUp的ETH钱包。 只需安装MetaMask扩展，点击与SmartUp 孵化器平台连接，即可开始充分利用SmartUp孵化器平台。 

a.	使用Chrome到https://metamask.io/
b.	点撃“GET CHROME EXTENSION”
c.	点撃“加到 Chrome”
d.	完成安装后点撃“Get Started”
e.	如你重未有过MetaMask的钱包，点击“Create a Wallet”
f.	创建你的MetaMask钱包密码
g.	点击隐藏的12个英文生字，记录下显示出来的12个英文生字以便日后取回 /汇入账号，然后点击下一步
h.	根据刚才生字显示的顺序重新排列12个生字，然后点击“Confirm”
i.	点击“All Done”完成创建钱包，并进入钱包界面
j.	因现时平台使用测试用的以太网，在右上角把“Main Ethereum Network” 转换至“Ropsten Test Network”
k.	点击左下方“Add Token”，在“Custom Token”分页中“Token Contract Address”一栏输入“0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03”，点击“Next”以显示SmartUp
`
  ),
  addEth: name(
`SmartUp is using the Ethernet, therefore every transaction cost gas fee. Please make sure you have sufficient ETH for transaction fee.

a.	Click on the MetaMask icon at the right corner
b.	Click on “Deposit” to do ETH deposit 
c.	Get ETH from a faucet for testing
d.	Click on “request 1 ether from faucet”
`,
`SmartUp是使用乙太網的dapp，因此平台上的交易及巿場創建需要使用礦工費(Gas Fee) 因此 MetaMask中須存有ETH。 

a.	點擊Chrome瀏覽器右上角MetaMask圖示
b.	點擊“存入”增值ETH
c.	在測試水管中獲取測試用的ETH
d.	點擊“request 1 ether from faucet”
`,
`SmartUp是使用以太网的dapp，因此平台上的交易及巿场创建需要使用矿工费(Gas Fee) 因此MetaMask中须存有ETH。 

a.	点击Chrome浏览器右上角MetaMask图标
b.	点击“存入”增值ETH
c.	在测试水管中获取测试用的ETH
d.	点击“request 1 ether from faucet”
`
  ),
  addSut: name(
`a.	Go to https://faucet.smartup.global/static/index.html
b.	Copy MetaMask wallet address, paste the address
c.	Click on “Give me 100W SUT”
d.	Wait for 1-2 mins，SmartUp will be deposited in the wallet
`,
`a.	到https://faucet.smartup.global/static/index.html
b.	在MetaMask複製錢包的位址並把位址貼上錢包位址一欄
c.	按“Give me 100W SUT”按鈕
d.	等待1-2分鐘，幣會自動添加到你的錢包裹
`,
`a.	到https://faucet.smartup.global/static/index.html
b.	在MetaMask复制钱包的地址并把地址贴上钱包地址一栏
c.	按“Give me 100W SUT”按钮
d.	等待1-2分钟，币会自动添加到你的钱包裹
`
  ),
  loginTxt: name(
`a.	Go to https://ipfs.smartup.global/ipfs/QmaNVSpC47Br7MPu2iqZ9HYWXNetq3wqG1SAE2JpTmKt6K/#/
b.	Click on “Connect” to login MetaMask
c.	Click on “Sign” in MetaMask pop-up
`,
`a.	進入https://ipfs.smartup.global/ipfs/QmaNVSpC47Br7MPu2iqZ9HYWXNetq3wqG1SAE2JpTmKt6K/#/
b.	點擊Connect連結登入MetaMask
c.	在彈出的MetaMask上點擊“簽名”完成登入
`,
`a.	进入https://ipfs.smartup.global/ipfs/QmaNVSpC47Br7MPu2iqZ9HYWXNetq3wqG1SAE2JpTmKt6K/#/
b.	点击Connect链接登入MetaMask
c.	在弹出的MetaMask上点击“签名”完成登入
`
  ),
  personalCenterTxt: name(
`a.	You can review the wallets, invested markets, bookmarks, notification and settings
b.	Click on “Setting”
c.	Upload avatar photo, click on “Submit” to finish, the photo can be change
d.	Edit your username, click on “Submit”. Check and confirm the username as the username can only be edit once
`,
`a.	於平台右面是資料頁面，可以檢視錢包、已投資巿場、書簽、通知及個人設定
b.	點擊“設定”
c.	上載個人圖片，點擊“提交”完成上載，圖片可多次更改
d.	更改名稱（每個帳戶只可命名一次）輸入名字後，點擊“提交”，確認無誤後點擊“確定”
`,
`a.	于平台右面是资料页面，可以检视钱包、已投资巿场、书签、通知及个人设定
b.	点击“设定”
c.	上载个人图片，点击”提交”完成上载，图片可多次更改
d.	更改名称（每个帐户只可命名一次）输入名字后，点击“提交”，确认无误后点击 “確定”
`
  ),
  notificationTxt: name(
`There are 3 kind of notification at this moment, and more will be release in the future. 
a.	Create Market: to inform you whether the market has been created successfully or not.
b.	Buy In: to inform you whether the buy order has been done successfully or not.
c.	Sell Out: to inform you whether the sell order has been done successfully or not.
`,
`現時平台有三種通知，日後開放更多功能後或有更多通知類型。 
a.	創建巿場：創建巿場後，無論成功或失敗均會收到通知
b.	買入通知：在買入巿場代幣後，無論成功或失敗均會收到通知
c.	賣出通知：在賣出巿場代幣後，無論成功或失敗均會收到通知
`,
`现时平台有三种通知，日后开放更多功能后或有更多通知类型。 
a.	创建巿场：创建巿场后，无论成功或失败均会收到通知
b.	买入通知：在买入巿场代币后，无论成功或失败均会收到通知
c.	卖出通知：在卖出巿场代币后，无论成功或失败均会收到通知
`
  ),
  createMktTxt: name(
`a.	Find the 2nd icon on the nav bar on the right of the website
b.	Input market name and overview
c.	Upload avatar photo and cover photo
d.	Click on “Next” to preview the price equation
e.	Market Deposit (fixed amount for 2500 SmartUp Token right now)
f.	Sign in MetaMaskto confirm, wait for 1-2 mins and created the market
`,
`a.	在平台左邊導覽欄，點擊第二個分頁創建巿場
b.	輸入巿場名稱及巿場簡介
c.	加入巿場圖像及封面圖片
d.	點擊“下一步”預覽代幣價格曲線
e.	存入巿場按金（現時固定為2500個SmartUp）
f.	在MetaMask確認交易，等待1-2分鐘完成創建巿場
`,
`a.	在平台左边导览栏，点击第二个分页创建巿场
b.	输入巿场名称及巿场简介
c.	加入巿场图像及封面图片
d.	点击“下一步”预览代币价格曲线
e.	存入巿场按金（现时固定为2500个SmartUp）
f.	在MetaMask确认交易，等待1-2分钟完成创建巿场
`
  ),
  tradeTxt: name(
`a.	Find the market you would like to invest in, clickon the market to see more details of the market, and click on “Trade”button
b.	Select “BUY” or “SELL”
c.	Input the amount of the Market Token you want to trade
d.	Tick the box to agree the terms of services
e.	Click on “Trade”
f.	Confirm the transaction in MetaMask
`,
`a.	在主頁中找到想交易的巿場，點擊展開查閱，再點擊“交易”進入巿場交易頁面
b.	點選買入或賣出
c.	輸入交易的巿場代幣數量
d.	勾選右面“同意服務條款”
e.	點擊“交易”
f.	在MetaMask確認交易
`,
`a.	在主页中找到想交易的巿场，点击展开查阅，再点击“交易”进入巿场交易页面
b.	点选买入或卖出
c.	输入交易的巿场代币数量
d.	勾选右面“同意服务条款”
e.	点击“交易”
f.	在MetaMask确认交易
`
  ),
  mktDiscussionTxt: name(
`Create a post:
a.	Click on the “Discussion” Tab in the market
b.	Click on “+” to create a new post
c.	Input the title and text, you may also upload one picture
d.	Click on “Submit”, post created succesfully

Reply a post：
a.	Enter the post by clicking on it in discussion page
b.	Input text in the text box below the post
c.	Click on “Reply” to make your feedback
`,
`發起討論：
a.	進入巿場後，點撃上方分頁列中的“討論”
b.	點擊“+” 發佈新帖子
c.	輸入帖子標題及內容，可選擇上載一張圖片
d.	點擊“提交”成功發佈帖子

回復帖子：
a.	在“討論”點擊進入帖子
b.	在帖子的最下方輸入回覆內容
c.	點擊“回復”成功回覆
`,
`发起讨论：
a.	进入巿场后，点撃上方分页列中的“讨论”
b.	点击“+” 发布新帖子
c.	输入帖子标题及内容，可选择上载一张图片
d.	点击“提交”成功发布帖子

回复帖子：
a.	在“讨论”点击进入帖子
b.	在帖子的最下方输入回复内容
c.	点击“回复”成功回复
`
  ),
  faqGeneral: name(
`**What is SmartUp?**
_SmartUp Incubator is a platform to realize your dreams!_
It is a blockchain-based platform connecting projects, investors and service providers around the world. With distributed ledger technology and smart contracts, we help project teams access to capital and resources with greater efficiency and help investors gain transparency and 24/7 accessibility throughout the investment cycle like never before.
Implementing an unpresented concept – Stimergy (a universal coordination mechanism) – allows teammates to analyze self-organizing activities in an ever-widening range of domains, in order to achieve an ever greater success with worldwide ingenuity.

**Who can use SmartUp platform?**
_All kinds of dreamers!_
Artist, musician, product designer or entrepreneur, are all welcome! All peoples can create your own market introducing ideas and dreams, seeking peoples sharing same spirits, recruiting resources and raising fund from SmartUp Incubator Platform.
Now, go clicking ‘Create Market’ in the navigation bar at your left-hand side!

_Investors who looking for potential investment opportunities!_
SmartUp Incubator Platform provides a platform gathering quality projects supported with high-caliber collaborators. Investors are able to oversee the projects’ status and progress with full transparency. “Trade” function also allows investors and speculators to trade different market token in 24/7 environment!
Now, go searching markets in main page and go into “Trading” page to buy market token!
Skillful collaborators!

_You got talents and here is the platform to show off!_
Skillful collaborators are definitely a key component facilitating a project’s success. You can join and follow multiple projects and provide your talents to team who is frustrating on searching talent you have in nowhere until they got you!
Now, go searching markets in main page and click “Bookmark” at the right-hand top corner to keep tracking with the market!  

**How can I start with SmartUp?**
_Create Market_
For a Startuppers, you can create a market to realize your idea. After created the market, you can buy market tokens at the starting point with the lowest price. With more investors joining the market, more market tokens are generated and the price will go up. By that time, you can request to withdraw raised fund to realize your idea.
a. Click on the second icon “Create Market” of the navigation bar at your left-hand side. Or, you can click on here to create your market.
b. Input market name and overview, upload the market icon and photo
c. Click “Next”
d. Review the price curve of market token
e. Click “Next”
f. Confirm the market creation deposit – 2500 SmartUp token
g. Click “Create” and wait for few minutes
h. You can preview your market page at this moment; however functions will be all disabled until the market is successfully created

_To invest_
As an Investors, you can find potential and creative projects to invest. Earlier investment in a potential project make greater benefits onward.
a. Go to targeted market
b. Click “Trading” tab
c. Input the amount of market tokens you want to buy
d. Click on the Terms of Service
e. Click “Trade”
f. Wait for the confirmation in the Notification in the dashboard at right-hand side
g. You will become a market follower after you have successfully bought market tokens. Buy low and sell high to make profits

**Is SmartUp available in the country I stayed?**
People all over the world can use SmartUp Incubator Platform.

**What should I prepare before using SmartUp Incubator Platform?**
The followings are required for using SmartUp:
a. Open Google Chrome Browser
Download the Chrome at this link: https://www.google.com/chrome/
b. Metamask
Install Metamask Chrome extension at this link: https://metamask.io/
c. Ensure there is enough ETH & SmartUp Tokens in MetaMask Wallet
d. Lastly, you go clicking ‘Create Market’ in the navigation bar at your left-hand side!

**What is Metamask?**
MetaMask is a 3rd party bridge that allows you to visit the distributed web and dapp like SmartUp Incubator Platform in Google Chrome Browser. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.
You may see it as an ETH wallet where ETH and SmartUp Token are stored. Simply install the MetaMask extension, click on connecting with SmartUp Incubator Platform, then you can start make good use of the SmartUp Incubator Platform.
Download MetaMask extension here: https://metamask.io

**How do I buy/ trade SmartUp Token?**
SmartUp Token is now can be traded on CoinBene.
https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH

**What can SmartUp Token be used for?**
SmartUp Token can be used for creating market (cost 2500 SmartUp Token) and buying market tokens in SmartUp Incubator platform.

**How do I top up my Metamask wallet?**
_Receive from another wallet_
a. Copy the Metamask wallet address by clicking the account name in Metamask
b. Click “Send” in your old wallet
c. Input the amount
d. Paste the Metamask wallet address in recipient’s address
e. Click “Confirm”
f. Transaction will be completed within few minutes
*Procedure may vary between different wallet

_Import old wallet with its private key_
a. Copy the private key of your old wallet
b. Click the flavicon at the top right corner of your MetaMask pop-up
c. Select “Import Account”
d. You will be directed to the New Account page. Paste your private key and click “Import”
e. Click on the flavicon to check new imported account
*Detailed procedure in this link: https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account

**Can I use my own cryptocurrency wallet?**
Yes, you can and just follow the procedure here:
a. Copy the private key of your old wallet
b. Click the flavicon at the top right corner of your MetaMask pop-up
c. Select “Import Account”
d. You will be directed to the New Account page. Paste your private key and click “Import”
e. Click on the flavicon to check new imported account
*Detailed procedure in this link: https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account

**What is NTT?**
NTT stands for non-transferable token. User got NTT reward from contributions to platform like being juror (function will be delivered in later 2019). The more NTT a user owned, the more contributions a user contributed to the platform. Details will be shared more soon.
`,
`**甚麼是SmartUp？**
_SmartUp是一個實現你的創業投資夢想孵化平台！_
SmartUp使用區塊鏈技術連結全球各個項目、資方及服務供應方，善用分散式賬本技術，平台以高效和高透明度的方式，幫助項目團隊尋找並配對資金及資源，創造出前所未有24/7年中無休的投資環境。
平台實現共識主動性：讓每個個體在各個廣泛的領域中，分析自我組織的活動，以便在國際創造出更大的成就。

**誰可以使用SmartUp平台？**
_所有夢想家！_
藝術家、音樂家、產品設計師或企業家都歡迎使用本平台！所有人都可以創建自己的市場，表達自己想法和夢想，尋找擁有相同理念的人，從SmartUp孵化器平台尋找資源和籌集資金。
立即點擊左側導航欄中“創建市場”開始實現自己的夢想吧！

_尋找具潛力投資機會的投資者！_
SmartUp 孵化器平台是一個集合眾多優質項目的平台，項目由一眾高素質的合作者支持及開發。投資者能夠在透明度的方式監督項目的狀態和進展。 “交易”功能還允許投資者和投機者在24/7環境中交易不同的市場代幣！
即在主頁搜索市場，進入“交易”頁面購買市場代幣！

_多才多藝的合作者！_
這是一個可以讓你發揮你的才能的平台！
擁有不同才能的合作方絕對是促成項目的關鍵因素。你可以加入並關注多個項目巿場，並與他合作。這些團隊一直苦苦追尋像你一樣的人才，直至找到你的這樣的一匹千里馬！
立即點擊主頁面搜索市場，點擊右上角的“書籤”，追蹤及關注不同市場！

**我如何開始使用SmartUp？**
_創建市場_
對於項方創建者，你可以創建一個市場來實現您的理念。創建市場後，您可以在新巿場初始時的最低價格買入市場代幣。隨著越來越多的投資者加入市場發行出更多的市場代幣，價格就會上漲。到那時，您可以要求提取募集的資金以實現您的想法。
a.點擊左側導航欄的第二個圖標“創建市場”，或點擊此處創建巿場。
b.輸入市場名稱和概要，上傳市場圖片和封面圖片
c. 點擊“下一步”
d.查看市場代幣的價格方程及曲線
e. 點擊“下一步”
f.確認市場創建存款 -2500 SmartUp
g. 點擊“創建”並等待幾分鐘
h.此時您可以預覽您的市場頁面；但在成功創建市場之前，所有功能都將被禁用

_投資_
作為投資者，您可以找出具潛力的創意項目進行投資。於具潛力項目早期投資往往可以帶來更大的收益。
a.進入目標市場
b.點擊“交易”選項卡
c.輸入您想要購買的市場代幣數量
d. 點擊同意服務條款
e.點擊“交易”
f.等待右側通知欄中的確認訊息
g.成功購買市場代幣後，你便成為了市場關注者，然後透過低買高賣獲利

**我身處的地方可以使用SmartUp嗎？**
世界各地的人都可以使用SmartUp孵化器平台。

**在使用SmartUp孵化器平台之前，我應該準備什麼？**
使用SmartUp需要以下內容：
a.谷歌瀏覽器瀏覽器
通過以下鏈接下載Chrome：https：//www.google.com/chrome/
b. Metamask
在此鏈接安裝Metamask Chrome擴展程序：https：//metamask.io/
c.確保MetaMask錢包中有足夠的ETH和SmartUp
d.最後，您點擊左側導航欄中的“創建市場”！

**什麼是Metamask？**
MetaMask是第三方網橋，讓您能在Google Chrome瀏覽器中的訪問分佈式網絡和dapp，SmartUp 孵化器平台。它允許您直接在瀏覽器中運行Ethereum dApp，而無須運行完整的Ethereum節點。
您可能會將其視為存儲ETH和SmartUp的ETH錢包。只需安裝MetaMask擴展，點擊與SmartUp 孵化器平台連接，即可開始充分利用SmartUp孵化器平台。
在這裡下載MetaMask擴展：https：//metamask.io

**我如何購買/交易SmartUp？**
現在可以在CoinBene交易買入SmartUp。
https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH

**SmartUp有甚麼用？**
SmartUp Token可用於創建SmartUp的市場（成本2500 SmartUp Token）和購買SmartUp 孵化器平台上的市場代幣。

**如何充值Metamask錢包？**
_從另一個錢包匯入款項：_
a.通過點擊Metamask中的帳戶名稱，複製Metamask錢包地址
b. 點擊舊有錢包中的“發送”
c. 輸入金額
d. 將Metamask錢包地址粘貼到收件人的地址上
e.  點擊“確認”
f. 交易將在幾分鐘內完成
*以上程序可能因錢包而異

_使用私鑰導入舊錢包：_
a. 複製舊錢包的私鑰
b. 點擊瀏覽器右上角的MetaMask的圖示，點擊MetaMask彈出窗口中右上圓形圖示
c. 選擇“導入帳戶”
d.您將導向到導入新帳戶頁面。貼上你的私鑰，然後點擊“導入”
e.點擊右上角圓形圖示檢查新導入的帳戶
*在此連結查看詳細程序：https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account

**我可以使用自己的加密貨幣錢包嗎？**
可以的，你可以按照以下步驟操作：
a. 複製舊錢包的私鑰
b. 點擊MetaMask彈出窗口右上角的圖示
c. 選擇“導入帳戶”
d. 您將導向到導入新帳戶頁面。貼上你的私鑰，然後點擊“導入”
e.點擊右上角圓形圖示檢查新導入的帳戶
*在此連結查看詳細程序：https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account

**什麼是NTT？**
NTT代表不可轉讓的積分。用戶在從陪審員的工作中獲得NTT獎勵，如陪審員（功能正在發開中，將於2019年底推出）。用戶擁有的NTT越多，表示用戶對平台的貢獻越多。多詳情將在不久將來公布。
`,
`**什么是SmartUp？**
SmartUp是一个实现你的创业投资梦想孵化平台！ 
SmartUp使用区块链技术链接全球各个项目、资方及服务供应方，善用分布式账本技术，平台以高效和高透明度的方式，帮助项目团队寻找并配对资金及资源，创造出前所未有24/7 年中无休的投资环境。 
平台实现共识主动性：让每个个体在各个广泛的领域中，分析自我组织的活动 ，以便在国际创造出更大的成就。 

**谁可以使用SmartUp平台？**
_所有梦想家！_
艺术家、音乐家、产品设计师或企业家都欢迎使用本平台！ 所有人都可以创建自己的市场，表达自己想法和梦想，寻找拥有相同理念的人，从SmartUp孵化器平台寻找资源和筹集资金。 
立即点击左侧导航栏中“创建市场”开始实现自己的梦想吧！ 

_寻找具潜力投资机会的投资者！_
SmartUp孵化器平台是一个集合众多优质项目的平台，项目由一众高素质的合作者支持 及开发。 投资者能够在透明度的方式监督项目的状态和进展。 “交易”功能还允许投资者和投机者在24/7环境中交易不同的市场代币！ 
即在主页搜索市场，进入“交易”页面购买市场代币！ 

_多才多艺的合作者！_
这是一个可以让你发挥你的才能的平台！ 
拥有不同才能的合作方绝对是促成项目的关键因素。 你可以加入并关注多个项目巿场，并与他合作。 这些团队一直苦苦追寻像你一样的人才，直至找到你的这样的一匹千里马！ 
立即点击主页面搜索市场，点击右上角的“书签”，追踪及关注不同市场！ 

**我如何开始使用SmartUp？**
_创建市场_
对于项方创建者，你可以创建一个市场来实现您的理念。 创建市场后，您可以在新巿场初始时的最低价格买入市场代币。 随着越来越多的投资者加入市场发行出更多的市场代币，价格就会上涨。 到那时，您可以要求提取募集的资金以实现您的想法。 
a.点击左侧导航栏的第二个图标“创建市场”，或点击此处创建巿场。 
b.输入市场名称和概要，上传市场图片和封面图片
c.点击“下一步”
d.查看市场代币的价格方程及曲线
e.点击“下一步”
f.确认市场创建存款 -2500 SmartUp
g.点击“创建”并等待几分钟
h.此时您可以预览您的市场页面；但在成功创建市场之前，所有功能都将被禁用

_投资_
作为投资者，您可以找出具潜力的创意项目进行投资。 于具潜力项目早期投资往往可以带来更大的收益。 
a.进入目标市场
b.点击“交易”选项卡
c.输入您想要购买的市场代币数量
d.点击同意服务条款
e.点击“交易”
f.等待右侧通知栏中的确认讯息
g.成功购买市场代币后，你便成为了市场关注者，然后透过低买高卖获利

**我身处的地方可以使用SmartUp吗？**
世界各地的人都可以使用SmartUp孵化器平台。 

**在使用SmartUp孵化器平台之前，我应该准备什么？**
使用SmartUp需要以下内容：
a.谷歌浏览器浏览器
通过以下链接下载Chrome：https：//www.google.com/chrome/
b. Metamask
在此链接安装Metamask Chrome扩展程序：https：//metamask.io/
c.确保MetaMask钱包中有足够的ETH和SmartUp
d.最后，您点击左侧导航栏中的“创建市场”！ 

**什么是Metamask？**
MetaMask是第三方网桥，让您能在Google Chrome浏览器中的访问分布式网络和dapp，SmartUp孵化器平台。 它允许您直接在浏览器中运行Ethereum dApp，而无须运行完整的Ethereum 节点。 
您可能会将其视为存储ETH和SmartUp的ETH钱包。 只需安装MetaMask扩展，点击与SmartUp 孵化器平台连接，即可开始充分利用SmartUp 孵化器平台。 
在这里下载MetaMask扩展：https：//metamask.io

**我如何购买/交易SmartUp？**
现在可以在CoinBene交易买入SmartUp。 
https://www.coinbene.com/exchange.html#/exchange?pairId=SMARTUPETH

**SmartUp有什么用？**
SmartUp Token可用于创建SmartUp的市场（成本2500 SmartUp Token）和购买SmartUp 孵化器平台上的市场代币。 

**如何充值Metamask钱包？**
_从另一个钱包汇入款项：_
a.通过点击Metamask中的帐户名称，复制Metamask 钱包地址
b.点击旧有钱包中的“发送”
c.输入金额
d.将Metamask钱包地址粘贴到收件人的地址上
e.点击“确认”
f.交易将在几分钟内完成
*以上程序可能因钱包而异

_使用私钥导入旧钱包：_
a.复制旧钱包的私钥
b.点击浏览器右上角的MetaMask的图标，点击 MetaMask弹出窗口中右上饼图示
c.选择“导入账户”
d.您将导向到导入新帐户页面。 贴上你的私钥，然后点击“导入”
e.点击右上角饼图示检查新导入的帐户
*在此链接查看详细程序：https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account

**我可以使用自己的加密货币钱包吗？**
可以的，你可以按照以下步骤操作：
a.复制旧钱包的私钥
b.点击MetaMask弹出窗口右上角的图示
c.选择“导入账户”
d.您将导向到导入新帐户页面。 贴上你的私钥，然后点击“导入”
e.点击右上角饼图示检查新导入的帐户
*在此链接查看详细程序：https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account 

**什么是NTT？**
NTT代表不可转让的积分。 用户在从陪审员的工作中获得NTT奖励，如陪审员（功能正在发开中，将 于2019年底推出）。 用户拥有的NTT越多，表示用户对平台的贡献越多。 多详情将在不久将来公布。 
`
  ),

  faqCreator: name(
`**What kind of project or market I can create?**
You can create any kind of appropriate projects, including designing and manufacturing, providing commercial services, establishing a conceptual café, etc. Nearly everything you think you can do, you can make it true on SmartUp Incubator Platform.

**What should I prepare for creating a market?**
a. Install softwares you need:
  • Open Google Chrome Browser
Download the Chrome at this link: https://www.google.com/chrome/
  • Metamask
Install Metamask Chrome extension at this link: https://metamask.io/
  • Ensure there is enough ETH & SmartUp Tokens in MetaMask Wallet
b. Prepare your idea details including:
  • Attractive Name for your idea/ market/ project which can attract peoples!
  • Descriptive Overview to let your followers know what you wanna do!
  • Intuitive icon to distinguish your market from others!
  • Market Photo to demonstrate how your product or idea look like, including background, aims and timeline that your investors and market followers need to know!
c. Lastly, click on the second icon ‘Create Market’ of the navigation bar at your left-hand side Or, you can click on here to create your market.
d. Input market name and overview, upload the market icon and photo
e. Click “Next”
f. Review the price curve of market token
g. Click “Next”
h. Confirm the market creation deposit – 2500 SmartUp token
i. Click “Create” and wait for few minutes
j. You can preview your market page at this moment; however, functions will be all disabled until the market is successfully created

**How do I create a project?**
a. Click on the second icon ‘Create Market’ of the navigation bar at your left-hand side (Or, you can click on here to create your market.)
b. Input market name and overview, upload the market icon and photo
c. Click “Next”
d. Review the price curve of market token
e. Click “Next”
f. Confirm the market creation deposit – 2500 SmartUp token
g. Click “Create” and wait for few minutes
h. You can preview your market page at this moment; however, functions will be all disabled until the market is successfully created

**How much SUT is needed for creating a market?**
2500 SmartUp Token is needed for creating a market.

**What is the market token of my project?**
Each market issues its own unique market tokens. Investors can invest in the project by buying market tokens. The more market tokens issued, the higher price of each market token. By selling the tokens at a higher price, investors can be benefited.

**What is the difference between SmartUp token and the market token?**
SmartUp token is a utility token which can be used in creating market and buying market token in the platform. It can be traded offline in exchange.
Market token is a unique token belongs to different market. It is a real token which can be stored in MetaMask wallet but can only be traded in the corresponding market in SmartUp Incubator Platform.

**How do I earn the market tokens?**
You can only buy more market tokens with SmartUp tokens at this moment. In the future, you can earn market token by contributing your effort to different idea.

**How do I communicate with the market members?**
You can communicate with followers in “Discussion” of each market by creating post and comment.

**Can I edit information of my project?**
You cannot edit the information of the market once the market is created.
`,
`**我可以創建什麼樣的項目或市場？**
您可以創建任何類型的正當項目，包括設計和商品生產、提供各式商業服務，或者創建一家概念咖啡館等等。您認為可行的所有事情幾乎都可以在SmartUp孵化平台上實現。

**我應該為創建市場做些什麼準備？**
a.安裝所需的軟件：
  • 安裝Google Chrome瀏覽器，通過以下鏈接下載：https://www.google.com/chrome/
  • Metamask
在連結安裝Metamask Chrome擴展程式：https：//metamask.io/
  • 確保MetaMask錢包中有足夠的ETH和SmartUp
b.準備您的概念和細節，包括：
  • 有吸引力的市場名稱，令您的理念/市場/項目更吸引大眾！
  • 描述巿場的概要，讓你巿場的關注者知道你想做甚麼！
  • 一目了然的巿場圖示，讓大家輕易區分出你的市場！
  • 市場封面照片，展示產品或概念的形象，可以與項目的背景、目標和時間表有關，這些都是你的投資者和市場關注者需要了解的資料！
c. 最後，點擊左側導航欄的第二個圖標“創建市場”
d. 輸入市場名稱和概述，上傳市場圖示和封面照片
e. 點擊“下一步”
f. 查看市場代幣的價格曲線
g. 點擊“下一步”
h. 確認市場創建存款 -  2500 SmartUp
i. 點擊“創建”並等待幾分鐘
j. 此時您可以預覽您的市場頁面；但是在成功創建市場之前，巿場內的功能將全部禁用

**如何創建項目？**
a. 點擊左側導航欄的第二個圖標“創建市場”
b. 輸入市場名稱和概述，上傳市場圖示和封面照片
c. 點擊“下一步”
d. 查看市場代幣的價格曲線
e. 點擊“下一步”
f. 確認市場創建存款 -  2500 SmartUp
g. 點擊“創建”並等待幾分鐘
h. 此時您可以預覽您的市場頁面；但是在成功創建市場之前，巿場內的功能將全部禁用

**創造市場需要多少SUT？**
創建市場需要2500 SmartUp Token。

**我項目的市場代價是什麼？**
每個市場都會發行自己獨特的市場代幣。投資者可以通過購買市場代幣來投資該項目。發行的市場代幣越多，每個市場代幣的價格就越高。投資者可以低買高賣代幣，從中獲利。

**SmartUp和市場代幣有什麼區別？**
SmartUp代幣是一個應用代幣，可用於在平台上創建市場和購買市場代幣。它可以在交易所進行交易。
各個市場各有獨特的市場代幣。它是一種真正的貨幣可以存儲在MetaMask錢包中，但只能在SmartUp孵化器平台上與平台進行交易。

**我如何獲得市場代幣？**
現時您只能使用SmartUp購買更多市場代幣。在未來更多功能上，您可以貢獻平台以賺取市場代幣。

**我能如何與市場成員溝通？**
您可以在“討論”中分頁中創建帖子和評論在每個市場的與市場成員和關注者進行交流。

**我可以編輯市場的信息嗎？**
創建市場後，您無法編輯市場信息。
`,
`**我可以创建什么样的项目或市场？**
您可以创建任何类型的正当项目，包括设计和商品生产、提供各式商业服务，或者创建一家概念咖啡馆等等。 您认为可行的所有事情几乎都可以在SmartUp孵化平台上实现。 

**我应该为创建市场做些什么准备？**
a.安装所需的软件：
  • 安装Google Chrome浏览器，通过以下链接下载：https: www.google.com/chrome/
  • Metamask: 在链接安装Metamask Chrome扩展程序：https： //metamask.io/
  • 确保MetaMask钱包中有足够的ETH和SmartUp
b.准备您的概念和细节，包括：
  • 有吸引力的市场名称，令您的理念/市场/项目更吸引大众！ 
  • 描述巿场的概要，让你巿场的关注者知道你想做什么！ 
  • 一目了然的巿场图标，让大家轻易区分出你的市场！ 
  • 市场封面照片，展示产品或概念的形象，可以与项目的背景、目标和时间表有关， 这些都是你的投资者和市场关注者需要了解的数据！ 
c.最后，点击左侧导航栏的第二个图标“创建市场”
d.输入市场名称和概述，上传市场图示和封面照片
e.点击“下一步”
f.查看市场代币的价格曲线
g.点击“下一步”
h.确认市场创建存款 - 2500 SmartUp
i.点击“创建”并等待几分钟
j.此时您可以预览您的市场页面；但是在成功创建市场之前，巿场内的功能将全部禁用

**如何创建项目？**
a.点击左侧导航栏的第二个图标“创建市场”
b.输入市场名称和概述，上传市场图标和封面照片
c.点击“下一步”
d.查看市场代币的价格曲线
e.点击“下一步”
f.确认市场创建存款 - 2500 SmartUp
g.点击“创建”并等待几分钟
h.此时您可以预览您的市场页面；但是在成功创建市场之前，巿场内的功能将全部禁用

**创造市场需要多少SUT？**
创建市场需要2500 SmartUp Token。

**市场代币是什么？**
每个市场都会发行自己独特的市场代币。 投资者可以通过购买市场代币来投资该项目。 发行的市场代币越多，每个市场代币的价格就越高。 投资者可以低买高卖代币，从中获利。

**SmartUp和市场代币有什么区别？**
SmartUp代币是一个应用代币，可用于在平台上创建市场和购买市场代币。 它可以在交易所进行交易。
各个市场各有独特的市场代币。 它是一种真正的货币可以存储在MetaMask钱包中，但只能在SmartUp孵化器平台上与平台进行交易。

**我如何获得市场代币？**
现时您只能使用SmartUp购买更多市场代币。 在未来更多功能上，您可以贡献平台以赚取市场代币。

**我能如何与市场成员沟通？**
您可以在“讨论”中分页中创建帖子和评论在每个市场的与市场成员和关注者进行交流。

**我可以编辑市场的信息吗？**
创建市场后，您无法编辑市场信息。
`
  ),

  faqInvestor: name(
`**Who are the market members in the market?**
Everyone who has invested (buying market token) in the market is the market followers. They can participate, discussion and make decision for the idea development.

**How do I find out the idea/ project that I am interested in?**
You can make use of the search function in the main page of the platform to find out potential projects you are interested in. You may use of any keywords to find any related market and evaluate if that is worth to invest.
Can’t find the related idea? Move to create your own market!

**How do I invest into a project as a market follower?**
a. Go to targeted market
b. Click “Trading” tab
c. Input the amount of market tokens you want to buy
d. Click on the Terms of Service
e. Click “Trade”
f. Wait for the confirmation in the Notification in the dashboard at right-hand side
g. You will become a market follower after you have successfully bought market tokens. Buy low and sell high to make profits.

**What can I do as a market follower?**
You can contribute the project by creating constructive discussion that determining the development of the project.
You can also vote for different proposal (this function will be delivered in later 2019) to determine the direction in the future.
Greater community makes the idea to be more potential to invest!

**Can I withdraw my investment, and how?**
Yes, with the following procedures:
a. Go to targeted market
b. Click “Trading” tab
c. Input the amount of market tokens you want to sell
d. Click on the Terms of Service
e. Click “Trade”
f. Wait for the confirmation in the Notification in the dashboard at right-hand side
g. You will quit the market after you have successfully sold out all market tokens.

**How do I know my order (buying and selling market token) is placed and succeed?**
You will receive notification for all your order, whatever it is failed or succeed transaction.

**Why did the trading fail?**
Failed trade may be caused by the following reasons:
  • Insufficient amount of ETH (for gas fee)
  • Insufficient amount of SmartUp Tokens
  • Insufficient amount of market tokens
  • Weak network
You can check the token balance in the “Portfolio” tab in the dashboard at your right-hand side.

**How can I find my trading records?**
You may find all trading records in the “Transaction” tab in “Personal Center”.
Personal Center: account/transaction

**What is gas fee?**
SmartUp is using the Ethernet, therefore every transaction cost gas fee. Please make sure you have enough ETH for transaction fee.
`,
`**什麼是市場成員？**
在市場上投資（購買市場代幣）的投資者都是市場成員。他們可以參與、討論和決定市場的發展。

**我如何找到我感興趣的巿場？**
您可以利用平台主頁中的搜索功能找出您感興趣的潛在項目。您可以使用任何關鍵字查找任何相關市場並評估是否值得投資。
找不到相關的想法？創建自己的市場吧！

**作為巿場成員，我如何投資項目？**
a.進入目標市場
b.點擊“交易”選項卡
c.輸入您想要購買的市場代幣數量
d.點擊同意服務條款
e.點擊“交易”
f.等待右側通知欄中的確認交易
g.成功購買市場代幣後，您將成為市場成員。買低賣高賺取金錢。

**作為市場成員，我能做些什麼？**
您可以通過創建建設性討論來貢獻項目。
您還可以投票支持不同的提案（此功能將在2019年晚些時候提供）以確定市場未來的方向。
強大的社區使這個市場更值得投資！

**我可以撤回我的投資嗎？**
可以。程序如下：
a.進入目標市場
b. 點擊“交易”
c.輸入您要出售的市場代幣數量
d. 點擊同意服務條款
e.點擊“交易”
f. 等待右側通知欄中的確認交易
g.成功售出所有市場代幣後，您將撤回該市場所有的資金。

**我怎麼知道我的買賣（買賣市場代幣）已經成功並成功了？**
您將收到所有訂單的通知，無論其失敗或成功交易。

**為什麼交易會失敗？**
交易失敗可能由以下原因引起：
  • ETH量不足（燃氣費）
  • SmartUp數量不足
  • 市場代幣數量不足
  • 網絡信號弱
您可以在右側控制面板的“資訊”標籤中查看代幣餘額。

**我怎樣才能找到我的交易記錄？**
您可以在“個人中心”的“交易”標籤中找到所有交易記錄。
個人中心：帳戶/交易

**什麼是礦工費？**
SmartUp正在使用以太網，因此每筆交易都需要支付燃氣費。請確保您有足夠的ETH作為交易費用。
`,
`**什么是市场成员？**
在市场上投资（购买市场代币）的投资人都是市场成员。 他们可以参与、讨论和决定市场的发展。

**我如何找到我感兴趣的巿场？**
您可以利用平台主页中的搜索功能找出您感兴趣的潜在项目。 您可以使用任何关键词查找任何相关市场并评估是否值得投资。
找不到相关的想法？ 创建自己的市场吧！

**作为巿场成员，我如何投资项目？**
a.进入目标市场
b.点击“交易”选项卡
c.输入您想要购买的市场代币数量
d.点击同意服务条款
e.点击“交易”
f.等待右侧通知栏中的确认交易
g.成功购买市场代币后，您将成为市场成员。 买低卖高赚取金钱。

**作为市场成员，我能做些什么？**
您可以通过创建建设性讨论来贡献项目。
您还可以投票支持不同的提案（此功能将在2019年晚些时候提供）以确定市场未来的方向。
强大的小区使这个市场更值得投资！

**我可以撤回我的投资吗？**
可以。 程序如下：
a.进入目标市场
b. 点击“交易”
c.输入您要出售的市场代币数量
d. 点击同意服务条款
e.点击“交易”
f. 等待右侧通知栏中的确认交易
g.成功售出所有市场代币后，您将撤回该市场所有的资金。

**我怎么知道我的买卖（买卖市场代币）已经成功并成功了？**
您将收到所有订单的通知，无论其失败或成功交易。

**为什么交易会失败？**
交易失败可能由以下原因引起：
  • ETH量不足（燃气费）
  • SmartUp数量不足
  • 市场代币数量不足
  • 网络信号弱
您可以在右侧控制面板的“信息”卷标中查看代币余额。

**我怎样才能找到我的事务历史记录？**
您可以在“个人中心”的“交易”卷标中找到所有事务历史记录。
个人中心：帐户/交易

**什么是矿工费？**
SmartUp正在使用以太网，因此每笔交易都需要支付燃气费。 请确保您有足够的ETH作为交易费用。
`
)
}