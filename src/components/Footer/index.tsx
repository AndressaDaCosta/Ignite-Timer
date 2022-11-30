import { FooterContainer } from '../Footer/styles';
import { LinkedinLogo, GithubLogo } from 'phosphor-react';

export function Footer() {
	return (
		<FooterContainer>
			<span>Desenvolvido por AndressaDaCosta - Ignite </span>

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
