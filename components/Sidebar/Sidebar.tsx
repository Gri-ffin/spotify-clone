import React, { useEffect, useState } from 'react'
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { SidebarButton } from './Button'
import { signOut, useSession } from 'next-auth/react'
import useSpotifyApi from '../../hooks/useSpotifyApi'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../atoms/PlaylistIdState'

const Sidebar: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const { data: session } = useSession()
  const spotifyApi = useSpotifyApi()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((response) => {
        setPlaylists(response.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        <SidebarButton icon={<HomeIcon className="h-5 w-5" />} text="Home" />
        <SidebarButton
          icon={<SearchIcon className="h-5 w-5" />}
          text="Search"
        />
        <SidebarButton
          icon={<LibraryIcon className="h-5 w-5" />}
          text="Your library"
        />
        <hr className="border-t-[0.1px] border-gray-900" />

        <SidebarButton
          icon={<PlusCircleIcon className="h-5 w-5" />}
          text="Create playlists"
        />
        <SidebarButton
          icon={<HeartIcon className="h-5 w-5" />}
          text="Liked songs"
        />
        <SidebarButton
          icon={<RssIcon className="h-5 w-5" />}
          text="Your episodes"
        />
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <p
            className="cursor-pointer hover:text-white"
            key={playlist.id}
            onClick={() => {
              setPlaylistId(playlist.id)
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
