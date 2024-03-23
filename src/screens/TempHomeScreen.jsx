import React from 'react'
import { useStore } from '../zustandState'

function TempHomeScreen() {

    const [currentUser] = useStore(state => [state.currentUser])

  return (
    <div>{currentUser?.username || "z"}</div>
  )
}

export default TempHomeScreen