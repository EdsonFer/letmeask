import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import styles from '../styles/newRoom.module.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';

export function NewRoom() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [newRoom, setNewRoom] = useState('');

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		navigate(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div className={styles.pageAuth}>
			<aside>
				<img src={illustrationImg} alt="ilustração de perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>

			<main>
				<div className={styles.mainContent}>
					<img src={logoImg} alt="Let me ask" />

					<h2>Criar uma Nova Sala</h2>

					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da Sala"
							onChange={event => setNewRoom(event.target.value)}
							value={undefined}
						/>
						<Button type="submit">Criar Sala</Button>
					</form>

					<p>
						Quer entrar em uma sala já existente?
						<Link to="/"> Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
