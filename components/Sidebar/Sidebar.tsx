import React from 'react'
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

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5 text-sm text-gray-500">
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

        {/* Playlists */}
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
      </div>
    </div>
  )
}

export default Sidebar
