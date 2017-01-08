import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

import MessageList from '../components/message-list'

import http from '../http'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
})

export default class IssueList extends React.Component {
  state = {}

  componentDidMount = async () => {
    let issues = await (
      await http.get(`/repos/${this.props.route.repo}/${this.props.route.type}s?state=all`)
    ).json()
    /*
     * GitHub api returns pull requests in the issue response. If an issue is a
     * pull request, the object will include a pull_request key.
     */
    if (this.props.route.type === 'issue') {
      issues = issues.filter(issue => !issue.pull_request)
    }
    issues = issues.map(issue => ({
      id: issue.id,
      type: issue.diff_url ? (
        issue.merged_at ? 'MergedPullRequest' : (
          issue.closed_at ? 'ClosedPullRequest' : 'PullRequest'
        )
      ) : (
        issue.closed_at ? 'ClosedIssue' : 'Issue'
      ),
      title: issue.title,
      url: issue.url.substr(22),
      created_at: issue.created_at,
      user: issue.user.login,
    }))
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      dataSource: dataSource.cloneWithRows(issues),
    })
  }
  render() {
    return (<View>
      <ToolbarAndroid style={styles.toolbar} titleColor="#ffffff"
        title={this.props.route.type === 'issue' ? 'Issues' : 'Pull Requests'} />
      { !!this.state.dataSource &&
        <MessageList navigator={this.props.navigator} data={this.state.dataSource} />
      }
    </View>)
  }
}
