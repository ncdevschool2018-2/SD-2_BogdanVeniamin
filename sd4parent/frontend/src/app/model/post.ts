import {User} from "./user";
import {Package} from "./package";
import {Addition} from "./addition";

export class Post {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  users: User[];
  packages: Package[];
  additions: Addition[];

  static cloneBase(post: Post): Post {
    let clonedPost: Post = new Post();
    clonedPost.id = post.id;
    clonedPost.title = post.title;
    clonedPost.description = post.description;
    clonedPost.price = post.price;
    clonedPost.discount = post.discount;
    clonedPost.users = post.users;
    clonedPost.packages = post.packages;
    clonedPost.additions = post.additions;
    return clonedPost
  }
}
