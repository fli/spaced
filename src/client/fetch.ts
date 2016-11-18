import * as fetch from 'isomorphic-fetch';

export function post(url: string, body: any) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'same-origin'
  })
}

export function get(url: string) {
  return fetch(url, {
    credentials: 'same-origin'
  })
}
