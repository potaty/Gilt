import React from 'react'
import { Button, Image, ScrollView, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Markdown from 'react-native-simple-markdown'

import Comment from '../components/comment'

import http from '../http'

global.ACCESS_TOKEN = '09fbdbe418c4d1e338acc4ed6743818af913c234'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 25,
    marginHorizontal: 10,
  },
  badge: {
    backgroundColor: '#00c853',
    borderRadius: 3,
    padding: 5,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    flexDirection: 'column',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  author: {
    fontWeight: 'bold',
  },
  branch: {
    backgroundColor: '#b3e5fc',
    borderRadius: 3,
    color: '#01579b',
  },
  description: {
    margin: 10,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
  },
  detail: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  head: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  input: {
    borderColor: 'gray',
  },
  inputContainer: {
    margin: 10,
  },
  line: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  }
})

export default class Issue extends React.Component {
  state = {}

  componentDidMount = async () => {
    console.log(this.props.route)
    const issue = await (
      await http.get(this.props.route.api)
    ).json()
    this.setState({ issue })
  }

  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title={this.state.issue ? this.state.issue.title : (
            this.props.route.type === 'issue' ? 'Issue' : 'Pull Request'
          )} titleColor="#ffffff" />
        { !!this.state.issue && <ScrollView>
            <View style={styles.titleContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>⚠️ Open</Text>
              </View>
              <Text style={styles.title}>{ this.state.issue.title }</Text>
            </View>
            <View style={styles.detail}>
              <Image source={{ uri: this.state.issue.user.avatar_url}} style={styles.head} />
              <View style={styles.message}>
                <Text style={styles.author}>{this.state.issue.user.login}</Text>
                <View style={styles.line}>
                  <Text style={styles.time}>Opened this issue </Text>
                  <TimeAgo style={styles.time} time={this.state.issue.created_at} />
                </View>
              </View>
            </View>
            <View style={styles.description}>
              <Markdown>{this.state.issue.body}</Markdown>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{fontWeight: 'bold'}}>Comment</Text>
              <TextInput style={styles.input} value={this.state.text}
                onChangeText={(text) => this.setState({text})} />
              <View style={styles.buttonContainer}>
                <Button title="  Submit  " />
              </View>
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}
