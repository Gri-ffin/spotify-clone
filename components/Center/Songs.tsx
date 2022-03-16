import { useRecoilValue } from 'recoil'
import { playlistState } from '../../atoms/PlaylistAtom'
import { Song } from './Song'

export const Songs: React.FC = () => {
  const playlists: any = useRecoilValue(playlistState)
  return (
    <div className="pb-20f flex flex-col space-y-1 px-8 text-white">
      {playlists?.tracks.items.map((track: any, i: number) => (
        <Song key={i} track={track} order={i} />
      ))}
    </div>
  )
}
