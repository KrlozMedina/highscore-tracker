"use client";

import { useCreateScoreMutation } from 'hst/store/services/scores.api';
import InputField from 'hst/components/atoms/InputField';
import { Button } from 'react-bootstrap';
import {useState} from 'react';
import MainTemplate from 'hst/components/templates/MainTemplate';

const RegisterScore = (params) => {
    const [score, setScore] = useState(0);
    const [game, setGame] = useState('');
    const [createScore, { isUpdating }] = useCreateScoreMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        var scoreInt = parseInt(score)
        createScore({ id: params.params.userId, score: scoreInt, game})
        .then(data => console.log(data))
        .catch(err => console.error(err))
      };

      return (
        <MainTemplate>
          <div className="container mt-5 max-width">
            <h2>Registro de puntuación</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Juego"
                type="text"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                placeholder="Ingresa juego"
              />
              <InputField
                label="Puntuación"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Ingresa puntuación"
              />
              <Button
                type='submit'
                className='btn-primary'
              >
                Registrar
              </Button>
            </form>
          </div>
        </MainTemplate>
      );
}

export default RegisterScore;