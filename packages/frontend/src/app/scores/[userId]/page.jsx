"use client";

import { useCreateScoreMutation } from 'hst/store/services/scores.api';
import InputField from 'hst/components/atoms/InputField';
import { Button } from 'react-bootstrap';
import {useState} from 'react';

const RegisterScore = (params) => {
    const [score, setScore] = useState(0);
    const [createScore, { isUpdating }] = useCreateScoreMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        var scoreInt = parseInt(score)
        createScore({ id: params.params.userId, scoreInt})
        .then(data => console.log(data))
        .catch(err => console.error(err))
      };

      return (
        <div className="container mt-5 max-width">
          <h2>Registro de puntuación</h2>
          <form onSubmit={handleSubmit}>
          <InputField
              label="Puntuación"
              type="text"
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
      );
}

export default RegisterScore;