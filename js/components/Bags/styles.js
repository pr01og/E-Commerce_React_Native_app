
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
 container: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    height: null,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  title: {
    fontWeight: 'bold',
  },

  image: {
    width,
    flex: 1
  },

  thumbStyle: {
    flex: 1,
    alignItems: "center",
  },
});