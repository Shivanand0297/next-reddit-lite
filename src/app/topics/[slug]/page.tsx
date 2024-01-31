import CreatePostForm from "@/components/posts/CreatePostForm";
import PostList from "@/components/posts/PostList";
import findPostsByTopicSlug from "@/db/queries/posts";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

type TopicShowPageProp = {
  params: {
    slug: string;
  };
};

const TopicShowPage = ({ params }: TopicShowPageProp) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{params.slug}</h1>
        <Suspense
          fallback={
            <div className="space-y-3">
              <Skeleton className="rounded-lg h-12 w-full"/>
              <Skeleton className="rounded-lg h-12 w-full"/>
            </div>
          }
        >
          <PostList fetchPosts={() => findPostsByTopicSlug(params.slug)} />
        </Suspense>
      </div>
      <div className="col-span-1 place-self-end">
        <CreatePostForm slug={params.slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
