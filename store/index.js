export const strict = false;
export const state = () => ({
  login: true,
  user: [{ auth: 0, email: "null" }],
});

export const mutations = {
  login(state, val) {
    state.login = val;
  },
  user(state, val) {
    state.user = val;
  },
  update(state, val) {
    state.user[0].favorite = val;
  },
};
