import { paths } from "@/app/paths";
import db from "@/db";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

const TopicList = async () => {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row gap-3 flex-wrap">
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link href={paths.topicShow(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TopicList;
