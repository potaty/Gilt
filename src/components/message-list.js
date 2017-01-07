import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

const styles = StyleSheet.create({
  repo: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  repoName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  repoDescription: {
  },
  time: {
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
  state = {dataSource: this.props.data}
  render() {
    return (<View style={styles.optionContainer}>
        {!!this.props.title && <Text style={styles.repoTitle}>
           {this.props.title}
         </Text>
        }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={styles.list}>
            <Text style={styles.time}>{rowData[0]}</Text>
            <View style={styles.detail}>
              <Text style={styles.repoName}>{rowData[1]}</Text>
            </View>
            <Text style={styles.repoDescription}>{rowData[2]}</Text>
          </View>}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>)
  }
}
