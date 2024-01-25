import CreateTopicForm from "@/components/topics/CreateTopicForm";

export default async function Home() {

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          Top Posts
        </div>
        <div className="col-span-1">
          <CreateTopicForm/>
        </div>
      </div>
    </div>
  );
}
