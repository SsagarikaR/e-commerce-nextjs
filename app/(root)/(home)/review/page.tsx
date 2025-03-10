import AddReview from "@/app/components/review/AddReview";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: { pid: string };
}) => {
  const params = await searchParams;
  const pid = params.pid;

  return (
    <div className="w-screen pt-20 dark:bg-gray-700 min-h-screen">
      <AddReview pid={pid} />
    </div>
  );
};

export default ProfilePage;
