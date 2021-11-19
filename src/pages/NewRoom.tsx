import { Link } from 'react-router-dom';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import styles from '../styles/newRoom.module.scss';
import { Button } from '../components/Button';

export function NewRoom() {
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

					<form>
						<input type="text" placeholder="Nome da Sala" />
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
