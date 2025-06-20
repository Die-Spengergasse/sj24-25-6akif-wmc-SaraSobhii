import { getTopicsByModule } from '@/app/Driving_ApiClient/topicApiClient'
import { Topic } from '@/app/types/Topic'
import Link from 'next/link'
import styles from './TopicsPage.module.css'

export const dynamic = 'force-dynamic'

type Props = {
  params: { moduleId: string }
}

export default async function ModuleDetailPage(props: Props) {
  const moduleId = props.params.moduleId

  const topics = await getTopicsByModule(moduleId)

  if (!Array.isArray(topics)) {
    return <p className="text-red-500 p-4">Error loading topics</p>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Themen</h2>
      <ul className={styles.list}>
        {topics.map((topic: Topic) => (
          <li key={topic.guid}>
            <Link
              href={`/modules/${moduleId}/topics/${topic.guid}`}
              className={styles.link}
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
