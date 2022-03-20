import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { isPlayingState } from '../../atoms/IsPlayingAtom'
import { currentTrackIdState } from '../../atoms/SongAtom'
import useFetchFromSpotify from '../../hooks/useSpotifyApi'
import { MsToMinAndSec } from '../../lib/functions'

interface Props {
  order: number
  track: any
}

export const Song: React.FC<Props> = ({ order, track }) => {
  const [error, setError] = useState<string>()
  const spotifyApi = useFetchFromSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.track?.id)
    setIsPlaying(true)
    spotifyApi
      .play({
        uris: [track.track?.uri],
      })
      .catch(() => {
        setError("Sorry, You don't have premium")
        // reset state after 2 seconds, handy if user keep clicking (could be a better solution)
        setTimeout(() => {
          setError('')
        }, 2000)
      })
  }
  return (
    <>
      {/* some poeple have registered local songs in a playlist */}
      {/* if that is the case spotify don't return a track object because it is local to the user*/}
      {/* or the song become unavailable in the future */}
      {/* if that is the case (for some reason) spotify don't return image but return track object */}
      {/* we just skip over that track if it doesn't exists or image don't exist either */}
      {track.track && track.track.album.images[0] && (
        <div
          className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-800"
          onClick={playSong}
        >
          <div className="flex items-center space-x-4">
            <p>{order + 1}</p>
            {/* we remove the coalescing operator because we know there is a track and image*/}
            <img src={track.track.album.images[0].url} className="h-10 w-10" />
            <div>
              <p className="w-36 truncate text-white lg:w-64">
                {/* we remove the coalescing operator because we know there is a track */}
                {track.track.name}
              </p>
              {/* we remove the calescing operator because we know the song is available */}
              <p className="w-40">{track.track.artists[0].name}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center justify-between md:ml-0">
            <p className="hidden w-40 md:inline">{track.track.album.name}</p>
            {/* we remove the coalescing operator because we know there is a track */}
            <p>{MsToMinAndSec(track.track.duration_ms)}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute bottom-1 right-1 rounded-lg bg-red-500 text-xs text-white sm:text-sm lg:text-lg">
          <p className="p-3">{error}</p>
        </div>
      )}
    </>
  )
}
