import api from "./api";

export function getUserById(id) {
  return api.get(`users/${id}`);
}

export function getUserPosts(id) {
  return api.get(`users/${id}/posts`);
}

export function testAccess() {
  return api.get("protected");
}
