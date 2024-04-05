import { defer } from "react-router-dom";

import { appAxios } from "./appAxios";

export const singlePageLoader = async ({ _, params }) => {
  const res = await appAxios(`/posts/${params.id}`);
  return res.data;
};

// defer work in only initial loading.

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const postPromise = appAxios(`/posts?${query}`);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = appAxios("/users/profilePosts");
  const chatPromise = appAxios("/chats");

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
