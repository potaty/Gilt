import React from 'react'
import { Button, Image, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

import Qingzhen from '../images/qingzhen.png'
import Comment from '../components/comment'

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#263238',
    height: 56,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    fontSize: 20,
  },
  message: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
    padding: 20,
  },
  detail: {
    flexDirection: 'row',
    margin: 20,
  },
  head: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  input: {
    borderColor: 'gray',
    margin: 20,
  },
})

export default class Issue extends React.Component {
  state = {
    text: 'Useless Placeholder',
  }
  render() {
    return (<View>
      <ToolbarAndroid style={styles.toolbar}
        title={this.props.route.login || 'Issue'} titleColor="#ffffff" />
      <View>
        <View>
          <View>
            <Button title={'⚠️ Open'} color="#00c853"></Button>
            <Button title={'Click me to see the changes in code.'} color="#81d4fa" style={styles.code}></Button>
          </View>
        </View>
        <Text style={styles.title}>Update to Table.alias method (#5)</Text>
        <View style={styles.detail}>
          <Image source={Qingzhen} style={styles.head} />
          <View style={styles.message}>
            <Text style={styles.author}>{'potaty'}</Text>
            <Text> wants to merge 1 commit into </Text>
            <Text style={styles.branch}> brynary:master </Text>
            <Text> from </Text>
            <Text style={styles.branch}> aliceatlas:master </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text>Change the unstandable part in guide.</Text>
        </View>
        <Comment pic={Qingzhen} author={'potaty'} time={'one hour ago'} comment={'please dont lasdasidjiasjdiasjdiajsidjasidjiasjdiasjidjasidjiasjdiaugh.'}></Comment>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state}
          multiline = {true}
          numberOfLines = {2}
        />
        <Button title={'Comment'}></Button>
      </View>
    </View>)
  }
}
