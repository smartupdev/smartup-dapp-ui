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
- (TBC)After voted, member's CT lock, member can get NTT
- Votes among proposal are not shared???
- When vote, 100% votes, not black vote??
- Locked CT, until proposal ended

## Role
- Member: Account with CT
- Moderator: Top 10 members ~~with positive NTT~~
- Proposer: Member with > 5% CT

## Phase
### 1. Idea
- Member create an idea to become a proposer
- Can discuss and edit
- Include
  - Overview
    - Name
    - Description
    - Supporting documents
    - Initial funding
  - Milestones
    - Target
    - Amount
    - Deadline  
- Period: No limit(Until proposer no CT) ~~1M(TBC)~~
- Result: Proposer decision
  - Yes => next
  - No => Close, delete
### 2. Idea review
- Moderators vote pass/fail
- Period: 1M(TBC)
- Result: Moderators' vote 
  - Yes => next
  - No => Archived
### 3. Proposal
- Members vote pass/fail
- Period: 1M(TBC)
- Result: Members' vote yes
  - Yes => send initial funding to proposer + next
  - No => Archived
### 4. Ongoing
- Proposer can update status
- Can edit amount and deadline of un-reviewed milestone
- Period: Depend on milestone 
- Result: Proposer
  - Yes => next
  - No => Archived
### 5. Review
- Vote if the proposer meets the target(Milestone)
- Period: 
- Result: Members' vote no
  - Yes => Proposer get money, next(Ongoing or archived, depend on milestone)
  - No => Archived(Will add appeal later)
### 6. Archived
- Show all completed and failed project

(TBC)
1. What if proposer/member/moderator sell CT? Should only count when they do the action
2. 

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
  - Create a new one - can ref to the previous one

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


Lam:
1. add token from wallet, get token from admin
  - gas fee pay by user
  - token you get = request token - gas fee 
2. Create market
  - FE: Sign and send a request to node, Wait(A)
  - node: 
    - Create market => lock status
      - Check balance
        - Pass: Send request to contract, Wait(B)
        - Fail: saved status
  - Contract:
    - Create market via smartUp contract
      - Initiate market with 

=> admin
  => lock CT, 10%
  => unlock, need to freeze a period
  => get CT as salary
  => salary from transition