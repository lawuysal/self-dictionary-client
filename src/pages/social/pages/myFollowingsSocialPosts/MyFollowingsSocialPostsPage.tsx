import SocialPostCard from "../../components/SocialPostCard";
import { PostType } from "../../enum/postType";
import { useGetSocialPosts } from "../../hooks/useGetSocialPosts";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MyFollowingsSocialPostsPage() {
  const {
    data: postsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetSocialPosts(PostType.MY_FOLLOWINGS);

  if (!postsData || isLoading) {
    return;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <InfiniteScroll
        dataLength={postsData.pages.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center">
            {postsData.pages[0].length === 0
              ? "No posts found"
              : "Yay! You have seen it all"}
          </p>
        }
        className="mb-48 flex w-full flex-col gap-4"
      >
        {postsData.pages.map((page) =>
          page.map((post) => (
            <SocialPostCard
              key={post.id + PostType.MY_FOLLOWINGS}
              post={post}
            />
          )),
        )}
      </InfiniteScroll>
    </div>
  );
}
