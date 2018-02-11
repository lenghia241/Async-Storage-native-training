import React, {Component} from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, Button, Alert, Message } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: null,
      answer: Math.floor(Math.random() * 100) + 1,
      check: 'Guess a number between 1-100',
      count: 0,
      highscore: null
    }
  }

  onGuess = async () => {
    alert(this.state.answer)
    if (this.state.guess == this.state.answer) {
      alert(`Your guessed the number in ${this.state.count} guesses`)
      try {
        await AsyncStorage.setItem('highscore', JSON.stringify(this.state.count));
        this._updateList();
        this.setState({
          answer: Math.floor(Math.random() * 100) + 1,
          count:0
        });
      } catch (error) {
        Alert.alert('Error saving high score.');
      }
    } else if (this.state.guess > this.state.answer) {
      this.setState({
        check: `Your guess ${this.state.guess} is too high`,
        count: this.state.count + 1
      });
    } else {
      this.setState({
        check: `Your guess ${this.state.guess} is too low`,
        count: this.state.count + 1
      });
    }
  }
  
  _updateList  = async () => {
    let response = await AsyncStorage.getItem('highscore'); 
    let highscore = await JSON.parse(response) || []; 
    if(this.state.highscore === null || highscore<this.state.highscore){
      this.setState({ 
        highscore:highscore 
      });
    }  
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Exercise 6: Number Guessing Game</Text>
        <Text style={styles.headerText}>
          {this.state.check}</Text>

        <TextInput
          keyboardType='numeric'
          style={styles.TextInput}
          onChangeText={(guess => {
            this.setState({ guess })
          })}
          value={this.state.guess}
        />
        <Button
          onPress={this.onGuess}
          title='MAKE GUESS'></Button>
        <Text style={styles.headerText}>High Score: {this.state.highscore} guesses.</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    width:300,
    height:30,
    borderColor:'black',
    borderWidth:2,
    marginBottom:4
  },
  headerText: {
    fontSize: 26
  }
});
