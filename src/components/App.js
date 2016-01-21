import React, {PropTypes} from 'react'
import UserHeader from './UserHeader'

const App = ({children, history}) =>
  <div>
    <div className="main-container">

        {children}
    </div>
  </div>

App.propTypes = typeof __DEV__ && {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default App
