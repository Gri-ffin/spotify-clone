interface Props {
  text: string
  icon: JSX.Element
}

export const SidebarButton: React.FC<Props> = ({ icon, text }) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      {icon}
      <p>{text}</p>
    </button>
  )
}
