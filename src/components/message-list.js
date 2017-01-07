import React from 'react'
import { Image, StyleSheet, ToolbarAndroid, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import closedIssueIcon from '../images/checked.png'
import issueIcon from '../images/warning.png'
import mergedPullRequestIcon from '../images/merge.png'
import closedPullRequestIcon from '../images/closed-pull-request.png'
import pullRequestIcon from '../images/pull-request.png'

const styles = StyleSheet.create({
  repo: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },
  detail: {
    flexDirection: 'row',
  },
  repoTitle: {
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    height: 30,
    alignItems: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  icon: {
    margin: 15,
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 12,
  }
})

export default class MessageList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        { !!this.props.title &&
          <Text style={styles.repoTitle}>
            {this.props.title}
          </Text>
        }
        <ListView dataSource={this.props.data}
          renderRow={message =>
            <View style={styles.row}>
              { message.type === 'ClosedIssue' &&
                <Image style={styles.icon} source={closedIssueIcon} /> }
              { message.type === 'Issue' &&
                <Image style={styles.icon} source={issueIcon} /> }
              { message.type === 'PullRequest' &&
                <Image style={styles.icon} source={pullRequestIcon} /> }
              { message.type === 'ClosedPullRequest' &&
                <Image style={styles.icon} source={closedPullRequestIcon} /> }
              { message.type === 'MergedPullRequest' &&
                <Image style={styles.icon} source={mergedPullRequestIcon} /> }
              <View key={message.id} style={styles.list}>
                <Text style={styles.title}>
                  { message.title }
                </Text>
                <View style={styles.timeContainer}>
                  { message.user && <Text style={styles.time}>
                    Open by {message.user + ' '}
                  </Text> }
                  <TimeAgo style={styles.time} time={message.updated_at || message.created_at} />
                </View>
              </View>
            </View>
          }
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={styles.separator} />
          )}
        />
      </View>)
  }
}
