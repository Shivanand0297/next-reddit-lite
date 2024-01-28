import Link from "next/link";
import PostShow from "@/components/posts/PostsShow";
import CommentList from "@/components/comments/CommentList";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import { paths } from "@/app/paths";
import fetchCommentsByPostId from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        &lt; Back to {slug}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(params.postId)} />
    </div>
  );
}
