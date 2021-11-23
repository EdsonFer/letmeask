import styles from '../styles/room.module.scss';
import toast, { Toaster } from 'react-hot-toast';
import logoImg from '../assets/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import { useParams } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string;
			avatar: string;
		};
		content: string;
		isAnswered: string;
		isHighLighted: boolean;
	}
>;

type Question = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: string;
	isHighLighted: boolean;
};

export function Room() {
	const params = useParams() as {
		id: string;
	};
	const roomId = params.id;
	const [newQuestion, setNewQuestion] = useState('');
	const [questions, setQuestions] = useState<Question[]>([]);
	const [title, setTitle] = useState('');
	const { user } = useAuth();

	const notify = () => toast.error('You must be logged in');

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`);

		roomRef.on('value', room => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions).map(
				([key, value]) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighLighted: value.isHighLighted,
						isAnswered: value.isAnswered,
					};
				}
			);
			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		});
	}, [roomId]);

	async function handleSendQuestion(event: FormEvent) {
		event.preventDefault();

		if (newQuestion.trim() === '') {
			return;
		}

		if (!user) {
			notify();
		}

		const question = {
			content: newQuestion,
			author: {
				name: user?.name,
				avatar: user?.avatar,
			},
			isHighLighted: false,
			isAnswered: false,
		};

		await database.ref(`rooms/${roomId}/questions`).push(question);
		setNewQuestion('');
	}

	return (
		<div className={styles.pageRoom}>
			<Toaster position="top-left" reverseOrder={false} />
			<header>
				<div className={styles.content}>
					<img src={logoImg} alt="Let me ask" />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className={styles.roomTitle}>
					<h1>Sala {title}</h1>

					{questions.length > 0 && (
						<span>
							{questions.length} Pergunta{questions.length > 1 ? `s` : ''}
						</span>
					)}
				</div>

				<form onSubmit={handleSendQuestion}>
					<textarea
						placeholder="O que você quer perguntar?"
						onChange={event => setNewQuestion(event.target.value)}
						value={newQuestion}
					/>

					<div className={styles.formFooter}>
						{user ? (
							<div className={styles.userInfo}>
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta, <button>faça seu login</button>.
							</span>
						)}
						<Button type="submit" disabled={!user}>
							Enviar Pergunta
						</Button>
					</div>
				</form>
				{JSON.stringify(questions)}
			</main>
		</div>
	);
}
