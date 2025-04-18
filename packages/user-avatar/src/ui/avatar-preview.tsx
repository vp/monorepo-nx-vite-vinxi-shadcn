export const AvatarPreview = ({ avatarUrl }: { avatarUrl?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Profile Avatar"
          className="h-60 w-60 rounded-full object-cover"
        />
      )}
    </div>
  );
};
