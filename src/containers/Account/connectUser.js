import React, { memo } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export function withUser(Component) {
  return connect(mapStateToProps)( 
    memo(
      ({ loggedIn, ...props }) => 
        <Component {...props} loggedIn={loggedIn} />
    )
  )
}

export const User = connect(mapStateToProps)( 
  ({ loggedIn, children }) => children({loggedIn}) 
)
