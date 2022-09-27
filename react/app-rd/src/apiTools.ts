import { Cookies } from 'react-cookie'

function getToken() {
  return new Cookies().get('api-token')
}

function getFromApi(uri: string) {
  return fetch(`http://10.100.2.1:8000${uri}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

function postToApi(uri: string, body: any) {
  return fetch(`http://10.100.2.1:8000${uri}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  })
}

function patchToApi(uri: string, body: any) {
  return fetch(`http://10.100.2.1:8000${uri}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  })
}

function putToApi(uri: string, body: any) {
  return fetch(`http://10.100.2.1:8000${uri}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  })
}

function deleteFromApi(uri: string) {
  return fetch(`http://10.100.2.1:8000${uri}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export { getFromApi, postToApi, patchToApi, deleteFromApi, putToApi}