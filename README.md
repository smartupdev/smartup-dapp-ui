Our website is in
`https://ipfs.smartup.global/ipfs/<hash>/`

## Dev
1. `yarn` or `npm i`   
2. `yarn start` or `npm start`   

## Deploy
1. `ssh <user>@<ip>`
2. `cd ipfs/files`
3. Upload folder to here
4. `ipfs add -r <folder>`

## Styling
### Theme
Please see [here](https://github.com/smartupdev/smartup-dapp-ui/blob/master/src/theme.js).

### Spacing
Text, InputText, Row, Col, Icon can set spacing by props, e.g.   
`<Col spacingLeftS>Testing</Col>`

Supported props:    
format: `{spacing}{margin}{area}{size}`
* `spacing` - can skip, e.g. spacingTopS can be TopS
* `margin` - e.g. spacingTopS(padding-top), spacingMarginTopS(margin-top)
* `area` - All, Right, Left, Top, Bottom, H(Right & Left), V(Top & Bottom)   
For 4 edges, e.g. `spacingS` or `AllS`
* `size` - Base, XS, S, M, L, XL

## Store
### trade

### market

### create market

### home

### post

### panel