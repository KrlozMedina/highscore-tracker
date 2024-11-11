"use client";

import { useCreateScoreMutation } from 'hst/store/services/scores.api';
import InputField from 'hst/components/atoms/InputField';
import { Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

const RegisterScore = (params) => {
    const [user, setUser] = useState('');
    const [score, setScore] = useState(0);
    const [game, setGame] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [createScore, { isUpdating }] = useCreateScoreMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        var scoreInt = parseInt(score)
        createScore({ user, score, game })
            .then(data => {
                setAlertVariant('success');
                setAlertMessage('¡Puntuación guardado exitosamente!');
                setShowAlert(true);
            })
            .catch(err => {
                setAlertVariant('danger');
                setAlertMessage('Hubo un error al guardar la puntuación.');
                setShowAlert(true);
            })
    };

    return (
        <div className="container mt-5 max-width">
            <h2>Registro de puntuación</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Usuario"
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Ingresa juego"
                />
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

            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
}

export default RegisterScore;