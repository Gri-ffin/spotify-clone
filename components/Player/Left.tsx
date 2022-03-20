import React from 'react'

export const Left: React.FC<{ songInfo: any }> = ({ songInfo }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={songInfo?.album?.images?.[0]?.url}
        className="hidden h-10 w-10 md:inline"
        alt=""
      />
      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
    </div>
  )
}
