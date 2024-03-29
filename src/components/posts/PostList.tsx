import { paths } from '@/app/paths';
import { PostsWithData } from '@/db/queries/posts';
import Link from 'next/link';
import { Suspense } from 'react';


type PostListProp = {
  fetchPosts: () => Promise<PostsWithData[]>;
}

export default async function PostList({ fetchPosts }: PostListProp) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const posts = await fetchPosts();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
