import React from 'react'
import { Button, StyleSheet, TouchableHighlight, ToolbarAndroid, Text, View, ListView, WebView } from 'react-native'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    margin: 10,
  },
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  button: {
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth
  },
  container: {
    flex: 1,
  },
  owner: {
    color: '#aaaaaa',
    marginLeft: 10,
  },
  ownerContainer: {
    flexDirection: 'row',
  },
  optionContainer: {
    marginTop: 30,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#111111',
    marginLeft: 50,
    marginRight: 20,
  },
  list: {
    height: 40,
    marginLeft: 12,
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  readme: {
    flex: 1,
    margin: 20,
  },
  fileName: {
    fontSize: 13,
    color: '#555'
  },
})

export default class Repository extends React.Component {
  state = {}

  componentDidMount() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: dataSource.cloneWithRows(['🍴    Forks', '🐣    Releases', '🍒    Recent Activity', '🐷    Contributors', '⭐    Stargazers']),
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title="pintia / core" titleColor="#ffffff" />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="⭐ Star (10)" color="#666" style={styles.button}
             onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button title="⌚️ Watch" color="#666" style={styles.button}
              onPress={() => {}} />
          </View>
        </View>
        <View style={styles.ownerContainer}>
          <Text style={styles.owner}> owner: </Text>
          <TouchableHighlight onPress={this._onPressButton}>
            <Text> pintia </Text>
          </TouchableHighlight>
        </View>
        { !!this.state.dataSource && <View style={styles.optionContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.list}><Text>{rowData}</Text><Text> {'>'} </Text></View>}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
          </View>
        }
        <View style={styles.readme}>
          <Text style={styles.fileName}>README.md</Text>
          <WebView source={{ html: '<h1>HHHH</h1>' }} />
        </View>
      </View>
    )
  }
}
