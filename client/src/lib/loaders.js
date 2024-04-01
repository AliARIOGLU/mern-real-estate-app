import { appAxios } from "./appAxios";

export const singlePageLoader = async ({ _, params }) => {
  const res = await appAxios(`/posts/${params.id}`);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = await appAxios(`/posts?${query}`);
  return res.data;
};
