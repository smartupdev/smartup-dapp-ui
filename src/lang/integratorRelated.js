import { name } from './index'
import { ORDER_STATE, MARKET_FILTER_TYPE, MARKET_STAGE, PROPOSAL_STATE, PROPOSAL_SORT } from '../integrator'

export default {
  orderState: {
    [ORDER_STATE.active]: name('Active', '掛單中', '挂单中'),
    [ORDER_STATE.locked]: name('Locked', '已鎖定', '已锁定'),
    [ORDER_STATE.fullyExecuted]: name('Fully Executed', '全數成交', '全数成交'),
    [ORDER_STATE.partiallyExecuted]: name('Partially Executed', '部份成交'),
    [ORDER_STATE.notExecuted]: name('Not Executed', '未成交'),
    [ORDER_STATE.processing]: name('Pending', '處理中', '处理中'),
    [ORDER_STATE.onHold]: name('Unlock Required', '需解鎖', '需解锁'),
    [ORDER_STATE.newAdded]: name('New', '新單', '新单'), 
  },
  marketFilterType: {
    [MARKET_FILTER_TYPE.all]: name('All', '全部'),
    [MARKET_FILTER_TYPE.hot]: name('Hottest', '最熱門', '最热门'),
    [MARKET_FILTER_TYPE.new]: name('Newest', '最新'),
    [MARKET_FILTER_TYPE.pop]: name('Populous', '最人氣', '最人气'),
    [MARKET_FILTER_TYPE.rich]: name('Richest', '最富有'),
  },
  marketStage: {
    [MARKET_STAGE.offering]: name('Token Offering', '代幣認購階段', '代币认购阶段'),
    [MARKET_STAGE.exchange]: name('Main Board Trading', '主板交易', ''),
    [MARKET_STAGE.closed]: name('Archive', '封存'),
  },
  proposalState: {
    [PROPOSAL_STATE.all]: name('All'),
    [PROPOSAL_STATE.save]: name('Save'),
    [PROPOSAL_STATE.draft]: name('Draft'),
    [PROPOSAL_STATE.adminVote]: name('Admin Vote'),
    [PROPOSAL_STATE.publicVote]: name('Public Vote'),
    [PROPOSAL_STATE.ongoing]: name('Ongoing'),
    [PROPOSAL_STATE.review]: name('Review'),
    [PROPOSAL_STATE.closed]: name('Closed'),
  },
  proposalSort: {
    [PROPOSAL_SORT.startTime]: name('startTime'),
    [PROPOSAL_SORT.totalVotes]: name('totalVotes'),
    [PROPOSAL_SORT.yesVotes]: name('yesVotes'),
    [PROPOSAL_SORT.noVotes]: name('noVotes'),
    [PROPOSAL_SORT.currentWithdrawAmount]: name('currentWithdrawAmount'),
    [PROPOSAL_SORT.totalWithdrawAmount]: name('totalWithdrawAmount'),
    [PROPOSAL_SORT.createdTime]: name('createdTime'),
  }
}