
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const { width, height } = Dimensions.get('window');

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
    marginBottom : 20,
    alignSelf: 'center',
    width: width/2.4,
    height: height/24
  },
  submitBtnText: {
    fontSize: 13,
    textAlign: 'center',
    marginLeft: 40,
  }
}