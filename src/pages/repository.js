import React from 'react'
import { Button, StyleSheet, TouchableHighlight, ToolbarAndroid, Text, View, ListView, WebView } from 'react-native'

import http from '../http'
import routes from '../routes'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  buttonWrapper: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    borderWidth: StyleSheet.hairlineWidth
  },
  container: {
    flex: 1,
  },
  optionContainer: {
    marginTop: 5,
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
  readmeLink: {
    fontSize: 15,
    marginBottom: 5,
  },
  fileName: {
    fontSize: 13,
    color: '#555'
  },
})

export default class Repository extends React.Component {
  state = { readme: '' }

  async componentDidMount() {
    const title = this.props.route.title
    const star = await http.get(`/user/starred/${title}`)
    const watch = await (await http.get(`/repos/${title}/subscription`)).json()
    const repo = await (await http.get(`/repos/${title}`)).json()
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.setState({
      starred: star.status === 204,
      watched: watch.subscribed,
      repo: repo,
      dataSource: dataSource.cloneWithRows([
        `⭐    Stargazers (${repo.stargazers_count})`,
        `⭐    Watchers (${repo.subscribers_count})`,
        `🍴    Forks (${repo.forks_count})`,
        '🐣    Releases',
        '🐷    Contributors',
      ]),
    })
    const readme = await (await http.get(`/repos/${title}/readme`, 'application/vnd.github.VERSION.html')).text()
    this.setState({
      readme: readme,
    })
  }

  handleShowReadme = () => {
    this.props.navigator.push(Object.assign(routes[4], {title: this.props.route.title}))
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title={this.props.route.title} titleColor="#ffffff" />
        { !!this.state.repo && <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              { !this.state.starred && <Button title={`    ⭐ Star    `} color="#666" style={styles.button}
                onPress={() => {}} /> }
              { this.state.starred && <Button title={`    ⭐ Unstar    `} color="#666" style={styles.button}
                onPress={() => {}} /> }
            </View>
            <View style={styles.buttonWrapper}>
              { !this.state.watched && <Button title={`    ⌚️ Watch   `} color="#666" style={styles.button}
                onPress={() => {}} /> }
              { this.state.watched && <Button title={`    ⌚️ Unwatch   `} color="#666" style={styles.button}
                onPress={() => {}} /> }
            </View>
          </View>
        }
        { !!this.state.dataSource && <View style={styles.optionContainer}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.list}><Text>{rowData}</Text><Text> {'>'} </Text></View>}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
          </View>
        }
        { !!this.state.readme && <View style={styles.readme}>
          <Text style={styles.readmeLink} onPress={this.handleShowReadme}>README</Text>
          <WebView source={{ html: this.state.readme }} />
        </View> }
      </View>
    )
  }
}
