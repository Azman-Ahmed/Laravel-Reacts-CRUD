import React from 'react'
import axios from 'axios'

const API = () => {
    const http = axios.create(
        {
            baseURL: 'http://127.0.0.1:8000/api',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
  return (
    http
  )
}

export default API
