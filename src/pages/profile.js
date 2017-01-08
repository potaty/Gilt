import React from 'react'
import { Image, ScrollView, StyleSheet, Text, ToolbarAndroid, TouchableHighlight, View } from 'react-native'
import _ from 'lodash'

import http from '../http'
import routes from '../routes'

import mailIcon from '../images/mail.png'
import linkIcon from '../images/link.png'
import repoIcon from '../images/repo.png'

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
    color: '#1e88e5',
    marginLeft: 5,
    fontSize: 12,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: '#1e88e5',
    marginLeft: 5,
    fontSize: 12,
  },
  detail: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  data: {
    marginVertical: 10,
    flex: 1,
  },
  inner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 20,
    marginVertical: 10,
    color: '#424242',
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
  bio: {
    marginHorizontal: 20,
  },
})

/*
 * 个人资料、其他用户资料页面。
 */
export default class Profile extends React.Component {
  state = {
    loaded: false,
    user: {},
    repos: [],
  }

  componentDidMount = async () => {
    // 用户信息。
    const user = await (
      await http.get(this.props.route.login ? `/users/${this.props.route.login}` : '/user')
    ).json()
    this.setState({
      loaded: true,
      user: user,
    })
    // 用户项目列表。
    const repos = await (await http.get(`/users/${user.login}/repos`)).json()
    // 基于 stars 排序。
    const sorted = _.sortBy(repos, ['stargazers_count']).reverse()
    this.setState({
      repos: sorted.slice(0, 6),
    })
  }

  handleShowRepo = repo => {
    this.props.navigator.push(Object.assign({}, routes[2], { repo }))
  }

  handleShowFollowing = login => {
    this.props.navigator.push(Object.assign({}, routes[6], {
      title: 'Following',
      api: `/users/${login}/following`,
    }))
  }

  handleShowFollowers = login => {
    this.props.navigator.push(Object.assign({}, routes[6], {
      title: 'Followers',
      api: `/users/${login}/followers`,
    }))
  }

  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title={this.props.route.login || 'Profile'} titleColor="#ffffff" />
        {this.state.loaded && <ScrollView style={styles.container}>
          <View style={styles.profile}>
            <Image style={styles.head} source={{ uri: this.state.user.avatar_url }} />
            <View style={styles.contact}>
              <Text style={styles.username}>{ this.state.user.name }</Text>
              <Text style={styles.nickname}>{ this.state.user.login }</Text>
              { !!this.state.user.email &&
                <View style={styles.mail}>
                  <Image source={mailIcon} />
                  <Text style={styles.mailText}>{ this.state.user.email }</Text>
                </View>
              }
              { !!this.state.user.blog &&
                <View style={styles.link}>
                  <Image source={linkIcon} />
                  <Text style={styles.linkText}>{ this.state.user.blog }</Text>
                </View>
              }
            </View>
          </View>
          { !!this.state.user.bio &&
            <View style={styles.bio}>
              <Text>{ this.state.user.bio}</Text>
            </View>
          }
          <View style={styles.detail}>
            <View style={styles.data}>
              <TouchableHighlight underlayColor="#e0e0e0"
                onPress={this.handleShowFollowing.bind(this, this.state.user.login)}>
                <View style={styles.inner}>
                  <Text style={styles.number}>
                    { this.state.user.public_repos + (this.state.user.owned_private_repos || 0) }
                  </Text>
                  <Text>Repositories</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.data}>
              <TouchableHighlight underlayColor="#e0e0e0"
                onPress={this.handleShowFollowing.bind(this, this.state.user.login)}>
                <View style={styles.inner}>
                  <Text style={styles.number}>
                    { this.state.user.following }
                  </Text>
                  <Text>Following</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.data}>
              <TouchableHighlight underlayColor="#e0e0e0"
                onPress={this.handleShowFollowers.bind(this, this.state.user.login)}>
                <View style={styles.inner}>
                  <Text style={styles.number}>{ this.state.user.followers }</Text>
                  <Text>Followers</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Most Popular Repositories</Text>
            { this.state.repos.map(repo => (
                <TouchableHighlight key={repo.id} underlayColor="#e0e0e0"
                  onPress={this.handleShowRepo.bind(this, repo.full_name)}>
                  <View style={styles.repo}>
                    <Image style={styles.repoLogo} source={repoIcon} />
                    <Text style={styles.repoTitle}>
                      {repo.full_name.length > 33 ? repo.full_name.substring(0, 33) + '...' : repo.full_name}
                    </Text>
                    <Text style={styles.repoStar}>⭐ {repo.stargazers_count}</Text>
                  </View>
                </TouchableHighlight>
              ))
            }
          </View>
        </ScrollView>}
      </View>
    )
  }
}
