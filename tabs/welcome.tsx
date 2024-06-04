import { Button } from "~/components/ui/button"

import "../styles/global.css"

const WelcomePage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl lg:text-[3.5rem]">
            Free yourself from distractions with Immerse
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Thanks for downloading our extension. Keep track what you have to
            do, block some websites, and immerse yourself!
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Button>
              <a href="/options.html">Get Started</a>
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WelcomePage
