import { baseURL } from '../config/constants'

export interface StandardResponse {
  status: number
  data?: any
  error?: any
  success: boolean
}

const standardResponse = async(reqPromise: Promise<Response>) => {
  try {
    const req = await reqPromise

    if (req.status === 200) {
      const data = await req.json()

      return {
        data,
        status: req.status,
        success: true
      } as StandardResponse
    }
    if (req.status === 204) {
      return {
        status: req.status,
        success: true
      } as StandardResponse
    }
    const error = await req.json()

    return {
      error: new Error(error.message ?? ''),
      status: req.status,
      success: false
    } as StandardResponse
  } catch (err) {
    console.error(err)

    return {
      error: new Error('Unable to process request'),
      status: -1,
      success: false
    } as StandardResponse
  }
}

export const get = async(
  path: string,
  queryParams?: Record<string, string>
) => {
  const url = (queryParams != null) ? `${baseURL}${path}?${new URLSearchParams(queryParams).toString()}` : `${baseURL}${path}`
  return await standardResponse(
    fetch(url, {
      mode: 'cors',
      headers: {
        accept: 'application/json'
      }
    })
  )
}

export const customGet = async(
  path: string,
  queryParams?: Record<string, string>
) => {
  const url = (queryParams != null) ? `${path}?${new URLSearchParams(queryParams).toString()}` : `${baseURL}${path}`
  return await standardResponse(
    fetch(url, {
      mode: 'cors',
      headers: {
        accept: 'application/json'
      }
    })
  )
}

export const post = async(path: string, data: any) =>
  await standardResponse(
    fetch(`${baseURL}${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  )

export const put = async(path: string, data: any) =>
  await standardResponse(
    fetch(`${baseURL}${path}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  )

export const del = async(path: string, data?: any) =>
  await standardResponse(
    fetch(`${baseURL}${path}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  )
