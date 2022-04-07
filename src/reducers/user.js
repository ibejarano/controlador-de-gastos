// const mockUser = { username: "mock user", wallets: [] };

export default function UserReducer(state, action) {
  switch (action.type) {
    case "set-user":
      const homeTitle = `Bienvenid@! ${action.payload.username}`;
      const newState = {
        loggedIn: true,
        ...action.payload,
        title: homeTitle,
        refresh: true,
        wallets: [],
      };
      sessionStorage.setItem("expenses-user", JSON.stringify(newState));
      return { ...newState };
    case "set-title":
      return { ...state, title: action.payload };
    case "set-wallets":
      return { ...state, wallets: action.payload };
    case "update-wallet":
      const updatedWallet = action.payload;
      const ind = state.wallets
        .map((wall) => wall._id)
        .indexOf(updatedWallet._id);
      const updatedWallets = [...state.wallets];
      updatedWallets[ind] = updatedWallet;

      return { ...state, wallets: updatedWallets };
    case "set-budgets":
      return { ...state, budgets: action.payload };
    case "update-wallet-budget":
      const { wallet, budget } = action.payload;
      const { wallets, budgets } = state;
      const i = budgets.indexOf((bud) => bud.section === budget.section);
      budgets[i] = budget;
      const j = wallets.indexOf((wall) => wall._id === wallet._id);
      wallets[j] = wallet;
      return { ...state, budgets: budgets, wallets: wallets };
    case "open-wallet":
      return {
        ...state,
        openWallet: true,
        title: action.payload.name,
        walletId: action.payload.id,
      };
    case "close-wallet":
      return {
        ...state,
        openWallet: false,
        title: `Bienvenid@ ${state.username}`,
        refresh: true,
        walletId: null,
      };
    case "delete-wallet":
      const walletidToDelete = action.payload;
      const filteredWallet = state.wallets.filter(
        (w) => w._id !== walletidToDelete
      );
      return { ...state, wallets: filteredWallet };
    default:
      console.log(`no rule defined for ${action.type} action type`);
  }
}
