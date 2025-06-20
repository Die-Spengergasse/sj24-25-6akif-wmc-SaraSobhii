import { getModules } from "@/app/Driving_ApiClient/examApiClient"
import Link from "next/link"
import styles from "./ModulesPage.module.css"

export default async function ModulesPage() {
  const modules = await getModules()

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Module</h1>
      <ul className={styles.moduleList}>
        {modules.map((m) => (
          <li key={m.guid} className={styles.moduleItem}>
            <Link href={`/modules/${m.guid}`} className={styles.moduleLink}>
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
