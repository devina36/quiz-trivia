import axios from 'axios';
import { useState } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';

const ScoreContext = createContext();

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple`).then((res) => {
        setData(
          res.data.results.map((obj, i) => {
            return {
              questionNumber: i,
              question: obj.question,
              answers: obj.incorrect_answers.concat(obj.correct_answer).sort(),
              correctAnswer: obj.correct_answer,
              selectedAnswerIndex: null,
            };
          })
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <ScoreContext.Provider value={score}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Protected children={<Home />} />} />
          <Route path="/quiz" element={<Quiz data={data} setData={setData} />} />
        </Routes>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
