import request from '@/utils/request'

export function login(mobile, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      mobile,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
