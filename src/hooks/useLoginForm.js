import { useEffect, useState } from 'react';

export default function useLoginForm() {
  // Redireciona usuário ao clicar no botão
  const [redirect, setRedirect] = useState(false);
  // Cuida dos inputs de email e senha
  const [data, setData] = useState({
    email: '',
    // password: '',
  });
  const [valid, setValid] = useState(false);

  // Checa se os dados são válidos
  useEffect(() => {
    // const { email, password } = data;
    const { email } = data;
    const validEmail = /^[A-Za-z0-9._]+@([A-Za-z]+\.)[A-Za-z]{2,3}(\.[A-Za-z]{2})?$/;
    // const validPassword = 6;
    // if (validEmail.test(email) && password.length > validPassword) {
    if (validEmail.test(email)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);

  // Lida com os inputs do usuário e registra no estado
  function handleChange({ target: { name, value } }) {
    setData({
      ...data,
      [name]: value,
    });
  }

  // Seta o email e os tokens no localStorage, e, depois disso redireciona usuário
  function handleSubmit() {
    localStorage.setItem('user', JSON.stringify({ email: data.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setRedirect(true);
  }

  return [redirect, valid, handleChange, handleSubmit];
}
