import { name } from './index'
import { ORDER_STATE, MARKET_FILTER_TYPE, MARKET_STAGE, PROPOSAL_STATE } from '../integrator'

export default {
  orderState: {
    [ORDER_STATE.active]: name('Active'),
    [ORDER_STATE.locked]: name('Locked'),
    [ORDER_STATE.fullyExecuted]: name('Fully Executed'),
    [ORDER_STATE.partiallyExecuted]: name('Partially Executed'),
    [ORDER_STATE.notExecuted]: name('Not Executed'),
    [ORDER_STATE.processing]: name('Processing'),
    [ORDER_STATE.onHold]: name('On Hold'),
    [ORDER_STATE.newAdded]: name('New'), 
  },
  marketFilterType: {
    [MARKET_FILTER_TYPE.all]: name('All', '全部'),
    [MARKET_FILTER_TYPE.hot]: name('Hottest', '最熱門', '最热门'),
    [MARKET_FILTER_TYPE.new]: name('Newest', '最新'),
    [MARKET_FILTER_TYPE.pop]: name('Populous', '最人氣', '最人气'),
    [MARKET_FILTER_TYPE.rich]: name('Richest', '最富有'),
  },
  marketStage: {
    [MARKET_STAGE.offering]: name('Phase 1'),
    [MARKET_STAGE.exchange]: name('Phase 2'),
    [MARKET_STAGE.closed]: name('Closed'),
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
  }
}