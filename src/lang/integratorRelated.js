import { name } from './index'
import { ORDER_STATE, MARKET_FILTER_TYPE, MARKET_STAGE, PROPOSAL_STATE, PROPOSAL_SORT, ORDER_SIDE } from '../integrator'

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
    [PROPOSAL_STATE.all]: name('All', '全部'),
    [PROPOSAL_STATE.save]: name('Save', '儲存', '储存'),
    [PROPOSAL_STATE.draft]: name('Public Draft', '公開初稿', '公开初稿'),
    [PROPOSAL_STATE.adminVote]: name('Admin Approval', '管理員審批', '管理员审批'),
    [PROPOSAL_STATE.publicVote]: name('Member Vote', '成員投票', '成员投票'),
    [PROPOSAL_STATE.ongoing]: name('Task Working', '執行中', '执行中'),
    [PROPOSAL_STATE.review]: name('Review'),
    [PROPOSAL_STATE.closed]: name('Archive', '封存'),
  },
  proposalSort: {
    [PROPOSAL_SORT.startTime]: name('Reminding Time', '淨餘時間', '净余时间'),
    [PROPOSAL_SORT.totalVotes]: name('Vote Rate', '投票率'),
    [PROPOSAL_SORT.yesVotes]: name('Approve Rate', '通過票率', '通过票率'),
    [PROPOSAL_SORT.noVotes]: name('Decline Rate', '否決票率'),
    [PROPOSAL_SORT.currentWithdrawAmount]: name('Current Withdraw Amount', '本次提取額', '本次提取额'),
    [PROPOSAL_SORT.totalWithdrawAmount]: name('Total Withdraw Amount', '總提取額', '总提取额'),
    [PROPOSAL_SORT.createdTime]: name('Create Time', '創建時間', '创建时间'),
  },
  orderSize: {
    [ORDER_SIDE.buy]: name('buy'),
    [ORDER_SIDE.sell]: name('sell'),
    [ORDER_SIDE.firstStageBuy]: name('firstStageBuy'),
  }
}