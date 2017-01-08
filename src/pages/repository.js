import React from 'react'
import { Button, StyleSheet, TouchableHighlight, ToolbarAndroid, Text, View, ListView, WebView } from 'react-native'

import http from '../http'
import routes from '../routes'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    margin: 5,
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#111111',
    marginLeft: 50,
    marginRight: 20,
  },
  list: {
    marginLeft: 12,
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  readme: {
    flex: 1,
    margin: 10,
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

  componentDidMount = async () => {
    const repo = this.props.route.repo
    const star = await http.get(`/user/starred/${repo}`)
    const watch = await (await http.get(`/repos/${repo}/subscription`)).json()
    const data = await (await http.get(`/repos/${repo}`)).json()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({
      starred: star.status === 204,
      watched: watch.subscribed,
      repo: data,
      dataSource: dataSource.cloneWithRows([{
        text: `⭐    Stargazers (${data.stargazers_count})`,
        onClick: this.handleShowStargazers,
      }, {
        text: `⌚️    Watchers (${data.subscribers_count})`,
        onClick: this.handleShowWatchers,
      }, {
        text: `⭐    Commits`,
        onClick: this.handleShowCommits,
      }, {
        text: `🍴    Issues`,
        onClick: this.handleShowIssues,
      }, {
        text: '🐣    Pull Requests',
        onClick: this.handleShowPullRequests,
      }, {
        text: '🐷    Contributors',
        onClick: this.handleShowContributors,
      }]),
    })
    const readme = await (await http.get(`/repos/${repo}/readme`,
      'application/vnd.github.VERSION.html')).text()
    this.setState({
      readme: readme,
    })
  }

  handleShowReadme = () => {
    this.props.navigator.push(Object.assign({}, routes[3], {
      repo: this.props.route.repo
    }))
  }

  handleShowCommits = () => {
    this.props.navigator.push(Object.assign({}, routes[9], {
      api: `/repos/${this.props.route.repo}/commits`,
    }))
  }

  handleShowStargazers = () => {
    this.props.navigator.push(Object.assign({}, routes[6], {
      title: 'Stargazers',
      api: `/repos/${this.props.route.repo}/stargazers`,
    }))
  }

  handleShowWatchers = () => {
    this.props.navigator.push(Object.assign({}, routes[6], {
      title: 'Watchers',
      api: `/repos/${this.props.route.repo}/subscribers`,
    }))
  }

  handleShowContributors = () => {
    this.props.navigator.push(Object.assign({}, routes[6], {
      title: 'Contributors',
      api: `/repos/${this.props.route.repo}/contributors`,
    }))
  }

  handleShowIssues = () => {
    this.props.navigator.push(Object.assign({}, routes[7], {
      repo: this.props.route.repo,
      type: 'issue',
    }))
  }

  handleShowPullRequests = () => {
    this.props.navigator.push(Object.assign({}, routes[7], {
      repo: this.props.route.repo,
      type: 'pull',
    }))
  }

  handleStar = async () => {
    await http.put(`/user/starred/${this.props.route.repo}`)
    this.setState({ starred: true })
  }

  handleUnstar = async () => {
    await http.delete(`/user/starred/${this.props.route.repo}`)
    this.setState({ starred: false })
  }

  handleWatch = async () => {
    const res = await http.put(`/repos/${this.props.route.repo}/subscription`, {
      subscribed: true,
    })
    this.setState({ watched: true })
  }

  handleUnwatch = async () => {
    await http.delete(`/repos/${this.props.route.repo}/subscription`)
    this.setState({ watched: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title={this.props.route.repo}
          titleColor="#ffffff" />
        { !!this.state.repo && <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              { !this.state.starred && <Button title={`    ⭐ Star    `}
                color="#666" style={styles.button} onPress={this.handleStar} /> }
              { this.state.starred && <Button title={`    ⭐ Unstar    `}
                color="#666" style={styles.button} onPress={this.handleUnstar} /> }
            </View>
            <View style={styles.buttonWrapper}>
              { !this.state.watched && <Button title={`    ⌚️ Watch   `}
                color="#666" style={styles.button} onPress={this.handleWatch} /> }
              { this.state.watched && <Button title={`    ⌚️ Unwatch   `}
                color="#666" style={styles.button} onPress={this.handleUnwatch} /> }
            </View>
          </View>
        }
        { !!this.state.dataSource && <View>
            <ListView dataSource={this.state.dataSource}
              renderRow={row => (
                <TouchableHighlight underlayColor="#e0e0e0"
                  onPress={row.onClick}>
                  <View style={styles.list}>
                    <Text>{row.text}</Text>
                    <Text>></Text>
                  </View>
                </TouchableHighlight>
              )}
              renderSeparator={(sectionId, rowId) => (
                <View key={rowId} style={styles.separator} />
              )}
            />
          </View> }
        { !!this.state.readme && <View style={styles.readme}>
          <Text style={styles.readmeLink} onPress={this.handleShowReadme}>
            README >
          </Text>
          <WebView source={{ html: this.state.readme }} />
        </View> }
      </View>
    )
  }
}
