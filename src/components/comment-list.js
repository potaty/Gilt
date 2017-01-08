import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Image, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Markdown from 'react-native-simple-markdown'

import http from '../http'

const styles = StyleSheet.create({
  message: {
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  author: {
    fontWeight: 'bold',
  },
  line: {
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
  row: {
    flexDirection: 'row',
    marginLeft: 3,
  },
  comment: {
    margin: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
  },
})

// 评论列表组件。
export default class CommentList extends React.Component {
  state = {}

  componentDidMount() {
    this.update()
  }

  update = async () => {
    const comments = await (
      await http.get(this.props.api)
    ).json()
    console.log(comments)
    if (comments.length === 0) { return }
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      dataSource: dataSource.cloneWithRows(comments),
    })
  }

  render() {
    if (!this.state.dataSource) {
      return <View />
    }
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={comment =>
          <View style={styles.container}>
            <View style={styles.row}>
              <Image source={{ uri: comment.user.avatar_url }} style={styles.head} />
              <View style={styles.message}>
                <Text style={styles.author}>{comment.user.login}</Text>
                <View style={styles.line}>
                  <Text style={styles.time}>Commented </Text>
                  <TimeAgo style={styles.time} time={comment.created_at} />
                </View>
              </View>
            </View>
            <View style={styles.comment}>
              <Markdown>{comment.body}</Markdown>
            </View>
          </View>
        } />
    )
  }
}
