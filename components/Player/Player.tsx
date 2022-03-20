import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isPlayingState } from '../../atoms/IsPlayingAtom'
import { currentTrackIdState } from '../../atoms/SongAtom'
import useSongInfo from '../../hooks/useSongInfo'
import useSpotifyApi from '../../hooks/useSpotifyApi'
import { Left } from './Left'
import { Right } from './Right'

const Player: React.FC = () => {
  const [error, setError] = useState<string>()
  const spotifyApi = useSpotifyApi()
  const { data: session } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState<number>(60)

  // to not spam spotify api we use debouncing
  const adjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(() => {})
    }, 500),
    []
  )

  const songInfo: any = useSongInfo()

  const fetchSong = async () => {
    if (!songInfo) {
      const playingTrackData = await spotifyApi.getMyCurrentPlayingTrack()
      setCurrentTrackId(playingTrackData.body?.item?.id!)

      const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState()
      setIsPlaying(currentPlaybackState.body?.is_playing)
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song on refresh or no currentTrackId is found
      fetchSong()
      setVolume(60)
    }
  }, [currentTrackId, spotifyApi, session])

  // volume useEffect
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      adjustVolume(volume)
    }
  }, [volume])

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((currentPlayBackState) => {
      if (currentPlayBackState.body?.is_playing) {
        spotifyApi.pause().catch(() => {
          // if user don't have premium he can't pause
          setError("Sorry, you don't have premium.")
          setTimeout(() => {
            setError('')
          }, 2000)
        })
        setIsPlaying(false)
      } else {
        spotifyApi.play().catch((e) => {
          // if user don't have premium he can't play
          setError("Sorry, you don't have premium.")
          setTimeout(() => {
            setError('')
          }, 2000)
        })
        setIsPlaying(true)
      }
    })
  }

  return (
    <>
      <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-800 px-2 text-xs text-white md:px-8 md:text-base">
        <Left songInfo={songInfo} />

        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />

          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
          )}

          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>

        <Right volume={volume} setVolume={setVolume} />
      </div>
      {error && (
        <div className="absolute top-1 right-1 rounded-lg bg-red-500 text-xs text-white sm:text-sm lg:text-lg">
          <p className="p-3">{error}</p>
        </div>
      )}
    </>
  )
}

export default Player
