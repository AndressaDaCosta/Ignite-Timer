import { FooterContainer } from '../Footer/styles';
import { LinkedinLogo, GithubLogo } from 'phosphor-react';

export function Footer() {
	return (
		<FooterContainer>
			<a
				href="https://github.com/AndressaDaCosta"
				target="_blank"
				rel="noopener noreferrer">
				<img
					src="https://github.com/AndressaDaCosta.png"
					alt="Foto Avatar AndressaDaCosta"
				/>
			</a>
			<span>Desenvolvido por Andressa Da Costa</span>
			<nav>
				<a
					href="https://www.linkedin.com/in/andressa-da-costa"
					target="_blank"
					rel="noopener noreferrer"
					title="LinkedinLogo">
					<LinkedinLogo size={24} />
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/AndressaDaCosta"
					title="GithubLogo ">
					<GithubLogo size={24} />
				</a>
			</nav>
		</FooterContainer>
	);
}
