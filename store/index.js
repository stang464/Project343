export const state = () => ({
  login: true,
  email: "",
});

export const mutations = {
  login(state, val) {
    state.login = val;
  },
  email(state, val) {
    state.email = val;
  },
};
