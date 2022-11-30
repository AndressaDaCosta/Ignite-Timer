import { HeaderContainer } from './styles';
import { Scroll, Timer } from 'phosphor-react';

import logoIgnite from '../../assets/logo-ignite.svg';
import { NavLink } from 'react-router-dom';

export function Header() {
	return (
		<HeaderContainer>
			<span>
				<img
					src={logoIgnite}
					alt=""
				/>
				<span>Ignite Timer</span>
			</span>

			<nav>
				<NavLink
					to="/"
					end
					title="Timer">
					<Timer size={24} />
				</NavLink>
				<NavLink
					to="/history"
					title="Histórico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	);
}
