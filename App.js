import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Switch
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

let id = 0

const Todo = props => (
	<View style = {styles.todoContainer}>
		<Switch value = {props.todo.checked} onValueChange={props.onToggle}/>
		<Button onPress={props.onDelete} title="delete" />
		<Text>{props.todo.text}</Text>
	</View>
)

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			todos: [],
		}
	}

	addTodo() {
		id++
		const text = `Todo number ${id}`
		this.setState({
			todos: [
				...this.state.todos,
				{id: id, text: text, checked: false},
			],
		})
	}


	removeTodo(id) {
		this.setState({
			todos: this.state.todos.filter(todo => todo.id !== id)
		})
	}

	toggleTodo(id) {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id !== id) return todo
				return {
					id: todo.id,
					text: todo.text,
					checked: !todo.checked
				}
			})
		})
	}

	render() {
		return (
			<View style={[styles.appContainer, styles.fill]}>
				<Text>Todo count: {this.state.todos.length} </Text>
				<Text>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length} </Text>
				<Button onPress={() => this.addTodo()} title = "Add Todo" />
				<ScrollView style={styles.fill}>
					{this.state.todos.map(todo => (<Todo onToggle={() => this.toggleTodo(todo.id)}
									     onDelete={() => this.removeTodo(todo.id)}
										todo = {todo} />
									))}
				</ScrollView>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: 2
  },
  fill: {
    flex: 1
  }
})
