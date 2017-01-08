import React from 'react'
import { Image, StyleSheet, Text, ToolbarAndroid, View, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import CommitFileList from '../components/commit-file-list'

import Qingzhen from '../images/qingzhen.png'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  repoTitle: {
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    height: 30,
    alignItems: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
  },
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
})

export default class CommitDetail extends React.Component {
  state = {}
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="Issue Detail" titleColor="#ffffff" />
        <Text style={styles.title}>use emoji</Text>
        <View style={styles.authorContainer}>
          <Image style={styles.head}source={Qingzhen}/>
          <Text style={styles.author}>potaty</Text>
          <Text style={styles.time}>commit about two hours ago</Text>
        </View>
        <CommitFileList />
      </View>
    )
  }
}
