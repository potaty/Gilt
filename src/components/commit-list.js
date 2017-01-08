import React from 'react'
import { Image, StyleSheet, ToolbarAndroid, TouchableHighlight, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import routes from '../routes'

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
  head: {
    margin: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
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

// 提交列表组件。
export default class CommitList extends React.Component {
  handleShowCommit = sha => {
    this.props.navigator.push(Object.assign({}, routes[10], {
      api: `${this.props.api}/${sha}`,
    }))
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.props.dataSource}
          renderRow={commit =>
            <View style={styles.row}>
              <Image style={styles.head} source={{ uri: commit.author.avatar_url }} />
              <View style={styles.list}>
                <TouchableHighlight underlayColor="#e0e0e0"
                  onPress={this.handleShowCommit.bind(this, commit.sha)}>
                  <Text style={styles.title}>{ commit.commit.message.split("\n")[0] }</Text>
                </TouchableHighlight>
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>
                    { commit.committer ? commit.committer.login : commit.commit.author } committed{' '}
                  </Text>
                  <TimeAgo style={styles.time} time={commit.commit.committer.date} />
                </View>
              </View>
            </View>
          }
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={styles.separator} />
          )}
        />
      </View>
    )
  }
}
