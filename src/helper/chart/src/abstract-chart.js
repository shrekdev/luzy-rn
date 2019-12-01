import React, {Component} from 'react'
import {LinearGradient, Line, Text, Defs, Stop} from 'react-native-svg'
import Constant from '../../themeHelper';

class AbstractChart extends Component {
  calcScaler = data => Math.max(...data) - Math.min(...data) || 1;

  renderHorizontalLines = config => {
    const {count, width, height, paddingTop, paddingRight} = config;
    const customPaddingTop = 2;
    return [...new Array(count)].map((_, i) => {
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={(height / 6) * i + customPaddingTop}
          x2={width * 0.88}
          y2={(height / 6) * i + customPaddingTop}
          stroke={i===5 ? Constant.color.gray : '#FFF'}
          strokeWidth={1}
        />
      )
    })
  };

  renderHorizontalLine = config => {
    const {width, height, paddingTop, paddingRight} = config;
    return (
      <Line
        key={Math.random()}
        x1={paddingRight}
        y1={height - height / 6 + paddingTop}
        x2={width}
        y2={height - height / 6 + paddingTop}
        stroke={this.props.chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    )
  };

  renderHorizontalLabels = config => {
    const {
      count,
      data,
      height,
      paddingTop,
      paddingRight,
      yLabelsOffset = 7,
      yLabelUnit
    } = config;
    const paddingTopCustom = 22;
    const decimalPlaces = this.props.chartConfig.decimalPlaces || 2;
    const yAxisLabel = this.props.yAxisLabel || '';

    return [...new Array(count)].map((_, i) => {
      let yLabel;

      if (count === 1) {
        yLabel = `${yAxisLabel}${data[0].toFixed(0)}`
      } else {
        const label = (this.calcScaler(data) / (count - 1)) * i + Math.min(...data);
        yLabel = `${yAxisLabel}${label.toFixed(0)} ${yLabelUnit}`
      }

      return (
        <Text
          key={Math.random()}
          x={paddingRight - yLabelsOffset + 4.5}
          textAnchor="end"
          y={(height * 0.88) - (height / count) * i} // 🧬 Y axis 🧬 0.84,+9
          // y={((height * 3) / 4 - ((height - paddingTopCustom) / count) * i) + 12}
          fontSize={11}
          fill={'#808080'}
        >
          {yLabel}
        </Text>
      )
    })
  };

  // x-axis
  renderVerticalLabels = config => {
    const {
      labels = [],
      width,
      height,
      paddingRight,
      paddingTop,
      horizontalOffset = 0
    } = config;
    const fontSize = 12;
    let adjustmentFactor = 1, adjustLastLabelFactor = 0;
    switch (labels.length) {
      case 5 :
        adjustmentFactor = 1.07;
        break;
      case 4 :
        adjustmentFactor = 1.14;
        break;
    }
    return labels.map((label, i) => {
      if(i === labels.length-1 && label.length > 5) adjustLastLabelFactor -= 7;
      return (
          <Text
              key={Math.random()}
              x={((width - paddingRight) / labels.length) * i * adjustmentFactor + paddingRight + horizontalOffset + adjustLastLabelFactor}
              y={(height * 3) / 4 + paddingTop + fontSize * 2}
              fontSize={fontSize}
              fill={'#808080'}
              textAnchor="middle"
          >
            {label}
          </Text>
      )
    })
  };

  renderVerticalLines = config => {
    const {data, width, height, paddingTop, paddingRight} = config;
    let adjustmentFactor = 1;
    switch (data.length) {
      case 5 :
        adjustmentFactor = 1.07;
        break;
      case 4 :
        adjustmentFactor = 1.14;
        break;
    }
    return [...new Array(data.length)].map((_, i) => {
      return (
          <Line
              key={Math.random()}
              x1={Math.floor(((width - paddingRight) / data.length) * i * adjustmentFactor + paddingRight)}
              y1={0}
              x2={Math.floor(((width - paddingRight) / data.length) * i * adjustmentFactor + paddingRight)}
              y2={height - height / 4 + paddingTop}
              stroke={i === 0 ? Constant.color.gray : '#FFF'}
              strokeWidth={1}
          />
      )
    })
  };

  renderVerticalLine = config => {
    const {height, paddingTop, paddingRight} = config;
    return (
      <Line
        key={Math.random()}
        x1={Math.floor(paddingRight)}
        y1={0}
        x2={Math.floor(paddingRight)}
        y2={height - height / 4 + paddingTop}
        stroke={this.props.chartConfig.color(0.2)}
        strokeDasharray="5, 10"
        strokeWidth={1}
      />
    )
  };

  renderDefs = config => {
    const {width, height, backgroundGradientFrom, backgroundGradientTo} = config;
    return (
      <Defs>
        <LinearGradient
          id="backgroundGradient"
          x1="0"
          y1={height}
          x2={width}
          y2={0}
        >
          <Stop offset="0" stopColor={backgroundGradientFrom} />
          <Stop offset="1" stopColor={backgroundGradientTo} />
        </LinearGradient>
        <LinearGradient
          id="fillShadowGradient"
          x1={0}
          y1={0}
          x2={0}
          y2={height}
        >
          <Stop
            offset="0"
            stopColor={this.props.chartConfig.color()}
            stopOpacity="0.1"
          />
          <Stop
            offset="1"
            stopColor={this.props.chartConfig.color()}
            stopOpacity="0"
          />
        </LinearGradient>
      </Defs>
    )
  }
}

export default AbstractChart
