import { useRecoilState } from 'recoil'
import { isPlayingState } from '../../atoms/IsPlayingAtom'
import { currentTrackIdState } from '../../atoms/SongAtom'
import useFetchFromSpotify from '../../hooks/useFetchFromSpotify'
import { MsToMinAndSec } from '../../lib/functions'

interface Props {
  order: number
  track: any
}

export const Song: React.FC<Props> = ({ order, track }) => {
  return (
    <div className="grid grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-800">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={track.track?.album.images[0]?.url} className="h-10 w-10" />
        <div>
          <p className="w-36 truncate text-white lg:w-64">
            {track.track?.name}
          </p>
          <p className="w-40">{track.track?.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track?.album.name}</p>
        <p>{MsToMinAndSec(track.track?.duration_ms)}</p>
      </div>
    </div>
  )
}
