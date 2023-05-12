import * as S from './styles'

export default function Main({
  title = 'React Avançado',
  description = 'Jest, Typescript, ReactJS, NextJS e Styled Component'
}) {
  return (
    <S.Wrapper>
      <S.Logo
        src="/img/logo.svg"
        alt="Imagem de um átomo e React Avançado escrito ao lado."
      />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Illustration
        src="/img/hero-illustration.svg"
        alt="Um desenvolvedor de frente para a tela com o código"
      />
    </S.Wrapper>
  )
}
