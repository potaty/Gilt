import React from 'react'
import { Image, ScrollView, StyleSheet, ToolbarAndroid, TouchableHighlight, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

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
    fontSize: 12,
  },
  red: {
    color: '#d50000',
    fontSize: 12,
  },
  codeContainer: {
  },
  hunkContainer: {
    backgroundColor: '#f3f3ff',
  },
  additionContainer: {
    backgroundColor: '#eaffea',
  },
  deletionContainer: {
    backgroundColor: '#ffecec',
  },
  normalContainer: {
  },
  code: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
})

// 提交文件渲染。
export default class CommitFile extends React.Component {
  renderLine = (line, index) => {
    if (line.startsWith('@@')) {
      return (
        <View key={index} style={styles.hunkContainer}>
          <Text style={styles.code}>{line}</Text>
        </View>
      )
    }
    if (line.startsWith('+')) {
      return (
        <View s key={index} style={styles.additionContainer}>
          <Text style={styles.code}>{line}</Text>
        </View>
      )
    }
    if (line.startsWith('-')) {
      return (
        <View key={index} style={styles.deletionContainer}>
          <Text style={styles.code}>{line}</Text>
        </View>
      )
    }
    return (
      <View key={index} style={styles.normalContainer}>
        <Text style={styles.code}>{line}</Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filenameContainer}>
          <Text style={styles.green}>{this.props.file.additions}+ </Text>
          <Text style={styles.red}>{this.props.file.deletions}- </Text>
          <Text style={styles.filenameText}>{this.props.file.filename}</Text>
        </View>
        <ScrollView horizontal style={styles.codeContainer}>
          <View>
            { this.props.file.patch.split("\n").map(this.renderLine) }
          </View>
        </ScrollView>
      </View>)
  }
}
