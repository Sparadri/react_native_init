

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AppState,
  Text,
  NavigatorIOS,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'gray',
    backgroundColor: 'white',
    fontSize: 12,
    margin: 60
  },
  description: {
    color: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  wrapper: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 20
  },
  buttonStop: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 20
  },
  image: {
    width: 20,
    height: 20,
    margin: 30
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  console.log("2. urlForQueryAndPage")

  return 'http://localhost:3000/api/v1/wines?latitude=48.851122&longitude=2.376058&color=white&price=less-10&paring='; //+ querystring;
};

class MyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false
    };
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  _executeQuery(query) {
    console.log("3. _executeQuery "+query);
    this.setState({ isLoading: true });
    fetch(query)
      .then((response) => response.json())
      .then((responseData) => {
        var data = [responseData[0]];
        console.log(data);
        this._handleResponse(data);
      })
      .done();
  }

  _handleResponse(response) {
    console.log("4. _handleResponse "+response);
    this.setState({ isLoading: false , stores: response });
    console.log(this.state)
  }

  onSearchPressed() {
    console.log("1. onSearchPressed");
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  onSearchStopPressed() {
    this.setState({ isLoading: false, searchString: 'paris' });
  }

  renderStoreList() {
    if (this.state.stores) {
     return (<Text style={styles.text}> stores </Text>);
    } else {
      return (<Text style={styles.text}> no stores </Text>);
    };
  }

  render() {
    console.log('New Search Page rendered');
    var spinner = this.state.isLoading ?
        ( <ActivityIndicator
            size='large'/> ) :
        ( <View/>);
    return (
      <View>
      {this.renderStoreList()}
      <Text style={styles.text}> View all wines. </Text>
      <Text style={styles.description}> Find the best top rated wines near you. </Text>
      <TouchableHighlight style={styles.buttonStop}
          underlayColor='red'
          onPress={this.onSearchStopPressed.bind(this)}>
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableHighlight>
      <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={styles.image} />
       {spinner}
      <TextInput
        style={styles.searchInput}
        value={this.state.searchString}
        onChange={this.onSearchTextChanged.bind(this)}
        placeholder='Search via name or postcode'/>
      <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.onSearchPressed.bind(this)}>
        <Text style={styles.buttonText}>GO</Text>
      </TouchableHighlight>
      <Text style={styles.description}> {this.state.message} </Text>
      </View>
    )
  }
}

class PropertyFinderApp extends Component {
  render() {
    return (
        <NavigatorIOS
          style={styles.wrapper}
          initialRoute={{
            component: MyView,
            title: 'Welcome to Picolio',
            passProps: { myProp: 'foo' },
            backButtonTitle: 'back',
            barTintColor: 'red'
          }}
        />
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => PropertyFinderApp);
// AppRegistry defines the entry point to the application and provides the root component.










// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   AppState,
//   Text,
//   View
// } from 'react-native';

// class AwesomeProject extends Component {
//   componentWillMount() {
//     var that = this;
//     fetch('http://localhost:3000/api/v1/wines?latitude=48.851122&longitude=2.376058&color=white&price=less-10&paring=')
//     .then((response) => response.text())
//     .then((responseText) => {
//       console.log("adriennnnn"+responseText);
//       this.state = {
//         response: 'london'
//       };
//     })
//     .catch((error) => {
//       console.warn(error);
//     });
//   }

//   componentDidMount(){
//     console.log(this.state)
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
