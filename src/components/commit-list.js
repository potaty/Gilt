import React from 'react'
import { Image, StyleSheet, ToolbarAndroid, TouchableHighlight, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import routes from '../routes'

import closedIssueIcon from '../images/checked.png'
import issueIcon from '../images/warning.png'
import mergedPullRequestIcon from '../images/merge.png'
import closedPullRequestIcon from '../images/closed-pull-request.png'
import pullRequestIcon from '../images/pull-request.png'
import Qingzhen from '../images/qingzhen.png'

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

export default class CommitList extends React.Component {
  handleClickLink = message => {
    this.props.navigator.push(Object.assign({}, routes[8], {
      api: message.url,
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        { !!this.props.title &&
          <Text style={styles.repoTitle}>
            {this.props.title}
          </Text>
        }
        { !!this.props.dataSource && <ListView dataSource={this.props.dataSource}
            renderRow={ message =>
              <View style={styles.row}>
                <Image style={styles.head} source={Qingzhen} />
                <View style={styles.list}>
                  <Text style={styles.title}>{ message[1] }</Text>
                  <View style={styles.timeContainer}>
                    { message[0] && <Text style={styles.time}>
                      Open by {message[0]+ ' '}
                      </Text>
                    }
                    <TimeAgo style={styles.time} time={message[1] || message[1]} />
                  </View>
                </View>
              </View>
            }
            renderSeparator={(sectionId, rowId) => (
              <View key={rowId} style={styles.separator} />
            )}
          />
        }
      </View>)
  }
}
