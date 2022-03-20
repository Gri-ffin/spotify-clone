import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/SongAtom'
import useSpotifyApi from './useSpotifyApi'

const useSongInfo = () => {
  const spotifyApi = useSpotifyApi()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState()

  useEffect(() => {
    const getSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }

    getSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
