# Start
1. `yarn` or `npm i`   
2. `yarn start` or `npm start`

# Styling
## Theme
You can change some common styles by modifying
[this](https://github.com/smartupdev/smartup-dapp-ui/blob/master/src/theme.js).

## Spacing
Text, InputText, Row, Col, Icon can set spacing by props, e.g.   
`<Col spacingLeftS>Testing</Col>`

Supported props:    
format: `{spacing}{margin}{area}{size}`
* `spacing` - can skip, e.g. spacingTopS can be TopS
* `margin` - e.g. spacingTopS(padding-top), spacingMarginTopS(margin-top)
* `area` - All, Right, Left, Top, Bottom, H(Right & Left), V(Top & Bottom)   
For 4 edges, e.g. `spacingS` or `AllS`
* `size` - Base, XS, S, M, L, XL

## z-index
M: Mobile only
|9                         |10                   | 11                  | 12                     |
|:-                        |:-                   |:-                   | :-                     |
| (M) Header in top center | (M) Menu panel icon | (M) Panel cover     | (M) Panel close button |

# Store
TBC
## trade
## market
## create market
## home
## post
## panel