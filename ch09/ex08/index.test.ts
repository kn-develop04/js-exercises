import { AlarmClock } from ".";

describe("AlarmClock クラス", () => {
  let alarmClock: AlarmClock;

  beforeEach(() => {
    alarmClock = new AlarmClock();
  });

  it("初期状態は正常であること", () => {
    expect(alarmClock.getState()).toBe("normal");
  });

  it("アラームを設定するとアラームセット中の状態になること", () => {
    expect(alarmClock.setAlarm()).toBe("none");
    expect(alarmClock.getState()).toBe("alarmSet");
  });

  it("アラームセット中にアラームをキャンセルすると、通常状態に戻ること", () => {
    alarmClock.setAlarm();
    expect(alarmClock.cancelAlarm()).toBe("none");
    expect(alarmClock.getState()).toBe("normal");
  });

  it("アラーム鳴動中にアラームを停止すると、通常状態に戻ること", () => {
    alarmClock.setAlarm();
    alarmClock.reachedToAlarmTime();
    expect(alarmClock.cancelAlarm()).toBe("stopAlarm");
    expect(alarmClock.getState()).toBe("normal");
  });

  it("アラーム鳴動中にスヌーズすると、スヌーズ中の状態になること", () => {
    alarmClock.setAlarm();
    alarmClock.reachedToAlarmTime();
    expect(alarmClock.snooze()).toBe("stopAlarm");
    expect(alarmClock.getState()).toBe("snoozing");
  });

  it("スヌーズ中にスヌーズ時間が経過すると、再びアラームが鳴動すること", () => {
    alarmClock.setAlarm();
    alarmClock.reachedToAlarmTime();
    alarmClock.snooze();
    expect(alarmClock.elapseSnoozeTime()).toBe("soundAlarm");
    expect(alarmClock.getState()).toBe("alarmSounding");
  });
});
