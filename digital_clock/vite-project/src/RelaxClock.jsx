import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaRegClock } from "react-icons/fa"; // アイコンの追加
import ShareButton from "./ShareButton";

export default function RelaxClock() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const audio = new Audio("/alert.mp3");
  const [audioPlayed, setAudioPlayed] = useState(false);
  
  const [goalCycles, setGoalCycles] = useState(3);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [points, setPoints] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      setTime(isBreak ? breakTime * 60 : workTime * 60);
    }
  }, [workTime, breakTime, isBreak, isRunning]);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0 && isRunning) {
      audio.loop = false;
      if (!audioPlayed) {
        audio.play();
        setAudioPlayed(true);
      }
      setIsRunning(false);
      setShowModal(true);
      setProgressData((prev) => [...prev, { name: `Cycle ${prev.length + 1}`, uv: workTime }]);

      if (!isBreak) {
        setCompletedCycles((prev) => prev + 1);
        if (completedCycles + 1 >= goalCycles) {
          setPoints((prev) => prev + 10);
        }
      }
    }
  }, [time, isRunning, audio, audioPlayed, isBreak, workTime, completedCycles, goalCycles]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleModalOk = () => {
    setShowModal(false);
    if (isBreak) {
      setIsBreak(false);
      setTime(workTime * 60);
    } else {
      setIsBreak(true);
      setTime(breakTime * 60);
    }
    setIsRunning(true);
    setAudioPlayed(false);
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white p-4 flex flex-col items-center justify-between">
      {/* 上部：現在時刻 */}
      <div className="w-full flex justify-between items-center">
        <div className="text-xl font-mono">{currentTime.toLocaleTimeString()}</div>
      </div>

      {/* 中央：タイマーと操作ボタン */}
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-xl mb-6 text-center">
          <h1 className="text-3xl font-bold mb-4">ポモドーロタイマー</h1>
          <div className="text-6xl font-mono mb-4">
            {isBreak ? "休憩タイムです" : formatTime(time)}
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setIsRunning(!isRunning)} 
              className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
            >
              {isRunning ? "一時停止" : "スタート"}
            </button>
            <button
              onClick={() => { 
                setTime(workTime * 60);
                setIsRunning(false);
                setIsBreak(false);
                setAudioPlayed(false);
                audio.pause();
                audio.currentTime = 0;
              }}
              className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-red-600"
            >
              リセット
            </button>
            <ShareButton completedCycles={completedCycles} points={points} />
          </div>
        </div>

        {/* カスタマイズ設定と目標・報酬を横並びに */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-6">
          {/* カスタマイズ設定 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">カスタマイズ設定</h2>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-semibold">作業時間（分）:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={workTime}
                  onChange={(e) => setWorkTime(Number(e.target.value))}
                  className="w-full bg-blue-500 rounded-lg"
                />
                <div className="relative flex items-center w-24">
                  <input
                    type="number"
                    value={workTime}
                    onChange={(e) => setWorkTime(Number(e.target.value))}
                    className="p-2 text-black bg-gray-700 rounded w-full pl-8"
                    style={{ minWidth: "60px", maxWidth: "100px" }} // 横幅の制限を追加
                  />
                  <FaRegClock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <span className="text-lg font-semibold">{workTime} 分</span>
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">休憩時間（分）:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  className="w-full bg-green-500 rounded-lg"
                />
                <div className="relative flex items-center w-24">
                  <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(Number(e.target.value))}
                    className="p-2 text-black bg-gray-700 rounded w-full pl-8"
                    style={{ minWidth: "60px", maxWidth: "100px" }} // 横幅の制限を追加
                  />
                  <FaRegClock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <span className="text-lg font-semibold">{breakTime} 分</span>
            </div>
          </div>

          {/* 目標 & 報酬 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">目標 & 報酬</h2>
            <div className="mb-4">
              <label className="block mb-2 text-lg font-semibold">目標サイクル数:</label>
              <input
                type="number"
                value={goalCycles}
                onChange={(e) => setGoalCycles(Number(e.target.value))}
                className="p-2 text-black w-full bg-gray-700 rounded"
              />
            </div>
            <p>達成したサイクル: {completedCycles} / {goalCycles}</p>
            <p>獲得ポイント: {points}</p>
          </div>
        </div>

        {/* プログレスグラフ */}
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 下部：ShareButton */}
      <div className="w-full flex justify-center">
        <ShareButton completedCycles={completedCycles} points={points} />
      </div>

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black rounded p-6 max-w-sm mx-auto">
            <p className="mb-4">
              {isBreak ? "休憩が終了しました。次は作業タイムです！" : "作業サイクルが終了しました。休憩タイムに入ります。"}
            </p>
            <button 
              onClick={handleModalOk} 
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
