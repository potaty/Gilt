import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

const styles = StyleSheet.create({
  optionContainer: {
    marginTop: 5,
  },
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
      dataSource: dataSource.cloneWithRows([['💬 2 hours ago', 'poooi/poi', 'Add a new issue.', 'please fix this chibug please'],
                                            ['🙋 2 hours ago', 'poooi/poi', 'Can not open this part.', 'please fix this chibug please'],
                                            ['🙋 2 hours ago', 'poooi/poi', 'Please close the mouse', 'please fix this chibug please']]),
    })
  }
  render() {
    return (<View>
      <ToolbarAndroid style={styles.toolbar} title={"Notification"} titleColor="#ffffff" />
      { !!this.state.dataSource && <View style={styles.optionContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={styles.list}>
              <Text>{rowData[0]}</Text>
              <View style={styles.detail}>
                <Text style={styles.repo}>{rowData[1]}</Text>
                <Text style={styles.description}>{rowData[2]}</Text>
              </View>
              <Text>{rowData[3]}</Text>
            </View>}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
        </View>
      }
    </View>
    )
  }
}
