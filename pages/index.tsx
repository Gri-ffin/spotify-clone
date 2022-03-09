import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <Sidebar />
        {/* center */}

        <div>{/* Player */}</div>
      </main>
    </div>
  )
}

export default Home
