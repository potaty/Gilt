import React from 'react'
import { Image, StyleSheet, Text, ToolbarAndroid, View, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import CommitList from '../components/commit-list'

import http from '../http'

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

// 项目 commits 列表。
export default class Commits extends React.Component {
  state = {}
  componentDidMount = async () => {
    const commits = await (
      await http.get(this.props.route.api)
    ).json()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      dataSource: dataSource.cloneWithRows(commits)
    })
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="Commits" titleColor="#ffffff" />
        {!!this.state.dataSource &&
          <CommitList dataSource={this.state.dataSource} api={this.props.route.api}
          navigator={this.props.navigator} />}
      </View>
    )
  }
}
