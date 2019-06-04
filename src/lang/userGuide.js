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
    1.	創建巿場：創建巿場後，無論成功或失敗均會收到通知
    2.	買入通知：在買入巿場代幣後，無論成功或失敗均會收到通知
    3.	賣出通知：在賣出巿場代幣後，無論成功或失敗均會收到通知
    `,
    `现时平台有三种通知，日后开放更多功能后或有更多通知类型。 
    1.	创建巿场：创建巿场后，无论成功或失败均会收到通知
    2.	买入通知：在买入巿场代币后，无论成功或失败均会收到通知
    3.	卖出通知：在卖出巿场代币后，无论成功或失败均会收到通知
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

}