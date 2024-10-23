"use client";

import { useCreateScoreMutation } from 'hst/store/services/scores.api';
import InputField from 'hst/components/atoms/InputField';
import Button from 'hst/components/atoms/Button';
import {useState} from 'react';

const RegisterScore = () => {
    const [score, setScore] = useState(0);
    const [createScore, {isUpdating}] = useCreateScoreMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        createScore({score})
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
              text="Registrar"
              type='submit'
            />
          </form>
        </div>
      );
}

export default RegisterScore;