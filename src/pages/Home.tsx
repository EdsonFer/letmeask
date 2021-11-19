import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';

import styles from '../styles/auth.module.scss';

export function Home() {
	return (
		<div className={styles.pageAuth}>
			<aside>
				<img src={illustrationImg} alt="ilustração de perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>
			<main>
				<div>
					<img src={logoImg} alt="Letmeask" />
					<button>
						<img src={googleIconImg} alt="Logo do Google" />
						Crie sua sala com o google
					</button>
					<div>ou entre em uma sala</div>
					<form>
						<input type="text" placeholder="Digite o código da sala" />
						<button type="submit">Entrar na sala</button>
					</form>
				</div>
			</main>
		</div>
	);
}