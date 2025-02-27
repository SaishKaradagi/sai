import React from "react";

const UserAvatar = ({ email, displayName }) => {
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
      {displayName ? getInitials(displayName) : email[0].toUpperCase()}
    </div>
  );
};

export default UserAvatar;
