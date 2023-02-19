import { FormControl, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ data, setData }) => {
  const [quizId, setQuizId] = useState(0);
  const navigate = useNavigate();
  const { score } = useContext(ScoreContext);
  // const [answer, setAnswer] = useState('');

  const handleNext = (answer) => {
    if (quizId === data.length - 1) {
      navigate('/');
    } else {
      setData((state) => {
        return state.map((item, i) => {
          return i === quizId ? { ...item, selectedAnswerIndex: answer } : item;
        });
      });
      score = score + 1;
      setQuizId(quizId + 1);
    }
  };

  // console.log(data);
  return (
    <main>
      <Paper elevation={5} sx={{ padding: 5, borderRadius: 2 }}>
        <h1>Question {quizId + 1}</h1>
        <h2 dangerouslySetInnerHTML={{ __html: data[quizId].question }}></h2>
        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
            {data[quizId].answers.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                onClick={() => handleNext(item)}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </main>
  );
};

export default Quiz;
