// src/components/shared/UserAvatar.jsx
import { useUser } from "@clerk/clerk-react";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.profileImageUrl}
        className="w-8 h-8 rounded-full"
        alt={user?.fullName}
      />
      <span>{user?.fullName}</span>
    </div>
  );
};

export default UserAvatar;
