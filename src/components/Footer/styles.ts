import styled from 'styled-components';

export const FooterContainer = styled.footer`
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		width: 3rem;
		height: 3rem;
		border-radius: 8px;
		border: 3px solid ${(props) => props.theme['green-500']};
		outline: 2px solid ${(props) => props.theme['gray-100']};
		&:hover {
			border: 3px solid ${(props) => props.theme['gray-100']};
			outline: 2px solid ${(props) => props.theme['green-500']};
		}
	}

	span {
		font-size: 1rem;
		font-weight: 400;
		color: ${(props) => props.theme['gray-100']};

		&:hover {
			color: ${(props) => props.theme['green-500']};
		}
	}

	nav {
		display: flex;
		gap: 0.5rem;
		a {
			width: 3rem;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: ${(props) => props.theme['gray-100']};
			border-top: 3px solid transparent;
			border-bottom: 3px solid transparent;
			&.active {
				color: ${(props) => props.theme['green-500']};
			}
			&:hover {
				border-bottom: 3px solid ${(props) => props.theme['green-500']};
				color: ${(props) => props.theme['green-500']};
			}
		}
	}
`;
