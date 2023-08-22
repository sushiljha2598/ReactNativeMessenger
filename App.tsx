import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigator from './StackNavigator'
import { UserContext } from './UserContext'

const App = () => {
  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </>
  )
}

export default App

const styles = StyleSheet.create({})