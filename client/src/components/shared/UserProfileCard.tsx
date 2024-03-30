import userProfile from "/user-profile-image.png";

interface UserProfileProps {
    creator: {
        firstName?: string ,
        lastName?: string ,
        image?: string ,
    }
}

const UserProfileCard = ({creator}: UserProfileProps) => {
  return (
      <div className="w-full p-2 rounded-md shadow-md flex gap-2">
          <img
              src={creator.image ? creator.image : userProfile}
              alt="profile image"
              className="sm:h-[100px] sm:w-[100px] h-[50px] w-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col w-full flex flex-col justify-center py-2">
              <h3 className="font-semibold text-gray-700 text-[10px]">POSTED BY</h3>
              <p className="font-semibold text-n-3">{creator.firstName} {creator.lastName}</p>
          </div>
    </div>
  )
}

export default UserProfileCard