import React from 'react'
import { Image, StyleSheet, Text, ToolbarAndroid, View, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import CommitList from '../components/commit-list'

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
  },
  head: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
})

export default class Dashboard extends React.Component {
  state = {}
  componentDidMount = async () => {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.setState({
      dataSource: dataSource.cloneWithRows([['potaty', 'two hours ago', 'please fix this chibug please'],
                                          ['obama', 'one day ago', 'please fix this chibug please'],
                                          ['trump', 'two days ago', 'please fix this chibug please']])
    })
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="potaty/Gilt" titleColor="#ffffff" />
        <Text style={styles.repoTitle}>
          {'Jan 08, 2017'}
        </Text>
        <CommitList dataSource={this.state.dataSource}/>
        <Text style={styles.repoTitle}>
          {'Jan 08, 2017'}
        </Text>
        <CommitList dataSource={this.state.dataSource}/>
      </View>
    )
  }
}
