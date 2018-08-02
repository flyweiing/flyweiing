import request from '@/utils/request'

export function getAllNode() {
  return request({
    url: '/note/allNode',
    method: 'get'
  })
}
