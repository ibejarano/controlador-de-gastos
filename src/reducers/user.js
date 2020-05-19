// const mockUser = { username: "mock user", wallets: [] };

export default function UserReducer(state, action) {
  switch (action.type) {
    case "set-user":
      const newState = { loggedIn: true, ...action.payload };
      sessionStorage.setItem("expenses-user", JSON.stringify(newState));
      return { ...newState };
    case "update-wallet-budget":
      const { wallet, budget } = action.payload;
      const {wallets, budgets} = state;
      const i = budgets.indexOf(bud => bud.section === budget.section);
      budgets[i] = budget;
      const j = wallets.indexOf(wall => wall._id === wallet._id)
      wallets[j] = wallet
      return { ...state, budgets: budgets, wallets: wallets };
    default:
      console.log(`no rule defined for ${action.type} action type`);
  }
}
