import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [itens, setItens] = useState([]);  // Estado que guarda os itens da lista
  const [novoItem, setNovoItem] = useState('');  // Estado para o valor do novo item
  const [editandoItem, setEditandoItem] = useState(null);  // Estado para controlar qual item está sendo editado

  // Função para adicionar ou editar item na lista
  const adicionarOuEditarItem = (e) => {
    e.preventDefault();
    if (!novoItem) return;

    if (editandoItem !== null) {
      const itensAtualizados = itens.map((item, index) =>
        index === editandoItem ? novoItem : item
      );
      setItens(itensAtualizados);
      setEditandoItem(null);  // Reseta o modo de edição
    } else {
      setItens([...itens, novoItem]);  // Adiciona novo item se não estiver no modo de edição
    }

    setNovoItem('');  // Limpa o campo após adicionar ou editar
  };

  // Função para iniciar a edição de um item
  const iniciarEdicao = (index) => {
    setNovoItem(itens[index]);  // Preenche o campo com o valor do item selecionado
    setEditandoItem(index);  // Define o item que será editado
  };

  // Função para remover um item
  const removerItem = (index) => {
    const itensAtualizados = itens.filter((item, i) => i !== index);
    setItens(itensAtualizados);
  };

  return (
    <div>
      {/* Componente Header */}
      <Header titulo="Meu Projeto React: Adicionar, Editar e Remover Itens" />

      {/* Componente Formulário */}
      <Formulario
        novoItem={novoItem}
        setNovoItem={setNovoItem}
        handleSubmit={adicionarOuEditarItem}
        editando={editandoItem !== null}
      />

      {/* Componente Lista */}
      <Lista>
        {itens.map((item, index) => (
          <ItemLista
            key={index}
            item={item}
            editar={() => iniciarEdicao(index)}
            remover={() => removerItem(index)}
          />
        ))}
      </Lista>
    </div>
  );
}

function Header(props) {
  return (
    <header>
      <h1>{props.titulo}</h1>  {/* O título é passado como props */}
    </header>
  );
}

function Formulario({ novoItem, setNovoItem, handleSubmit, editando }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione ou edite um item"
        value={novoItem}
        onChange={(e) => setNovoItem(e.target.value)}  // Atualiza o valor do campo
      />
      <button type="submit">
        {editando ? 'Editar' : 'Adicionar'}  {/* Muda o texto do botão com base no modo de edição */}
      </button>
    </form>
  );
}

function Lista({ children }) {
  return (
    <ul>
      {children}  {/* Renderiza os itens passados como children */}
    </ul>
  );
}

function ItemLista({ item, editar, remover }) {
  return (
    <li>
      {item}
      <button onClick={editar} style={{ marginLeft: '10px' }}>Editar</button>
      <button onClick={remover} style={{ marginLeft: '10px' }}>Remover</button>
    </li>
  );
}

export default App;
