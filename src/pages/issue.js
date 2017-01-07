import React from 'react'
import { Alert, AppRegistry, BackAndroid, Button, Navigator, StyleSheet, TextInput, ToolbarAndroid, View, Text, ListView } from 'react-native'

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
  issueTitle: {
    flexDirection: 'row',
  },
})

export default class Issue extends React.Component {
  state = {}
  render() {
    return (<View>
      <ToolbarAndroid style={styles.toolbar}
        title={this.props.route.login || 'Issue'} titleColor="#ffffff" />
      <View>
        <Button title={'⚠️ Open'} color="#64dd17"></Button>
        <View style={styles.issueTitle}>
          <Text style={styles.title}>Update to Table.alias method (#5)</Text>
        </View>
      </View>
    </View>)
  }
}
