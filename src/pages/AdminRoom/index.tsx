import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import deleteImg from '../../assets/delete.svg';
import checkImg from '../../assets/check.svg';
import answerImg from '../../assets/answer.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useNavigate, useParams } from 'react-router';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

export function AdminRoom() {
	const params = useParams() as {
		id: string;
	};
	const roomId = params.id;
	const navigate = useNavigate();

	const { questions, title } = useRoom(roomId);

	async function handleEndRoom() {
		if (window.confirm('Tem certeza que deseja encerrar essa sala?')) {
			database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			});
			navigate('/');
		}
	}

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	async function handleCheckQuestionAsAnswered(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: true,
		});
	}

	async function handleHighlightQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighLighted: true,
		});
	}

	return (
		<div className={styles.pageRoom}>
			<header>
				<div className={styles.content}>
					<img src={logoImg} alt="Let me ask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar Sala
						</Button>
					</div>
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

				<div className={styles.questionList}>
					{questions.map(question => {
						return (
							<Question
								key={question.id}
								content={question.content}
								author={question.author}
								isAnswered={question.isAnswered}
								isHighLighted={question.isHighLighted}
							>
								{!question.isAnswered && (
									<>
										<button
											type="button"
											onClick={() => handleCheckQuestionAsAnswered(question.id)}
										>
											<img
												src={checkImg}
												alt="Marcar pergunta como respondida"
											/>
										</button>

										<button
											type="button"
											onClick={() => handleHighlightQuestion(question.id)}
										>
											<img src={answerImg} alt="Dar destaque à Pergunta" />
										</button>
									</>
								)}

								<button
									type="button"
									onClick={() => handleDeleteQuestion(question.id)}
								>
									<img src={deleteImg} alt="Remover Pergunta" />
								</button>
							</Question>
						);
					})}
				</div>
			</main>
		</div>
	);
}
