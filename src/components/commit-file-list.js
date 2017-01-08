import React from 'react'
import { Image, StyleSheet, ToolbarAndroid, TouchableHighlight, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Qingzhen from '../images/qingzhen.png'

const styles = StyleSheet.create({
  time: {
    fontSize: 12,
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 12,
    lineHeight: 18,
  },
  head: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  title: {
    backgroundColor: '#d1e2eb',
    padding: 10,
    color: '#213f4d',
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  head: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  author: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  filenameContainer: {
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
  },
  filenameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  green: {
    color: '#00c853',
    fontWeight: 'bold',
  },
  red: {
    color: '#d50000',
    fontWeight: 'bold',
  },
  code: {
    fontSize: 15,
  },
  codeContainer: {
    padding: 10,
  }
})

export default class CommitFileList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filenameContainer}>
          <Text style={styles.green}>+</Text>
          <Text style={styles.red}>- </Text>
          <Text style={styles.filenameText}>{'src/pages/dashboard.js'}</Text>
        </View>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>hahahahhahahhahahahhahahahah</Text>
        </View>
      </View>)
  }
}
