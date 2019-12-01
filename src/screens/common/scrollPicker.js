import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import Constant, { normalize } from '../../helper/themeHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/responsiveScreen';

class ScrollPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 1,
    }
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
  }
  componentDidMount() {
    if (this.props.selectedIndex) {
      this.scrollToIndex(this.props.selectedIndex);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { header, footer } = this.renderPlaceHolder();
    return (
      <View style={this.props.containerStyle}>
        <View style={this.props.sepratorStyle} />
        <ScrollView
          ref={(sview) => {
            this.sview = sview;
          }}
          {...this.props.panResponder}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onTouchStart={this.props.onTouchStart}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {header}
          {this.props.dataSource.map(this.renderItem.bind(this))}
          {footer}
        </ScrollView>
      </View>
    );
  }

  renderPlaceHolder() {
    const height = (this.props.wrapperHeight - this.props.itemHeight) / 2;
    const header = <View style={{ height, flex: 1 }}/>;
    const footer = <View style={{ height, flex: 1 }}/>;
    return { header, footer };
  }

  renderItem(data, index) {
    const isSelected = index === this.state.selectedIndex;
    const item = <Text style={[this.props.textStyle, { color: isSelected ? Constant.color.blue : '#e9eef4' }]}>{data}</Text>;

    return (
      <View  key={index} style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('7%'),
    }}>
        {item}
      </View>
    );
  }

  scrollFix(e) {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      if (this.sview) {
        this.sview.scrollTo({ y: verticalElem });
      }
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex,
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }

  onScrollBeginDrag() {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onScrollEndDrag(e) {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      () => {
        if (!this.momentumStarted && !this.dragStarted) {
          this.scrollFix(element, 'timeout');
        }
      },
      10,
    );
  }

  onMomentumScrollBegin() {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onMomentumScrollEnd(e) {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  }

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind,
    });
    const y = this.props.itemHeight * ind;
    setTimeout(() => {
      if (this.sview) {
        this.sview.scrollTo({ y });
      }
    }, 0);
  }
}

const styles = StyleSheet.create({
  
});

export { ScrollPicker }