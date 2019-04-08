import React, { Component, useRef, useEffect } from 'react'
import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import dumpData from './dumpData'

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

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];
    return (
      <BlockPageScroll>
      <ChartCanvas 
        height={400}
        ratio={ratio}
        width={width}
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
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="right" orient="right" ticks={5} />
          <CandlestickSeries />
        </Chart>
        <Chart id={2} yExtents={d => d.volume}>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
          <BarSeries yAccessor={d => d.volume} />
        </Chart>
      </ChartCanvas>
      </BlockPageScroll>
    )
  }
}
DrawChart = fitWidth(DrawChart)
export default DrawChart