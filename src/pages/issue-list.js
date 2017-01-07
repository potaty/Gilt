import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

import MessageList from '../components/message-list'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
})

export default class IssueList extends React.Component {
  state = {}

  componentDidMount() {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.setState({
      dataSource: dataSource.cloneWithRows([['2 hours ago', '💬 Add a new issue.', 'please fix this chibug please'],
                                            ['2 hours ago', '🙋 Can not open this part.', 'please fix this chibug please'],
                                            ['2 hours ago', '💬 Please close the mouse', 'please fix this chibug please']]),
    })
  }
  render() {
    return (<View>
      <ToolbarAndroid style={styles.toolbar} title={"Issue List"} titleColor="#ffffff" />
      { !!this.state.dataSource && <MessageList data={this.state.dataSource}></MessageList> }
    </View>)
  }
}
