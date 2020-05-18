// const mockUser = { username: "mock user", wallets: [] };

export default function UserReducer(state, action) {
  switch (action.type) {
    case "set-user":
      const newState = { loggedIn: true, ...action.payload };
      sessionStorage.setItem("expenses-user", JSON.stringify(newState));
      return { ...newState };
    case "update-budget":
      return { ...state, budget: action.budget };
    default:
      console.log(`no rule defined for ${action.type} action type`);
  }
}
