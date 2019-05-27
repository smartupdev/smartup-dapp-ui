import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useScroll, getElementById } from '../../lib/react'
import { mainId } from '../../containers/App'

import Text, {TextWithLink} from '../../components/Text'
import Image from '../../components/Image'
import Cover from '../../images/user_guide_cover.gif'
import BG from '../../images/user_guide_bg.png'
import { Row, Col } from '../../components/Layout'


const TextBody = ({children}) => <TextWithLink newline VXS note>{children}</TextWithLink>

const installChrome = `a.	到 https://www.google.com/chrome/ 
b.	点撃”Download Chrome”
c.	下载Chrome后点撃ChromeSetup.exe安装
`

const installMetamask = `MetaMask是第三方网桥，让您能在Google Chrome浏览器中的访问分布式网络和dapp，如 SmartUp 孵化器平台。 它允许您直接在浏览器中运行Ethereum dApp，而无须运行完整的Ethereum节点。 
您可能会将其视为存储ETH和SmartUp的ETH钱包。 只需安装MetaMask扩展，点击与SmartUp 孵化器平台连接，即可开始充分利用SmartUp孵化器平台。 
a.	使用Chrome到 https://metamask.io/ 
b.	点撃”GET CHROME EXTENSION”
c.	点撃”加到 Chrome”
d.	完成安装后点撃”Get Started”
e.	如你重未有过MetaMask的钱包，点击”Create a Wallet”
f.	创建你的MetaMask钱包密码
g.	点击隐藏的12个英文生字，记录下显示出来的12个英文生字以便日后取回 /汇入账号，然后点击下一步
h.	根据刚才生字显示的顺序重新排列12个生字，然后点击”Confirm”
i.	点击”All Done”完成创建钱包，并进入钱包界面
j.	因现时平台使用测试用的以太网，在右上角把”Main Ethereum Network” 转换至”Ropsten Test Network”
k.	点击左下方” Add Token”，在”Custom Token”分页中”Token Contract Address”一栏输入”0xf1899c6eb6940021c1ae4e9c3a8e29ee93704b03”，点击”Next”以显示SmartUp
`

const addEth = `SmartUp是使用以太网的dapp，因此平台上的交易及巿场创建需要使用矿工费(Gas Fee) 因此MetaMask中须存有ETH。 
a.	点击Chrome浏览器右上角MetaMask图标
b.	点击”Deposit”增值ETH
c.	在测试水管中获取测试用的ETH
d.	点击”request 1 ether from faucet”
`

const addSut = `a.	到 https://faucet.smartup.global/static/index.html 
b.	在MetaMask复制钱包的地址并把地址贴上钱包地址一栏
c.	按"Give me 100W SUT" 按钮
d.	等待1-2分钟，币会自动添加到你的钱包裹
`
const loginTxt = `a.	进入 https://ipfs.smartup.global/ipfs/QmaNVSpC47Br7MPu2iqZ9HYWXNetq3wqG1SAE2JpTmKt6K/#/ 
b.	点击Connect链接登入MetaMask
c.	在弹出的MetaMask上点击”Sign”完成登入
`
const personalCenterTxt = `a.	于平台右面是Portfolio页面，可以检视钱包、已投资巿场、书韱、通知及个人设定
b.	点击”Setting”
c.	上载个人图片，点击”Submit”完成上载，图片可多次更改
d.	更改名称（每个帐户只可命名一次）输入名字后，点击”Submit”，确认无误后点击” Confirm”
`
const notificationTxt = `现时平台有三种通知，日后开放更多功能后或有更多通知类型。 
1.	创建巿场：创建巿场后，无论成功或失败均会收到通知
2.	买入通知：在买入巿场代币后，无论成功或失败均会收到通知
3.	卖出通知：在卖出巿场代币后，无论成功或失败均会收到通知
`
const createMktTxt = `a.	在平台左边导览栏，点击第二个分页创建巿场
b.	输入巿场名称及巿场简介
c.	加入巿场图像及封面图片
d.	点击”Next”预览代币价格曲线
e.	存入巿场按金（现时固定为2500个SmartUp Token）
f.	在MetaMask确认交易，等待1-2分钟完成创建巿场
`

const tradeTxt = `a.	在主页中找到想交易的巿场，点击展开查阅，再点击”Trade”进入巿场交易页面
b.	点选BUY或SELL
c.	输入交易的巿场代币数量
d.	勾选右面”Agree To Terms of Service”
e.	点击”Trade”
f.	在MetaMask确认交易
`

const mktDiscussionTxt = `发起讨论：
a.	进入巿场后，点撃上方分页列中的”Discussions”
b.	点击“+” 发布新帖子
c.	输入帖子标题及内容，可选择上载一张图片
d.	点击”Submit”成功发布帖子

回复帖子：
a.	在”Discussions”点击进入帖子
b.	在帖子的最下方输入回复内容
c.	点击”Reply”成功回复
`

const sections = [
  { title: '使用前准备', sections: [
    { title: '安装Google Chrome', body: installChrome },
    { title: '安装MetaMask', body: installMetamask },
    { title: '增值ETH', body: addEth },
    { title: '增值SmartUp', body: addSut },
  ]},
  { title: '登入及个人设定', sections: [
    { title: '登入', body: loginTxt },
    { title: '个人设定', body: personalCenterTxt },
    { title: '通知', body: notificationTxt },
  ]},
  { title: '使用巿场', sections: [
    { title: '创建巿场', body: createMktTxt },
    { title: '巿场交易', body: tradeTxt },
    { title: '巿场讨论', body: mktDiscussionTxt },
  ] },
]

const userGuideId = 'user-guide-id'

export default () => {
  const [gifSource] = useState(`${Cover}?a=${Math.random()}`)
  const [leftMenuY] = useScroll(userGuideId, mainId)

  const refs = sections.map(({ sections }) => ({
    title: useRef(),
    sections: sections.map(() => useRef())
  }))  
  function scrollTo(index, j) {
    const ele = typeof j === 'number' ? refs[index].sections[j] : refs[index].title
    getElementById(mainId).scrollTo(0, ele.current.offsetTop)
  }

  return (
    <Col flex={1} fitHeight style={{ backgroundImage: `url("${BG}")`, backgroundRepeat: 'repeat-y', backgroundSize: `100% auto`}}>
      <Image source={gifSource} style={{ width: '100%', height: 'inherit' }} />
      <Row flex={1}>
        <Col LeftL RightXL id={userGuideId} overflowAuto style={{ maxHeight: '100vh', paddingTop: leftMenuY < 0 ? Math.abs(leftMenuY) : 0 }}>
          {
            sections.map( ({title, sections}, index) => 
              <Fragment key={title}>
                <Text note TopS onClick={() => scrollTo(index)}>{title}</Text>
                {sections.map( ({title}, j) => 
                  <Text note TopXS LeftL key={title} onClick={() => scrollTo(index, j)}>{title}</Text>
                )}
              </Fragment>
            )
          }
        </Col>
        <Col flex={1} LeftXL RightS>
          {
            sections.map( ({title, sections}, index) => 
              <Fragment key={title}>
                <Text note XL ref={refs[index].title}>{title}</Text>
                {sections.map( ({title, body}, j) => 
                  <Col key={title} ref={refs[index].sections[j]}>
                    <Text primary L TopS>{title}</Text>
                    {typeof body === 'string' ? <TextBody>{body}</TextBody> : body}
                  </Col>
                )}
              </Fragment>
            )
          }
        </Col>
      </Row>
    </Col>
  )
}