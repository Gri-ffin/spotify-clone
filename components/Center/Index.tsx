import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { colors } from './GradientColors'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState } from '../../atoms/PlaylistIdState'
import { playlistState } from '../../atoms/PlaylistAtom'
import useFetchFromSpotify from '../../hooks/useFetchFromSpotify'
import { Songs } from './Songs'

const Center: React.FC = () => {
  const { data: session } = useSession()
  // I hate spotify API
  const [feedback, setFeedback] = useState<string>()
  const spotifyApi = useFetchFromSpotify()
  const [color, setColor] = useState<string>()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body)
        }) // There should be another way but for now i'll diplay some feedback to user if playlist not found
        .catch(() => setFeedback('Choose a playlist to play'))
    }
  }, [spotifyApi, playlistId])

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 text-white">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80"
          onClick={() => {
            signOut()
          }}
        >
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
        <img
          src={playlist?.images?.[0]?.url}
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p className="text-xl font-bold underline">playlist</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {/* either the playlist if not the feedback */}
            {playlist?.name || feedback}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
