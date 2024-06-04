import {CommentType} from "./comment.type";

export type FullArticleType = {
  text: string,
  commentsCount: number,
  comments: CommentType[],
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string
}
