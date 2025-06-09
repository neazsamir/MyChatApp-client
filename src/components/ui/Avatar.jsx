export const Avatar = ({avatar, active}) => {
  return (
    <div className="relative w-14 h-14 rounded-full ">
			 <img
		    src={avatar}
		    alt="avatar"
		    className="w-full h-full object-cover rounded-full"
		  />
		  {active && (
		    <span className="absolute right-1 top-1 block h-3 w-3 rounded-full bg-green-500 ring-4 ring-white z-10" />
		  )}
			</div>
  )
}