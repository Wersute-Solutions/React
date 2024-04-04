import React, { useEffect, useState } from 'react'
import { useStore } from '../zustandState'

function TempHomeScreen() {

    const [currentUser] = useStore(state => [state.currentUser])
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
      console.log("after update", currentUser);
      // Force rerender by toggling the value of forceUpdate
      setForceUpdate(prevState => !prevState);
  }, [currentUser, forceUpdate]);

  return (
    <div>{currentUser?.username || "z"}</div>
  )
}

export default TempHomeScreen