const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const { width } = Dimensions.get('window');

export default{
  mb10: {
    marginBottom: 10,
  },
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

  image: {
    width,
    flex: 1
  },

  thumbStyle: {
    flex: 1,
    alignItems: "center",
  },
  
  thumb: {
    marginTop: 60,
    width: width/2,
    height: 100
  },

  side_image: {
    width: width/2, height: 320
  },

  button_style:{
    padding:10,
    height:40,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: '#2196F3'
  },

  button_text: {
    fontSize: 15, color: 'white'
  }
};
