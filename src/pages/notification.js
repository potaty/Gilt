import React from 'react'
import { ListView, StyleSheet, ToolbarAndroid, View } from 'react-native'

import MessageList from '../components/message-list'

import http from '../http'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
})

/*
 * 通知页面。
 */
export default class Notification extends React.Component {
  state = {}

  componentDidMount = async () => {
    const raw = await (
      await http.get('/notifications')
    ).json()
    const notifications = []
    const titles = []
    const map = {}
    for (const record of raw) {
      const repo = record.repository.full_name
      if (!map[repo]) {
        notifications.push(map[repo] = [])
        titles.push(repo)
      }
      map[repo].push({
        id: record.id,
        type: record.subject.type,
        title: record.subject.title,
        url: record.subject.url.substr(22),
        updated_at: record.updated_at,
      })
    }
    this.setState({
      dataSources: notifications.map((group, idx) => {
        const dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(group)
        dataSource.title = titles[idx]
        return dataSource
      }),
    })
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title="Notification" titleColor="#ffffff" />
        { !!this.state.dataSources && this.state.dataSources.map(group => (
            <MessageList key={group.title} navigator={this.props.navigator}
              data={group} title={group.title} />
        )) }
      </View>
    )
  }
}
