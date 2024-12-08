import SocialPostCard from "../../components/SocialPostCard";
import { useGetSocialPosts } from "../../hooks/useGetSocialPosts";

export default function LatestSocialPostsPage() {
  const { data: postsData, isLoading } = useGetSocialPosts();

  if (!postsData || isLoading) {
    return;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {postsData.map((post) => (
        <SocialPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
