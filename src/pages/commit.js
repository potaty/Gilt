import React from 'react'
import { Image, StyleSheet, ScrollView, Text, ToolbarAndroid, View, ListView } from 'react-native'
import TimeAgo from 'react-native-timeago'

import CommitFile from '../components/commit-file'

import http from '../http'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  repoTitle: {
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    height: 30,
    alignItems: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 12,
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    fontSize: 12,
    lineHeight: 18,
  },
  head: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  title: {
    backgroundColor: '#d1e2eb',
    padding: 10,
    color: '#213f4d',
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  head: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  author: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  timeContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  line: {
    flexDirection: 'column',
  }
})

// 项目具体内容。
export default class CommitDetail extends React.Component {
  state = {}
  componentDidMount = async () => {
    const commit = await (
      await http.get(this.props.route.api)
    ).json()
    this.setState({ commit })
    console.log(commit.files)
  }
  render() {
    return (
      <View>
        <ToolbarAndroid style={styles.toolbar}
          title={this.state.commit ? this.state.commit.commit.message : "Commit"} titleColor="#ffffff" />
        { !!this.state.commit && <ScrollView>
          <Text style={styles.title}>{ this.state.commit.commit.message }</Text>
          <View style={styles.authorContainer}>
            <Image style={styles.head} source={{ uri: this.state.commit.committer.avatar_url }}/>
            <View style={styles.line}>
              <Text style={styles.author}>
                { this.state.commit.committer ? this.state.commit.committer.login : this.state.commit.commit.author }
              </Text>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>Committed </Text>
                <TimeAgo style={styles.time} time={this.state.commit.commit.committer.date} />
              </View>
            </View>
          </View>
          { this.state.commit.files.map(file => (
            <CommitFile key={file.filename} file={file} />
          )) }
        </ScrollView> }
      </View>
    )
  }
}
