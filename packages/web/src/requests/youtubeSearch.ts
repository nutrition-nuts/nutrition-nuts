import { customGet } from './requests'
import { VideoModel } from '../models/videoModel'

export const getVideo = async(q: string, key: string) => {
  const res = await customGet('https://youtube.googleapis.com/youtube/v3/search', { part: 'snippet', maxResults: '1', q: 'how to do ' + q + ' workout', key })
  const requestJSON = JSON.parse(JSON.stringify(res.data))
  const it0 = requestJSON.items[0]

  const video: VideoModel = { videoID: it0.id.videoId, title: it0.snippet.title, thumbnail: it0.snippet.thumbnails.high.url }
  return video
}
