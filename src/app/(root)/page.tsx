import CreateTopicForm from "@/components/topics/CreateTopicForm";
import TopicList from "@/components/topics/TopicList";
import { Divider } from "@nextui-org/react";

export default async function Home() {

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          Top Posts
        </div>
        <div className="col-span-1 border border-gray-300 rounded-2xl p-2">
          <CreateTopicForm/>
          <Divider className="my-3 bg-gray-300"/>
          <TopicList/>
        </div>
      </div>
    </div>
  );
}
