import React from 'react'
import { BrowserRouter,} from 'react-router-dom'
import { getApps } from './utils/helper.js'

const App = () => {

  const CurrentApp = getApps();

  return (
    <div>
      <BrowserRouter>
        <CurrentApp/>
      </BrowserRouter>
    </div>
  )
}

export default App