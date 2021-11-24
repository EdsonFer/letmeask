import { ReactNode } from 'react';
import classnames from 'classnames';
import './styles.scss';

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
	isHighLighted?: boolean;
	isAnswered?: boolean;
};

export function Question({
	content,
	author,
	children,
	isHighLighted = false,
	isAnswered = false,
}: QuestionProps) {
	return (
		<div
			className={classnames(
				'Question',
				{ answered: isAnswered },
				{ highlighted: isHighLighted && !isAnswered }
			)}
		>
			<p>{content}</p>
			<footer>
				<div className="userInfo">
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</div>
	);
}
