import React from 'react'

const Dashboard = ({ user, handleLogout }) => {
  return (
    <div>
      Dashboard for {user.username}
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Dashboard
