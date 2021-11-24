import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import illustrationImg from '../../assets/illustration.svg';
import logoImg from '../../assets/logo.svg';
import googleIconImg from '../../assets/google-icon.svg';

import styles from './styles.module.scss';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';

export function Home() {
	const { user, signInWithGoogle } = useAuth();
	const navigate = useNavigate();
	const [roomCode, setRoomCode] = useState('');
	const notify = () => toast.error('Room does not exists');
	const roomClosed = () => toast.error('Room already closed');

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		navigate('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			notify();
			return;
		}

		if (roomRef.val().endedAt) {
			roomClosed();
			return;
		}

		navigate(`/rooms/${roomCode}`);
	}

	return (
		<div className={styles.pageAuth}>
			<Toaster position="top-center" reverseOrder={false} />
			<aside>
				<img src={illustrationImg} alt="ilustração de perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>

			<main>
				<div className={styles.mainContent}>
					<img src={logoImg} alt="Letmeask" />

					<button className={styles.createRoom} onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Logo do Google" />
						Crie sua sala com o google
					</button>

					<div className={styles.separator}>ou entre em uma sala</div>

					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite o código da sala"
							onChange={event => setRoomCode(event.target.value)}
							value={undefined}
						/>
						<Button type="submit">Entrar na Sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
