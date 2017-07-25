
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const { width, height } = Dimensions.get('window');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default {
  title: {
    fontWeight: 'bold',
    width,
  },
  qty_icon: {
    fontWeight: 'bold',
  },
  qty_section: {
    flexDirection: "row",
    width: 40,
    marginBottom: 30,
    marginTop: 3,
    alignSelf: 'center',
    marginLeft: -50,
  },
  qty_section_item: {
    width: 30,
    fontSize: 35,
  },
  inputBrdr: {
    borderWidth: 1,
    width: width/1.2,
    height: height/18,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },
  inputTextArea: {
    borderWidth: 1,
    width: width/1.2,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },
  submitBtn: {
    marginBottom : 60,
    alignSelf: 'center',
    width: responsiveWidth(50),
    height: responsiveHeight(6),
    backgroundColor: '#444'
  },

  submitBtnText: {
    fontSize: responsiveFontSize(2.2),
    flex: 1,
    textAlign: 'center',
  
  }
}