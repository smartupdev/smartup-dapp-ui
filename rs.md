This is just a plan and note. All content here will may be substantially modified. 

# Token
## CT
- Non-transferable(TBC)
- Exchangeable with SUT
## SUT
- First 100 users granted 2500 SUT(TBC)
- Official Token
- Create Market, flag deposit
## NTT
- Default: 100 NTT
- \> 100 can create market
- \> 100 can flag market
- Non-transferable
- Credibility of user
- ~~Positive NTT(TBC: No negative?)~~
- 0, get notification
- 0 to infinity
- Badge based on #NTT
- Add
- Deduct 
  - NTT if miss two times or more
## Honour(Up Point)(TBC)
- Activeness
- Calculated by
  - #Post
  - #Reply
  - #Proposal
  - #Voted/juror
  - #flag
- For fun only

## ETH
- Gas fee
## DAI(TBC)

# Support Browser(TBC)
## Desktop
- Google Chrome(73): Full support
- Mozilla Firefox(65): Full support
- Safari(12): Display only. Not support wallet related features.  
- Microsoft Edge(17): Display only. Not support wallet related features.  
- ~~Internet Explorer(11)~~
## Mobile
- Android: Firefox



# Feature
## Open forum
## Create Market
- \> 100 NTT, account created over 30 days
- deposit it is not redeemable when creator closes the market. ??(TBC)
- Status: Public or private(TBC)
- kind of securities(TBC)
- rules
- Distribution of new token money
  - 99 for member:1 for transaction fee(TBC)
=> output: On chain, market name, description, contract address, deposit amount, status, distribution(TBC)

## Market Privilege
A - all access(RCU),   
R - read,   
C - create,   
U - reply/comment,   
$ - with 1% CT burning??
(TBC) Hide post? Close thread? Band user, unband user, retrieve others' comment, vote proposal, quit market??
| Functions | non-member | Member | >5% member | >10% member
| :- | :- | :- | :- | :- |
| Public post | R | RU | A | A | 
| Private post | - | RCU | A | A | 
| Delete post/comment | - | - | $1 | $1 |
| Stick a post to top | - | - | A | A | 
| Proposal(Options) | R | R | RC | RC | 
| Proposal(Withdrawal) | R | R | RC | RC | 
| Proposal(Policy) | R | R | RC | RC |
| See vote count | - | - | $1 | $1 |
| Reopen post | - | - | $2 | $2 |
| Approval proposal | - | - | $2 | $2 |
| Delete proposal | - | - | $2 | $2 |
| Delete users | - | - | $2 | $2 |

## Trading
- advertisement fee(TBC)
- Gas speed(Slow, standard, fast)(TBC)
- 0.01 to 100,000 per trading(TBC)
- Not enough SUT, teach user how to buy(TODO)
- Not enough CT, tell user how many CT his has/owns(TODO)
- Click traction, go to https://etherscan.io/(TODO)

## Discussion
- Private and public 
- Post privilege is set by Creator

### initial price, number of CT
Creator

### Post a recruitment 
TBC

### Request funding

## Flag
### Juror
- +NTT
- Not member, flag-er
- Not repeated in the whole process
- More NTT and SUT in platform wallet, high chance. Formula: (TBC)
- Notification + email for juror (TBC: no email)
- Jurors are confidential
- Within the whole process, max 30 jurors
- Reward
  - Draw: voted get 250 SUT (Deposit/10)
  - 0 vote: refunded(TBC)
  - 


### Stage 1 - Create Flag
- Member can't flag(TBC)
- 100 SUT - market deposit
- 3d, finish once deposit enough
- \> 100 NTT, account created over 30 days
- Proof in text/photo/video
- lock market: can't buy/sell(TBC: proposal?)
- Return Flag deposit after 3d expired
### Stage 2 - Verify the flag 
- Create a post for a flag created(TBC)
- 3d (TBC: 3d for noti + 3d for voting)
- 10 jurors
- Result
  - Position: to Stage 3 - Appeal System
  - No result(Total vote < 3, Draw)
    - First time, go to stage 2 again. Otherwise, no dissolve
    - Flag-ers need to pay deposit(amount depends on #voted juror)
  - Announcement
    - As a reply in post
    - notification for member + juror
### Stage 3 - Appeal System
- Member can appeal
- 3d
- Deposit required, members pay
- Proof(TBC)
- Max 2 times for appeal
- Result Announcement
  - As a reply in post
  - notification for member + juror

### Stage 4 - Dissolve Market 
- Result: Positive
- Reward/punishment(TBC)

| | Flag success | Flag fail | No result |
|:-  |:-   |:-   |:- |
|Flag-er  | +40NTT, Refund deposit, Get SUT(Based #CT)  | -40NTT  | - |
|Member | -NTT(Based #CT), Refund if appeal | - | - |
|(>) Juror | Share deposit | Share deposit | 250 SUT |
|(<) Juror | - | - | - |
|(A) Juror | -20NTT | -20NTT | -20NTT

# Proposal
- CT = votes
- Votes among proposal are not shared
- When vote, 100% votes, not black vote
- Locked CT, until proposal ended
## Types
### Options
- Create: \> 5% CT
- Content: 
  - Title
  - Description
  - 2-5 options
  - Duration(3d, 5d, 7d - default)
  - ~~Number of answer accepted~~
- Result: Option(s) with highest votes

### Money withdrawal
- Create: \> 5% CT
- Content:
  - Title
  - Description
  - Approve or Decline
  - Timeline with 4 milestones(TBC)
  - CT request
  - Duration(3d, 5d, 7d - default)
- Result: CT from(TBC), confirm result by creator and 1 member(>5 CT) within 3 days

### Policy(TBC)
- Includes: (TBC)
- Content:
  - Title
  - Description
  - Approve or Decline for each suggestion
  - Duration(3d, 5d, 7d - default)
- Result: Option with highest votes

### Market dissolve
- Content:
  - Title
  - Description
  - Approve or Decline
  - Duration(14d)

# Account
- Account restore(TBC)
Include: 
- Image
- Nickname
- Email
- NTT
- Created + saved + funded market
- Created + saved post
- Created + saved comment
## Platform account
- An account for trading
- Users need to put money the account from their wallet
