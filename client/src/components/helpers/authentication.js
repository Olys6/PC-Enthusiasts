export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getUsernameFromLocalStorage = () => {
  return window.localStorage.getItem('username')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (err) {
    return null
  }
  // console.log(token)
  // if (!token) return
  // const splitToken = token.split('.')
  // console.log('splitToken ->', splitToken)
  // if (splitToken.length < 3) return
  // const payloadString = splitToken[1]
  // console.log(payloadString)
  // console.log('ATOB(PAYLOADSTRING)', JSON.parse(atob(payloadString)))
  // if (!token) {
  //   return JSON.parse(atob(token))
  // }
}

// console.log('get payload function ->', getPayload())