import React from 'react'
import {View} from 'react-native'
import {Svg, Rect, G} from 'react-native-svg'
import AbstractBarChart from './abstract-bargraph'

const barWidth = 32;

class BarChart extends AbstractBarChart {
  renderBars = config => {
    const {data, width, height, paddingTop, paddingRight} = config;
    return data.map((x, i) => {
      // const barHeight = (height / 4) * 3 * ((x - Math.min(...data)) / this.calcScaler(data));
      const barHeight = (height / 4) * 3 * (x / this.calcScaler(data));
      // const barWidth = 32;
      const paddingRightCustom = 70;
      return (
        <Rect
          key={Math.random()}
          // x={paddingRight + (i * (width - paddingRight)) / data.length + barWidth / 2}
          x={paddingRight + (i * (width - paddingRightCustom)) / 7 + barWidth / 2}
          y={(height / 4) * 3 - barHeight + paddingTop}
          width={barWidth}
          height={barHeight}
          fill="url(#fillShadowGradient)"
        />
      )
    })
  };

  renderBarTops = config => {
    const {data, width, height, paddingTop, paddingRight, barTopCounts} = config;
    const paddingRightCustom = 70;
    let dataCopy = data.slice(0); //to clone data
    dataCopy.splice(barTopCounts);
    return dataCopy.map((x, i) => {
      const barHeight =
        // (height / 4) * 3 * ((x - Math.min(...data)) / this.calcScaler(data));
        (height / 4) * 3 * (x / this.calcScaler(dataCopy));
      return (
        <Rect
          key={Math.random()}
          // x={paddingRight + (i * (width - paddingRight)) / data.length + barWidth / 2}
          x={paddingRight + (i * (width - paddingRightCustom)) / 7 + barWidth / 2}
          y={(height / 4) * 3 - barHeight + paddingTop}
          width={barWidth}
          height={2}
          fill={'#fff'}
        />
      )
    })
  };

  render() {
    const paddingTop = 16;
    const paddingRight = 64;
    const {width, height, data, style = {}, barTopCounts = 7} = this.props;
    const {borderRadius = 0} = style;
    const config = {
      width,
      height,
    };
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines({
              ...config,
              // count: 4,
              count: 6,
              paddingTop
            })}
          </G>
          <G>
            {this.renderHorizontalLabels({
              ...config,
              // count: 4,
              count: 6,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <G>
            {this.renderVerticalLabels({
              ...config,
              labels: data.labels,
              paddingRight,
              paddingTop,
              horizontalOffset: barWidth,
              barTopCounts
            })}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <G>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight,
              barTopCounts
            })}
          </G>
        </Svg>
      </View>
    )
  }
}

export default BarChart
