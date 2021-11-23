import styles from './styles.module.scss';

import copyImg from '../../assets/copy.svg';

type RoomCodeProps = {
	code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code);
	}

	return (
		<button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala: #{code}</span>
		</button>
	);
}
