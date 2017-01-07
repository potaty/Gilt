import React from 'react'
import { Alert, AppRegistry, Button, Image, StyleSheet, Text, TextInput, ToolbarAndroid, View, ListView } from 'react-native'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  list: {
    marginLeft: 12,
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  optionContainer: {
    marginTop: 30,
  },
  time: {
    height: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#111111',
    marginLeft: 20,
    marginRight: 20,
  },
  news: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  from: {
    color: '#1e88e5',
    marginRight: 5,
  },
  to: {
    color: '#1e88e5',
    marginHorizontal: 5,
  },
  forkto: {
    color: '#1e88e5',
  },
})

export default class Dashboard extends React.Component {
  state = {}

  componentDidMount() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: dataSource.cloneWithRows([[' ⭐️ ', '1 hour ago', 'born2net', 'starred', 'bosi/sajdiasjiduch'],
                                            [' 📚 ', '11 hours ago', 'Senorsen', 'forked', 'xuchaoying/Blog', 'Senoasdarsen/Blog'],
                                            [' ⭐️ ', '1 day ago', 'magicae', 'starred', 'chiba/eating'],
                                            [' ⭐️ ', '1 day ago', 'magicae', 'starred', 'chiba/chibing'],
                                            [' ⭐️ ', '1 day ago', 'magicae', 'starred', 'dachiba/chibating'],
                                            [' ⭐️ ', '1 day ago', 'magicae', 'starred', 'chiba/chuanlu'],
                                            [' ⭐️ ', '1 day ago', 'magicae', 'starred', 'chiba/shuaishouji'],
                                          ]),
    })
  }

  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="Dashboard" titleColor="#ffffff" />
        { !!this.state.dataSource && <View style={styles.optionContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) =>
                <View style={styles.list}>
                  <Text style={styles.time}>{rowData[0] + rowData[1]}</Text>
                  <View style={styles.news}>
                    <Text style={styles.from}>{rowData[2]}</Text>
                    <Text>{rowData[3]}</Text>
                    <Text style={styles.to}>{rowData[4]}</Text>
                    { rowData.length > 5 &&<Text>{'to'}</Text> }
                    { rowData.length > 5 &&<Text style={styles.forkto}>{rowData[5]}</Text> }
                  </View>
                </View>
              }
              renderSeparator={(sectionId, rowId) =>
                <View key={rowId} style={styles.separator} />}
            />
          </View>
        }
      </View>
    )
  }
}
