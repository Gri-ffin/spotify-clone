import { VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline'
import { SetStateAction } from 'react'

interface Props {
  setVolume: (value: SetStateAction<number>) => void
  volume: number
}

export const Right: React.FC<Props> = ({ setVolume, volume }) => {
  return (
    <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
      <VolumeOffIcon
        onClick={() => volume > 0 && setVolume(0)}
        className="button"
      />
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        className="w-14 md:w-28"
        onChange={(e) => setVolume(+e.target.value)}
      />
      <VolumeUpIcon
        onClick={() => volume < 100 && setVolume(100)}
        className="button"
      />
    </div>
  )
}
