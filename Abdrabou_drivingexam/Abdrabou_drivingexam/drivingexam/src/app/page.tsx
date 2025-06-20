import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-4xl font-bold">Driving Exam</h1>
      <p className="text-lg text-gray-300 max-w-xl">
        Check your knowledge!
        Answer all questions and see the result in an instant!
      </p>

      
      <Link
        href="/modules"
        className="btn-module"
      >
        📘 Pick a module
      </Link>

      
      <Link
        href="/exam"
        className="btn-exam"
      >
        🚦 START SIMULATION
      </Link>

    </div>
  )
}
