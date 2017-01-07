import React from 'react'
import { Alert, AppRegistry, Button, Image, StyleSheet, Text, TextInput, ToolbarAndroid, View, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import http from '../http'
import routes from '../routes'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  list: {
    marginHorizontal: 5,
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  container: {
    marginVertical: 10,
  },
  time: {
    fontSize: 12,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
    marginRight: 10,
  },
  news: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  actor: {
    color: '#1e88e5',
    fontSize: 14,
  },
  repo: {
    color: '#1e88e5',
    fontSize: 14,
  },
  fork: {
    color: '#1e88e5',
    fontSize: 14,
  },
})

const emojiMap = {
  'WatchEvent': '⭐️ ',
  'ForkEvent': '📚 ',
  'CreateEvent': '  ',
  'PublicEvent': '  ',
}

export default class Dashboard extends React.Component {
  state = {}

  componentDidMount = async () => {
    const events = (await (
      await http.get(`/users/${this.props.route.login}/received_events`)
    ).json()).map(event => {
      const base = {
        id: event.id,
        type: event.type,
        actor: { id: event.actor.id, login: event.actor.login },
        repo: { id: event.repo.id, name: event.repo.name },
        created_at: event.created_at,
      }
      if (event.type === 'WatchEvent') {
        base.action = event.payload.action
      } else if (event.type === 'ForkEvent') {
        base.action = 'forked'
        base.fork = {
          id: event.payload.forkee.id,
          name: event.payload.forkee.full_name,
        }
      } else if (event.type === 'PublicEvent') {
        base.action = 'open sourced'
      } else if (event.type === 'CreateEvent') {
        base.action = 'created'
      }
      return base
    })
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      dataSource: dataSource.cloneWithRows(events),
    })
  }

  handleShowProfile = login => {
    this.props.navigator.push(Object.assign({}, routes[5], { login }))
  }

  handleShowRepo = repo => {
    this.props.navigator.push(Object.assign({}, routes[3], { repo }))
  }

  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="Dashboard" titleColor="#ffffff" />
        { !!this.state.dataSource &&
          <ListView style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={event =>
              <View style={styles.list}>
                <Text style={styles.time}>
                  {emojiMap[event.type]}<TimeAgo time={event.created_at} />
                </Text>
                <View style={styles.news}>
                  <Text style={styles.actor}
                    onPress={this.handleShowProfile.bind(this, event.actor.login)}>
                    {event.actor.login}
                  </Text>
                  <Text>{` ${event.action} `}</Text>
                  <Text style={styles.repo}
                    onPress={this.handleShowRepo.bind(this, event.repo.name)}>
                    {event.repo.name}
                  </Text>
                  { event.type === 'ForkEvent' &&
                    <Text> to </Text>
                  }
                  { event.type === 'ForkEvent' &&
                    <Text style={styles.fork}
                      onPress={this.handleShowRepo.bind(this, event.fork.name)}>
                      {event.fork.name}
                    </Text>
                  }
                </View>
              </View>
            }
            renderSeparator={(sectionId, rowId) =>
              <View key={rowId} style={styles.separator} />}
          />
      }
      </View>
    )
  }
}
