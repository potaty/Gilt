import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

const styles = StyleSheet.create({
  repo: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  repoName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {

  },
  list: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
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
})

export default class MessageList extends React.Component {
  render() {
    console.log(this.props.data)
    return (
      <View style={styles.container}>
        { !!this.props.title &&
          <Text style={styles.repoTitle}>
            {this.props.title}
          </Text>
        }
        <ListView dataSource={this.props.data}
          renderRow={message =>
            <View key={message.id} style={styles.list}>
              <TimeAgo time={message.updated_at} />
              <View style={styles.detail}>
                <Text style={styles.repoName}>
                  { message.title }
                </Text>
              </View>
            </View>}
          renderSeparator={(sectionId, rowId) => (
            <View key={rowId} style={styles.separator} />
          )}
        />
      </View>)
  }
}
