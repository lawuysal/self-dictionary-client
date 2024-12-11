import SocialPostCard from "@/pages/social/components/SocialPostCard";
import { PostType } from "@/pages/social/enum/postType";
import { useGetSocialPosts } from "@/pages/social/hooks/useGetSocialPosts";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserPostsByUsername({
  username,
}: {
  username: string;
}) {
  const {
    data: postsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetSocialPosts(PostType.USERS_POSTS, username);

  if (!postsData || isLoading) {
    return;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="pl-5 text-lg font-semibold">Social Posts</p>
      <InfiniteScroll
        dataLength={postsData.pages.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center">
            {" "}
            <p className="text-center">
              {postsData.pages[0].length === 0
                ? "No posts found"
                : "Yay! You have seen it all"}
            </p>
          </p>
        }
        className="mb-48 flex w-full flex-col gap-4"
      >
        {postsData.pages.map((page) =>
          page.map((post) => (
            <SocialPostCard key={post.id + PostType.MY_POSTS} post={post} />
          )),
        )}
      </InfiniteScroll>
    </div>
  );
}
