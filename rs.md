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
  - Vote for proposal
  - Get daily NTT if NTT is below 100
- Deduct 
  - market dissolve and have CT 
  - Miss vote as a juror ~~Juror if miss two times or more~~
## Honour(Up Point)(TBC)(phase2)
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
- ~~0.01 to 100,000 per trading(TBC)~~
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
### Process
T: voting result yes  
F: voting result no  
?: voting result draw  
0: no one vote  

+D: Get back deposit  
-D: Lost deposit  

MC: Market creator  
A1, A2: Appeal1, Appeal2  
J1, J2, J3: Round1, Round2, Round3 Juror  
JT: Vote T   
JF: Vote F  
JV: Voted J 

|     | Result     | Flagger          | Member                   | Juror                                          |  
| :-  | :-         | :-               | :-                       | :-                                             |
| TTT | Dissolve   | +D               | A1: -D, A2: -D, MC: -D   | J1: JT share D, J2: JT share D, J3: JT share D | 
| TTF | X Dissolve | -D               | A1: -D, A2: +D           | J1: JT share D, J2: JT share D, J3: JF share D | 
| TF  | X Dissolve | -D               | A1: +D                   | J1: JT share D, J2: JF share D                 | 
| F   | X Dissolve | -D               |                          | J1: JF share D                                 | 
| ?   | X Dissolve | -D               |                          | J1: JV share D                                 | 
| T?  | X Dissolve | -D               | A1: +D                   | J1: JT share D, J2: JV share D                 | 
| TT? | X Dissolve | -D               | A1: -D, A2: +D           | J1: JT share D, J2: JT share D, J3: JV share D | 
| 0   | X Dissolve | +D               |                          |                                                | 
| T0T | Dissolve   | +D               | A1: --, A2: -D, MC: -D   | J1: JT share D, J2: --,         J3: JT share D | 
| T0F | X Dissolve | +D               | A1: --, A2: -D           | J1: JT share D, J2: --,         J3: JF share D | 
| T00 | X Dissolve | +D               | A1: --, A2: -D           | J1: JT share D                                 | 
| TT0 | X Dissolve | +D               | A1: -D, A2: -D           | J1: JT share D, J2: JT share D, J3: --         | 

### Juror
- Not member, not flagger, not doer, >7d login
- Not repeated in the whole process
- More NTT and SUT in platform wallet, high chance. Formula: (TBC)
- Notification ~~+ email~~ for juror
- Jurors are confidential
- 10 Juror + Dummy (TBC)
- Within the whole process, max 30 jurors
- Reward
  - Draw or < 3: voted jurors get 250 SUT (Deposit/10)
  - 0 vote: refunded

### Stage1 - Create Flag/Collect Flag Deposit
- Type: 
  - Type1: Market dissolve
  - Type2: Proposal doer flag
  - Type3: Proposal members flag

- Flagger
  - Type1: 
    - Exclude member/<100 NTT/account created less than 30d
    - \>= 1
    - \>10% deposit
  - Type2: 
    - Doer and member only
- ~~Create a post for a flag created(TBC)~~ 
- Discussion(Proof in text/photo/video)
- 3d, finish once deposit enough
- If expired and not enough deposit, Return flag deposit

### Stage 2 - Verify the flag 
- lock market: can't buy/sell/proposal(Type1)(TBC)
- 10 jurors
- 3d
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
- (TBC) After voted, member's CT lock, member can get NTT
- (TBC) Votes among proposal are not shared
- (TBC) When vote, 100% votes, not black vote
- ~~Locked CT, until proposal ended~~
- Voting period, say 7d

## Role
- Member: Account with CT
- Admin: member with AT ~~Top 10 members~~ ~~with positive NTT~~
- Proposer: Member ~~lock 1% CT~~

## Phase
### 1. Draft
- Member create an draft ~~and lock 1% CT~~ => proposer
- Member can discuss and edit
- Include
  - Overview
    - Name
    - Description
    - Supporting documents
    - Initial funding
  - Milestones(Optional)
    - Target
    - Amount
    - Deadline  
- Proposer can be transferred to another member 
- Period: No limit ~~(Until proposer no CT)~~ ~~1M(TBC)~~
- Result: Proposer decision
  - Yes => next
  - No => close
- Admin can close draft
### 2. Idea(phase2)
- Admin at the starting time: vote pass/fail
- Period: 7d(TBC)
- Result: Voting result(Majority) 
  - Yes => next
  - No => Archived
### 3. Proposal
- Member not admin vote pass/fail
- lock ct if they voted
- Period: 14d(TBC)
- Result: Voting result(Majority) + 30% vote rate
  - Yes => send initial funding to proposer + next(if has milestone)
  - No => Archived
### 4. Ongoing
- Proposer can update status
- Can edit amount and deadline of un-reviewed milestone(keep history)
- Period: Depend on milestone 
- Result: Proposer
  - Yes => next
  - No(Close) => Archived
### 5. Review
- Vote if the proposer meets the target(Milestone)
- Period: 14d(TBC)
- Result: Voting result(Majority)+ 30% vote rate
  - Yes => Proposer get money, next(Ongoing or archived, depend on milestone)
  - No => Archived(add appeal later, phase2)
### 6. Archived
- Show all completed and failed project

\* What if proposer/member/admin sell CT? Should only count when they do the action

## Types
<!-- ### Options
- Create: \> 5% CT
- Content: 
  - Title
  - Description
  - 2-5 options
  - Duration(3d, 5d, 7d - default)
  - ~~Number of answer accepted~~
- Result: Option(s) with highest votes -->

<!-- ### Money withdrawal
- Create: \> 5% CT
- Content:
  - Title
  - Description
  - Approve or Decline
  - Timeline with 4 milestones(TBC)
  - CT request
  - Duration(3d, 5d, 7d - default)
- Result: CT from(TBC), confirm result by creator and 1 member(>5 CT) within 3 days

//
- $ initial
- $ / Milestones
- $ deposit
- Every milestones, need approval by members
  - if pass, doer get money
  - if fail, doer not get money. proposal terminated
- if proposal pass, doer can flag with deposit(Type2)
- if proposal fail , members can flag with deposit(Type3)
- if delay or modification
  - Terminate proposal
  - Create a new one - can ref to the previous one -->

### Policy(TBC, phase2)
- Includes: (TBC)
- Content:
  - Title
  - Description
  - Approve or Decline for each suggestion
  - Duration(3d, 5d, 7d - default)
- Result: Option with highest votes

### Market dissolve(phase2)
- Content:
  - Title
  - Description
  - Approve or Decline
  - Duration(14d)

# Account
Account restore(TBC)  
Info: 
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

# EBM
## Terms
- FE: website in ipfs
- BE: smart-up node
- Contract: Communicate with chain
- Member: =Market member, who has CT 
- CT: Community token, i.e. dollar in a market
- TX$: Transaction fee
- AT: Admin token

## Story - Example
Z: User Z  
Y: User Y  
W: User W
- Create Market - Z
  - Set ctPrice(1), ctCount(10,000), basePrice(.4)
  - Send to BE
  - Send to contract - pay eth(gas), sut(deposit)
  - Send to BE  
  => Z: 0, Y: 0
- Buy CT - Z
  - Buy ct - ctCount(2,000), selling price(1.1)
  - Send to contract - pay eth(gas), sut(ctPrice)
  - Send to BE  
    => Z: 2,000 x 1.1, Y: 0
- Exchange CT
  - Y Buy ct - ctCount(1,000), buy price(1.15), selling price(1.2)
  - FE suggest order, Y take Z order
  - Send to contract - pay eth(gas), sut(1,000 x 1.1)
  - Send to BE  
    => Z: 1,000 x 1.1, Y: 1,000 x 1.2
  - Y change price - ctCount(500), price(1.1)
  - FE no order can be suggested
  - Send to contract - pay eth(gas)
  - Send to BE  
  => Z: 1,000 x 1.1, Y: 500 x 1.1, 500 x 1.2
  - W but CT - ctCount(800), buy price(1), selling price(1.3)
  - FE no order can be suggested
  - Send to contract - pay eth(gas), sut(800 x 1)
  - Send to BE  
    => Z: 1,000 x 1.1, Y: 500 x 1.1, 500 x 1.2, W: -800 x 1(1.3)
  - Y change price - 1.1 => 1
  - FE suggest order, Y take Z order
  - Send to contract - pay eth(gas)
  - Send to BE  
    => Z: 1,000 x 1.1, Y: 200 x 1.2, W: 800 x 1.3
## Create Market
- \> 100 NTT ~~account created over 30 days~~
- rules
- Step:
  1. User: Input   
    Off-chain: name, description, photo, cover   
    On-chain: ctPrice(0.01 - 1k), ctCount(100 - 1M, Integer), recyclePrice(0% - 100%), transaction price(fast, average, slow)
  2. User: sign a) on-chain data b) 2500 sut as deposit
  3. FE: Send to BE
  4. BE: do validation
  5. BE: send a request with sign to contract
  6. Contract: use smartup contract to create a market
  7. Contract: once success, initial market(ct price, count, recycle price)

## Stage 1 - Buy CT
Period: 1 month  
Admin: Creator  
Activity:  
\- Buy CT: with ctPrice  
\- Discussion  
End:  
a. Sold all CT => go to stage 2  
b. Period end but not ct were sold => go to dissolve market
## Stage 2 - Exchange CT
Period: N/A  
Admin: Who has AT. If no one, creator  
Activity:
- Buy/Sell CT: (phase2) 1% TX$ (See transaction)
- Discussion  
- Proposal (See above)
- Flag (See above)
## Dissolve Market
0. Situation to dissolve market  
  \- Within buy CT period, CT not sold out  
  \- Flag and success(after all appeal)
1. Lock market  
  \- No sell/buy  
  \- No post/reply  
  \- All proposal stop, no one can withdraw money
2. One member acknowledgement and pay gas to confirm. In return, can get sut(value equivalent to gas) from market 
3. All member need to claim back their sut according to ct  
1 ct = (#sut - gas)/#ct   
(Note: gas is eth, so need to covert to sut)

# admin(phase2)
## Privilege
- Manage post/reply: close, re-open, ban member
- Manage proposal: close, re-open, ban member, approve
## Join and quit
- Creator is admin if no one has AT 
- Every Sunday(UTC: 00:00) is a period
- Join
  - Can schedule
  - 10% CT => 1 AT
  - Max 5 AT in the whole market  
  - One can get more than 1 AT
- Quit
  - Can schedule
  - 1 AT => 10% CT
## Claim 
- get sut as salary
- salary from transition

Case 1;  
  Marker: CT => SUT  
  Taker: SUT => CT(+1% sut)  
Case 2;  
  Marker: SUT => CT  
  Taker: CT => SUT(-1% sut)

=> Share the transaction pool money of that week
- 100sut 5at => 1at get 20sut
- 100sut 4at => 1at get 25sut
- 100sut 0at => creator get 100sut


<!-- Data include:
- name, description, photo,
- 24h change
- today max, min
- spot price
- 24h volume
- funding pool
- 7d price
- total ct(TBC)
- post count
- member count
- 1h, 1d, 1w kline data
  - max, min price
  - start, end price
  - amount, count
   -->

Lam:
1. In etherScan, user cannot see market info, token
2. Deposit is needed
3. Set max gas limit
4. Price matching method
5. Symbol: not unique
6. Market name: unique
7. Proposal time

Make order
1. User(request) => node
2. node(message - make order) => user
3. User(sign) => node 
4. node(message + sign) => add to order book + balance(-marker) => contract
5. contract: check message + sign

Take order
1. User(request) => node
2. node(message - take order) => user
3. User(sign) => node 
4. node(message + sign) => add to order book + balance(-taker, +maker) => contract
5. contract: check message + sign

Q1
1. Take multiple orders?
=> yes
2. Take and make order?
=> yes, if not all fulfill
3. How to ensure the payment is valid?
=> if not valid in contract, will cancel the order. If the order is took, ...can't solve. So can't trade?