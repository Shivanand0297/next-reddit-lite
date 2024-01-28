import Image from "next/image";
import { Button } from "@nextui-org/react";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import { CommentWithAuthor } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string;
  allComments: CommentWithAuthor[];
}

export default function CommentShow({ commentId, allComments }: CommentShowProps) {

  // commentId -> 2
  const comment = allComments.find((c) => c.id === commentId); 

  if (!comment) {
    return null;
  }

  const replyComments = allComments.filter((c) => c.parentId === commentId);
  const renderedReply = replyComments.map((reply) => (
      <CommentShow 
        key={reply.id} 
        commentId={reply.id} 
        allComments={allComments}
       />
    )
 );

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedReply}</div>
    </div>
  );
}
