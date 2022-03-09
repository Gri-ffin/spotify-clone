import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="">
        <Sidebar />
        {/* center */}

        <div>{/* Player */}</div>
      </main>
    </div>
  )
}

export default Home
