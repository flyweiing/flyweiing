import request from '@/utils/request'

export function getOnlineOffline(d) {
  return request({
    url: `/linecount/onlineOfflineStatistic?day=${d}`,
    method: 'get'
  })
}
