import React, {Component} from 'react'
import {LinearGradient, Line, Text, Defs, Stop, Image, Svg, Rect} from 'react-native-svg'
import Constant from '../../themeHelper'

class AbstractBarChart extends Component {
    // calcScaler = data => Math.max(...data) - Math.min(...data) || 1;
    calcScaler = data => 100 || 1;

    renderHorizontalLines = config => {
        const {count, width, height, paddingTop, paddingRight} = config;
        let customPaddingTop = -10;

        return [...new Array(count)].map((_, i) => {
            switch (i) {
                case 0 :
                    customPaddingTop = 16;
                    break;
                case 1 :
                    customPaddingTop = 12;
                    break;
                case 2 :
                    customPaddingTop = 8;
                    break;
                case 3 :
                    customPaddingTop = 4;
                    break;
                case 4 :
                    customPaddingTop = 0;
                    break;
                case 5 :
                    customPaddingTop = -2;
                    break;
            }
            return (
                <Line
                    key={Math.random()}
                    // x1={paddingRight}
                    x1={64}
                    y1={(height / 6) * i + customPaddingTop}
                    x2={width}
                    y2={(height / 6) * i + customPaddingTop}
                    stroke={Constant.color.darkBlue}
                    strokeWidth={1.5}
                />
            )
        })
    };

    // renderHorizontalLine = config => {
    //     const {width, height, paddingTop, paddingRight} = config;
    //     return (
    //         <Line
    //             key={Math.random()}
    //             x1={paddingRight}
    //             y1={height - height / 4 + paddingTop}
    //             x2={width}
    //             y2={height - height / 4 + paddingTop}
    //             stroke={this.props.chartConfig.color(0.2)}
    //             strokeDasharray="5, 10"
    //             strokeWidth={1}
    //         />
    //     )
    // };

    renderHorizontalLabels = config => {
        const {
            count,
            data,
            height,
            paddingTop,
            paddingRight,
            yLabelsOffset = 12
        } = config;
        const decimalPlaces = 0;
        const yAxisLabel = this.props.yAxisLabel || '';

        return [...new Array(count)].map((_, i) => {
            let yLabel;

            if (count === 1) {
                yLabel = `${yAxisLabel}${data[0].toFixed(decimalPlaces)}%`
            } else {
                // const label = (this.calcScaler(data) / (count - 1)) * i + Math.min(...data);
                const label = (this.calcScaler(data) / (count - 1)) * i;
                yLabel = `${yAxisLabel}${label.toFixed(decimalPlaces)}%`
            }

            return (
                <Text
                    key={Math.random()}
                    x={paddingRight - yLabelsOffset}
                    textAnchor="end"
                    y={(height * 3) / 4 - ((height - paddingTop) / count) * i + 20}
                    // y={(height * 0.88) - (height / count) * i}
                    fontSize={12}
                    fontWeight={'bold'}
                    fill={'#fff'}
                >
                    {yLabel}
                </Text>
            )
        })
    };

    renderVerticalLabels = config => {
        const {
            labels = [],
            width,
            height,
            paddingRight,
            paddingTop,
            horizontalOffset = 0,
            stackedBar = false,
            barTopCounts
        } = config;
        const fontSize = 11;
        let fac = 1;
        if (stackedBar) {
            fac = 0.71
        }

        return labels.map((label, i) => {
            return (
                (i === barTopCounts) &&
                    <Svg key={Math.random()} width={'100%'} height={'100%'}>
                        <Image
                            x={(((width - paddingRight) / labels.length) * i + paddingRight + 10) * fac}
                            y={(height * 3) / 4 + paddingTop + 5}
                            width={Constant.isIOS ? '10%' : '9%'}
                            height={'10%'}
                            preserveAspectRatio="xMidYMid slice"
                            href={'pedometer_current_day_icon'}
                        />
                        <Text
                            x={(((width - paddingRight) / labels.length) * i + (62) + horizontalOffset) * fac}
                            y={(height * 3) / 4 + paddingTop + fontSize * 2}
                            fontSize={fontSize}
                            fontWeight={'bold'}
                            fill={'#054993'}
                            textAnchor="middle"
                        >
                            {label}
                        </Text>
                    </Svg>
                ||
                <Text
                    key={Math.random()}
                    x={(((width - paddingRight) / labels.length) * i + paddingRight + horizontalOffset) * fac}
                    y={(height * 3) / 4 + paddingTop + fontSize * 2}
                    fontSize={fontSize}
                    fontWeight={'bold'}
                    fill={'#fff'}
                    textAnchor="middle"
                >
                    {label}
                </Text>
            )
        })
    };

    // renderVerticalLines = config => {
    //     const {data, width, height, paddingTop, paddingRight} = config;
    //     return [...new Array(data.length)].map((_, i) => {
    //         return (
    //             <Line
    //                 key={Math.random()}
    //                 x1={Math.floor(
    //                     ((width - paddingRight) / data.length) * i + paddingRight
    //                 )}
    //                 y1={0}
    //                 x2={Math.floor(
    //                     ((width - paddingRight) / data.length) * i + paddingRight
    //                 )}
    //                 y2={height - height / 4 + paddingTop}
    //                 stroke={this.props.chartConfig.color(0.2)}
    //                 strokeDasharray="5, 10"
    //                 strokeWidth={1}
    //             />
    //         )
    //     })
    // };
    //
    // renderVerticalLine = config => {
    //     const {height, paddingTop, paddingRight} = config;
    //     return (
    //         <Line
    //             key={Math.random()}
    //             x1={Math.floor(paddingRight)}
    //             y1={0}
    //             x2={Math.floor(paddingRight)}
    //             y2={height - height / 4 + paddingTop}
    //             stroke={this.props.chartConfig.color(0.2)}
    //             strokeDasharray="5, 10"
    //             strokeWidth={1}
    //         />
    //     )
    // };

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
                        stopColor={this.props.chartConfig.barGradientFrom}
                        stopOpacity="1"
                    />
                    <Stop
                        offset="1"
                        stopColor={this.props.chartConfig.barGradientTo}
                        stopOpacity="1"
                    />
                </LinearGradient>
            </Defs>
        )
    }
}

export default AbstractBarChart