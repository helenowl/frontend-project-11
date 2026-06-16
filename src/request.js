import axios from 'axios'
import parser from './parser.js'
import uniqueId from 'lodash/uniqueId.js'


const  createFeedAndPost = (data, linkForFeed) => {
  const { feedRss, postsRss } = data
  const { feedTitle, feedDescription } = feedRss
  const idForFeed = uniqueId()
  const feed = {
    id: idForFeed, title: feedTitle, description: feedDescription, linkForFeed,
  }

  const posts = postsRss.map((post) => {
    const { title, link, description } = post
    const idForPost = uniqueId()
    return {
      id: idForPost, idFeed: idForFeed, title, link, description,
    }
  })
  return { feed, posts }
}

const request = (link) => axios.get(link)
  .then((response) => {
    const dataRss = response.data.contents
    const dataFeedAndPosts = parser(dataRss)
    const newFeedAndPosts = createFeedAndPost(dataFeedAndPosts, link)
    return newFeedAndPosts
  })
  .catch((error) => {
    if (error.isAxiosError) {
      throw new Error('errors.network')
    }
    throw error
  })

  export default request;
  