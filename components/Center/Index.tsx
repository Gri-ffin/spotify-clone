import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { colors } from './GradientColors'
import { shuffle } from 'lodash'

const Center: React.FC = () => {
  const { data: session } = useSession()
  const [color, setColor] = useState<string>()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8 text-white">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            src={session?.user?.image}
            alt="Profile picture"
            className="h-10 w-10 rounded-full"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img src="" alt="" />
      </section>
    </div>
  )
}

export default Center
