import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useScroll, getElementById } from '../../lib/react'
import { mainId } from '../../containers/App'

import Text, {TextWithLink} from '../../components/Text'
import Image from '../../components/Image'
import Cover from '../../images/user_guide_cover.gif'
import BG from '../../images/user_guide_bg.png'
import { Row, Col } from '../../components/Layout'


const TextBody = ({children}) => <TextWithLink newline VXS note>{children}</TextWithLink>

const installChrome = `a.	到https://www.google.com/chrome/
b.	点撃”Download Chrome”
c.	下载Chrome后点撃ChromeSetup.exe安装
`

const installMetamask = `MetaMask是第三方网桥，让您能在Google Chrome浏览器中的访问分布式网络和dapp，如 SmartUp 孵化器平台。 它允许您直接在浏览器中运行Ethereum dApp，而无须运行完整的Ethereum节点。 
您可能会将其视为存储ETH和SmartUp的ETH钱包。 只需安装MetaMask扩展，点击与SmartUp 孵化器平台连接，即可开始充分利用SmartUp孵化器平台。 
a.	使用Chrome到https://metamask.io/
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

const addSut = `a.	到https://faucet.smartup.global/static/index.html
b.	在MetaMask复制钱包的地址并把地址贴上钱包地址一栏
c.	按"Give me 100W SUT" 按钮
d.	等待1-2分钟，币会自动添加到你的钱包裹
`

const sections = [
  { title: '使用前准备', sections: [
    { title: '安装Google Chrome', body: installChrome },
    { title: '安装MetaMask', body: installMetamask },
    { title: '增值ETH', body: addEth },
    { title: '增值SmartUp', body: addSut },
  ]},
  { title: '登入及个人设定', sections: [
    { title: '登入', body: addSut },
    { title: '个人设定', body: addSut },
    { title: '通知', body: addSut },
  ]},
  { title: '使用巿场', sections: [
    { title: '创建巿场', body: addSut },
    { title: '巿场交易', body: addSut },
    { title: '巿场讨论', body: addSut },
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
        <Col LeftL RightXL id={userGuideId} style={{ paddingTop: leftMenuY < 0 ? Math.abs(leftMenuY) : 0 }}>
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