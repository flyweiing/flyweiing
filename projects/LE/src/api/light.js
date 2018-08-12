import request from '@/utils/request'

export function getAllNode() {
  return request({
    url: '/note/allNode',
    method: 'get'
  })
}

export function getSingleControl(nodeCode, mode, value) {
  return request({
    url: `/gateway/singleControl?nodeCode=${nodeCode}&mode=${mode}&value=${value}`,
    method: 'get'
  })
}

