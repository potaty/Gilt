import React from 'react'
import { Alert, AppRegistry, Button, Image, StyleSheet, Text, TextInput, ToolbarAndroid, TouchableHighlight, View } from 'react-native'
import _ from 'lodash'

import http from '../http'
import routes from '../routes'

import MailIcon from '../images/mail.png'
import LinkIcon from '../images/link.png'
import RepoIcon from '../images/repo.png'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  head: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 20,
  },
  contact: {
    marginLeft: 20,
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: 16,
  },
  mail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  mailText: {
    color: '#4078c0',
    marginLeft: 5,
    fontSize: 12,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#4078c0',
    marginLeft: 5,
    fontSize: 12,
  },
  detail: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  datas: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 20,
    marginVertical: 10,
    color: '#313131',
    fontWeight: 'bold',
  },
  repo: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  repoLogo: {
    marginRight: 10,
  },
  repoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  repoStar: {
    flex: 1,
    textAlign: 'right',
  },
})

export default class Profile extends React.Component {
  state = {
    loaded: false,
    user: {},
    repos: [],
  }
  componentDidMount = async () => {
    const user = await (await http.get('/user')).json()
    this.setState({
      loaded: true,
      user: user,
    })
    const repos = await (await http.get(`/users/${user.login}/repos`)).json()
    const sorted = _.sortBy(repos, ['stargazers_count']).reverse()
    this.setState({
      repos: sorted.slice(0, Math.min(sorted.length, 6)),
    })
  }
  handleShowRepo = (name) => {
    this.props.navigator.push(Object.assign(routes[3], { title: name }))
  }
  render() {
    if (!this.state.loaded) {
      return <View />
    }
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar} title="Profile" titleColor="#ffffff" />
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image style={styles.head} source={{ uri: this.state.user.avatar_url }} />
            <View style={styles.contact}>
              <Text style={styles.username}>{ this.state.user.name }</Text>
              <Text style={styles.nickname}>{ this.state.user.login }</Text>
              { !!this.state.user.email &&
                <View style={styles.mail}>
                  <Image source={MailIcon} />
                  <Text style={styles.mailText}>{ this.state.user.email }</Text>
                </View>
              }
              { !!this.state.user.blog &&
                <View style={styles.link}>
                  <Image source={LinkIcon} />
                  <Text style={styles.linkText}>{ this.state.user.blog }</Text>
                </View>
              }
            </View>
          </View>
          <View style={styles.detail}>
            <View style={styles.datas}>
              <Text style={styles.number}>
                { this.state.user.public_repos + this.state.user.owned_private_repos }
              </Text>
              <Text>Repositories</Text>
            </View>
            <View style={styles.datas}>
              <Text style={styles.number}>{ this.state.user.following }</Text>
              <Text>Following</Text>
            </View>
            <View style={styles.datas}>
              <Text style={styles.number}>{ this.state.user.followers }</Text>
              <Text>Followers</Text>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Most Popular Repositories</Text>
            { this.state.repos.map(repo => (
                <TouchableHighlight key={repo.id} onPress={this.handleShowRepo.bind(this, repo.full_name)}>
                  <View style={styles.repo}>
                    <Image style={styles.repoLogo} source={RepoIcon} />
                    <Text style={styles.repoTitle}>{repo.full_name}</Text>
                    <Text style={styles.repoStar}>⭐ {repo.stargazers_count}</Text>
                  </View>
                </TouchableHighlight>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
