export function holidayDecisionAtIf(weekday) {
  if (weekday === "土" || weekday === "日") return true;
  else return false;
}

export function holidayDecisionAtSwitch(weekday) {
  switch (weekday) {
    case "土":
    case "日":
      return true;
    default:
      return false;
  }
}
