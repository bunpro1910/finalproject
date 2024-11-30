import React from 'react'

export default function Time({string}) {
  return (
    `${new Date(string).toLocaleString()}`
  )
}
