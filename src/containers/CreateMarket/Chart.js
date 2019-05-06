import React, {Component} from 'react'
import ChartJS from 'chart.js'

function f(x) {
  return 1000 * (0.000074999921875 * Math.log(x) + 0.000000000015625 * x)
}

function getRange(min_x, max_x, step) {
  const arr = []
  for(let i = min_x; i <= max_x ; i+=step) {
    arr.push(i)
  }
  return arr
}

const range = getRange(0, 10000, 100)
const data = range.map(x => {
  let y = f(x)
  return y < 0 ? 0 : y
})

// const data = [0,0.0006388669489504998,0.0006909310583403722,0.0007214190347715228,0.0007430732927302445,0.0007598871666457202,0.0007736393941613953,0.0007852788081054177,0.0007953717771201169,0.000804283620592546,0.0008122637760355927,0.0008194901570748092,0.0008260941285512677,0.0008321754503734464,0.0008378116674952901,0.0008430642524667434,0.0008479827615099892,0.0008526077284099234,0.0008569727299824184,0.0008611058923536875,0.0008650310104254651,0.000868768393926441,0.0008723355164646816,0.0008757475201847003,0.0008790176129411402,0.0008821573843409409,0.0008851770597633188,0.0008880857064135693,0.0008908914018851625,0.0008936013731294985,0.0008962221118566158,0.0008987594710066353,0.0009012187458998617,0.0009036047428958324,0.0009059218377997958,0.0009081740258006384,0.0009103649643722908,0.0009124980102958545,0.00091457625174356,0.0009166025361944696,0.0009185794948153376,0.000920509563830505,0.0009223950033163134,0.0009242379137837578,0.000926040250854554,0.0009278038382877667,0.0009295303795745728,0.0009312214682859726,0.0009328785973310125,0.0009345031672603358,0.0009360964937308133,0.0009376598142309464,0.0009391942941531912,0.000940701032287853,0.0009421810658034415,0.0009436353747700299,0.000945064886275035,0.0009464704781747106,0.0009478529825193709,0.0009492131886858157,0.0009505518462464882,0.0009518696676014774,0.0009531673303965077,0.0009544454797474641,0.0009557047302897341,0.000956945668068667,0.0009581688522857048,0.0009593748169132113,0.0009605640721896682,0.0009617371060057235,0.0009628943851905108,0.0009640363567067329,0.0009651634487621633,0.0009662760718444852,0.000967374619685727,0.0009684594701619641,0.0009695309861334323,0.0009705895162297274,0.000971635395584342,0.0009726689465224127,0.00097369047920521,0.0009747002922345924,0.0009756986732203774,0.000976685899313322,0.0009776622377061857,0.0009786279461051438,0.0009795832731736302,0.0009805284589505217,0.0009814637352444264,0.0009823893260056938,0.0009833054476776392,0.0009842123095283645,0.000985110113964445,0.0009859990568276582,0.000986879327675845,0.0009877511100489082,0.0009886145817208849,0.0009894699149389581,0.0009903172766502083,0.0009911568287168555,0.0009919887281206858]
// const range = [0,5000,10000,15000,20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000,105000,110000,115000,120000,125000,130000,135000,140000,145000,150000,155000,160000,165000,170000,175000,180000,185000,190000,195000,200000,205000,210000,215000,220000,225000,230000,235000,240000,245000,250000,255000,260000,265000,270000,275000,280000,285000,290000,295000,300000,305000,310000,315000,320000,325000,330000,335000,340000,345000,350000,355000,360000,365000,370000,375000,380000,385000,390000,395000,400000,405000,410000,415000,420000,425000,430000,435000,440000,445000,450000,455000,460000,465000,470000,475000,480000,485000,490000,495000,500000]

const getChartConfig = (range, data) => ({
  type: 'line',
  data: {
    labels: range,
    datasets: [{
      label: 'SmartUp Token',
      backgroundColor: 'rgba(66, 134, 244, .2)',
      borderColor: 'rgb(66, 134, 244)',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      data,
    }],
  },
  options: {
    legend: {
      display: false,
    },
    tooltips: {
      displayColors: false
    },
    maintainAspectRatio: false
  }  
})


export default class Chart extends Component {
  componentDidMount () {
    let chartCanvas = this.refs.chart;
    let myChart = new ChartJS(chartCanvas, getChartConfig(range, data));
  
    this.setState({chart: myChart});
  }
  // componentDidUpdate () {
  //     let chart = this.state.chart;
  //     let data = data;
  
  //     data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data);
  
  //     chart.data.labels = data.labels;
  //     chart.update();
  // }
  render () {
    return (
      <div className="chart-container" style={{position: 'relative', height:'30vh', width:'100%'}}>
      <canvas style={{height: 200}} ref={'chart'}></canvas>
      </div>
    );
  }
}