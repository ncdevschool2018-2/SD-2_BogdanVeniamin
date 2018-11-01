export class Post {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;

  static cloneBase(post: Post): Post {
    let clonedPost: Post = new Post();
    clonedPost.id = post.id;
    clonedPost.title = post.title;
    clonedPost.description = post.description;
    clonedPost.price = post.price;
    clonedPost.discount = post.discount;
    return clonedPost
  }
}
