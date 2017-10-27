import {
  POST_CREATE_REQUEST,
  POST_CREATE_FALIED,
  POST_CREATE_SUCCESS,
  POST_UPDATE_REQUEST,
  POST_UPDATE_FALIED,
  POST_UPDATE_SUCCESS,
  SET_POST
} from "./mutantion-types";
import { createPost, updatePost } from "@/service/postService";

const state = {
  post: {},
  errors: []
};

const mutations = {
  POST_CREATE_REQUEST(state, payload) {
    state.loading = payload;
  },
  POST_CREATE_SUCCESS(state, payload) {
    state.post = payload;
  },
  POST_CREATE_FALIED(state) {
    state.error = "failed to create post";
  },
  POST_UPDATE_REQUEST(state, payload) {
    state.loading = payload;
  },
  POST_UPDATE_SUCCESS(state, payload) {
    state.post = payload;
  },
  POST_UPDATE_FALIED(state) {
    state.errors = "failed to update post";
  },
  SET_POST(state, payload) {
    state.post = payload;
  }
};

const actions = {
  setPost({ commit }, payload) {
    commit("SET_POST", payload);
  },
  updatePost({ commit }, payload) {
    commit("POST_UPDATE_REQUEST", true);
    return new Promise((resolve, reject) => {
      updatePost(payload)
        .then(post => {
          commit("POST_UPDATE_REQUEST", false);
          commit("POST_UPDATE_SUCCESS", post);
          resolve(post);
        })
        .catch(error => {
          commit("POST_UPDATE_REQUEST", false);
          commit("POST_UPDATE_FALIED");
          reject();
        });
    });
  },
  createPost({ commit }, payload) {
    commit("POST_CREATE_REQUEST", true);
    return new Promise((resolve, reject) => {
      createPost(payload)
        .then(post => {
          commit("POST_CREATE_REQUEST", false);
          commit("POST_CREATE_SUCCESS", post);
          resolve(post);
        })
        .catch(error => {
          commit("POST_CREATE_REQUEST", false);
          commit("POST_CREATE_FALIED");
          reject();
        });
    });
  }
};

const getters = {};

const module = {
  state,
  mutations,
  actions,
  getters
};

export default module;
