import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

import MessageList from '../components/message-list'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  list: {
    marginLeft: 12,
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
    marginRight: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
    marginLeft: 50,
    marginRight: 20,
  },
  detail: {
    flexDirection: 'row',
  },
  repo: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  description: {
    fontSize: 15,
    fontWeight: 'bold',
  }
})

export default class Notification extends React.Component {
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
      <ToolbarAndroid style={styles.toolbar} title={"Notification"} titleColor="#ffffff" />
      { !!this.state.dataSource && <View>
        <MessageList data={this.state.dataSource} title={"poooi/poi"}/>
        </View>
      }
      { !!this.state.dataSource && <View>
        <MessageList data={this.state.dataSource} title={"potaty/memeda"}/>
        </View>
      }
    </View>
    )
  }
}
