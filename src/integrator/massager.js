import { changeArrayByIndex } from '../lib/util/reducerHelper'

export function tradeMassage(trade) {
  return {
    ...trade, 
    id: trade.txHash,
    avgAmount: trade.sutAmount / trade.ctAmount,
    userIcon: trade.user.avatarIpfsHash,
    username: trade.user.name || trade.user.userAddress
  }
}

export function userMassage(user) {
  return {
    name: user.name || '',
    displayName: user.name || user.userAddress,
    avatarHash: user.avatarIpfsHash,
    // userAvatar: user.avatarIpfsHash,
    // userAddress: user.userAddress,
    // userName: user.name ? user.name : user.userAddress,
    // realUserName: user.name || '',
    // nameHasChanged: !!user.name,
  }
}

function _userMassage(u) {
  return {
    userAvatar: u.avatarIpfsHash, 
    username: u.name, 
    userAddress: u.userAddress
  }
}


export function toggleFollow(r) {
  return {...r, isCollect: !r.isCollect}
}

export function toggleLike(r) {
  if(!r) return r
  if(r.isLiked) return { // unmark like
    ...r,
    isLiked: !r.isLiked,
    numberOfLike: r.numberOfLike - 1
  }
  return { 
    ...r, 
    isLiked: !r.isLiked, 
    isDisliked: false,
    numberOfLike: r.numberOfLike + 1,
    numberOfDislike: r.isDisliked ? r.numberOfDislike - 1 : r.numberOfDislike
  }
}
export function toggleDislike(r) {
  if(!r) return r
  if(r.isDisliked) return { // ummark dislike
    ...r, 
    isDisliked: !r.isDisliked,
    numberOfDislike: r.numberOfDislike - 1
  }
  return { // mark dislike
    ...r,
    isLiked: false,
    isDisliked: !r.isDisliked,
    numberOfDislike: r.numberOfDislike + 1,
    numberOfLike: r.isLiked ? r.numberOfLike - 1 : r.numberOfLike
  }
}

export function replyMassage(r) {
  return {
    ...r, 
    id: r.replyId, 
    isCollect: r.isCollected,
    numberOfLike: r.data && r.data.likeCount, 
    numberOfDislike: r.data && r.data.dislikeCount, 
    ..._userMassage(r.user)
   }
}

export function postMassage(p) {
  return {
    ...p,
    id: p.postId,
    authorName: p.username || p.userAddress,
    time: p.createTime,
    // title, 
    content: p.description,
    numberOfLike: p.data && p.data.likeCount, 
    numberOfDislike: p.data && p.data.dislikeCount, 
    numberOfComment: p.data && p.data.replyCount, 
    isCollect: p.isCollected,
    lastReply: p.lastReply && {
      ...p.lastReply,
      ..._userMassage(p.lastReply.user)
    },
    ..._userMassage(p.user)
  }
}

export function marketMassage(m) {
  if(!m) throw new Error('Market doesn\'t exist. Please check the url and try again later.')
  return {
    ...m,
    ...m.data,
    id: m.marketId,
    address: m.marketAddress,
    cover: m.cover,
    avatar: m.photo,
    numberOfComments: m.data ? m.data.postCount || 0 : '-',
    numberOfSub: m.data ? m.data.userCount || 0 : '-',
    lately_volume: m.data && m.data.latelyVolume,
    lately_change: m.data && m.data.latelyChange,
    priceIn7d: m.sevenDayNode || [],
    following: m.isCollected,
    overview: m.description,
    icon: null,
  }
}

export function updateLoadMore(currentList, newList, isLoadMore, key = 'id') {
  return isLoadMore ? 
  newList.reduce((currentArray, newRecord) => {
    // check if the record already exists. If yes, update thd old one. If no, append to the end.
    const existIndex = currentArray.findIndex(a => a[key] === newRecord[key])  
    return existIndex < 0 ? [...currentArray, newRecord] : changeArrayByIndex(currentArray, existIndex, () => newRecord)
  }, currentList)
  : newList
}
