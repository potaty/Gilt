import React, { Component } from 'react'
import { Alert, AppRegistry, Button, Image, StyleSheet, Text, TextInput, ToolbarAndroid, View } from 'react-native'
import _ from 'lodash'
import MailIcon from '../images/mail.png'
import LinkIcon from '../images/link.png'
import RepoIcon from '../images/repo.png'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
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
  },
})

export default class Profile extends Component {
  state = {
    loaded: false,
    user: {},
    repos: [],
  }
  componentDidMount = async () => {
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${global.ACCESS_TOKEN}`,
      },
    })
    const user = await response.json()
    this.setState({
      loaded: true,
      user: user,
    })
    const repoResponse = await fetch(`https://api.github.com/users/${user.login}/repos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `token ${global.ACCESS_TOKEN}`,
      },
    })
    const repos = await repoResponse.json()
    this.setState({
      repos: _.sortBy(repos, ['stargazers_count']).slice(0, 5),
    })
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
                <View key={repo.id} style={styles.repo}>
                  <Image style={styles.repoLogo} source={RepoIcon} />
                  <Text style={styles.repoTitle}>{repo.full_name}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
