type State = "normal" | "alarmSet" | "alarmSounding" | "snoozing";

type Action = "none" | "soundAlarm" | "stopAlarm";

export class AlarmClock {
  state: State;

  constructor() {
    this.state = "normal";
  }

  transition(newState: State): Action {
    const transitions = {
      normal: {
        alarmSet: "none",
      },
      alarmSet: {
        normal: "none",
        alarmSounding: "soundAlarm",
      },
      alarmSounding: {
        normal: "stopAlarm",
        snoozing: "stopAlarm",
      },
      snoozing: {
        alarmSounding: "soundAlarm",
      },
    };

    const action = transitions[this.state][newState];
    if (action !== undefined) {
      this.state = newState;
    }
    return action || "none";
  }

  setAlarm(): Action {
    return this.transition("alarmSet");
  }

  cancelAlarm(): Action {
    return this.transition("normal");
  }

  reachedToAlarmTime(): Action {
    return this.transition("alarmSounding");
  }

  snooze(): Action {
    return this.transition("snoozing");
  }

  elapseSnoozeTime(): Action {
    return this.transition("alarmSounding");
  }

  getState(): State {
    return this.state;
  }
}
