export default function budgetReducer(state, action) {
  switch (action.type) {
    case "changeLimit":
      console.log("changing limit");
    case "addSection":
      console.log("adding a new section");
    default:
      console.log(`no rule defined for ${action.type} action type`);
  }
}
