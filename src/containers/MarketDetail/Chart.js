import React, { Component, useRef, useEffect } from 'react'
import theme from '../../theme'

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import dumpData from './dumpData'

function fill(d) {
  return d.close > d.open ? theme.red : theme.green
}
const candlesAppearance = {
  wickStroke: "#fff",
  fill,
  stroke: 'transparent',
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 1,
}

const BlockPageScroll = ({ children }) => {
  const scrollRef = useRef(null)
  useEffect(() => {
    const scrollEl = scrollRef.current
    scrollEl.addEventListener('wheel', stopScroll)
    return () => scrollEl.removeEventListener('wheel', stopScroll)
  }, [])
  const stopScroll = e => e.preventDefault()
  return (
    <div ref={scrollRef}>
      {children}
    </div>
  )
}

class DrawChart extends Component {
  changeScroll(){
    let style = document.body.style.overflow 
    document.body.style.overflow = (style === 'hidden') ? 'auto':'hidden'
  }

  axiaStyle = {
    fontSize: theme.fontSizeS,
    fontFamily: theme.fontFamily,
    tickStroke: '#ffffff',
    stroke: "#ffffff"
  }

  render() {
    const { 
      type = 'svg', 
      data: initialData = dumpData.map(d => ({...d, date: new Date(d.date)})), 
      width, 
      ratio
    } = this.props 
    
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);
    console.log(displayXAccessor)
    const start = xAccessor(last(data)) + 1;
    const end = xAccessor(data[Math.max(0, data.length - 30)]);
    const xExtents = [start, end];

    return (
      <BlockPageScroll>
      <ChartCanvas 
        height={350}
        width={width}
        ratio={ratio}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >

        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={10} {...this.axiaStyle} />
          <YAxis axisAt="right" orient="right" ticks={5} {...this.axiaStyle}  />
          <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%H:%M")} />
					<MouseCoordinateY at="right" orient="right" displayFormat={d => d.toFixed(5)} />
          <CandlestickSeries {...candlesAppearance}/>
        </Chart> 
        <Chart id={2} origin={(w, h) => [0, h - 100]} height={100} yExtents={d => d.volume}>
          {/* <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/> */}
          <BarSeries yAccessor={d => d.volume} fill={fill} />
        </Chart>
				<CrossHairCursor />
      </ChartCanvas>
      </BlockPageScroll>
    )
  }
}
DrawChart = fitWidth(DrawChart)
export default DrawChart