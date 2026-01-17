const NavbarItem = ({
  name,
  icon,
}: {
  name: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="col-span-1 flex items-center justify-center">
      <div className="text-center">
        {icon}
        {name}
      </div>
    </div>
  )
}

// TODO(jas): navbar
export const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 container grid h-[80px] w-full max-w-[430px] grid-cols-3 bg-white">
      <NavbarItem name="Explore" />
      <NavbarItem name="Categories" />
      <NavbarItem name="Profile" />
    </div>
  )
}
