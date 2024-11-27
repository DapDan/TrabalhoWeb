"use client"

import '@/app/page.css'
import '@/styles/Card.css'
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import axios from "axios"
import { useState } from "react";
import Card from '@/components/Card';

interface Livro {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export default function Home() {
  const [livro, setLivro] = useState(""); // Estado para o input de busca
  const [livros, setLivros] = useState<Livro[]>([]); // Estado com tipagem para os resultados

  //const numLivros = 9; nao precisa pq estou fazendo isso lá no 'try'

  const buscaLivros = async () => {
    //caso o input esteja vazio
    if (livro.trim() === "") {
      alert("Por favor, insira o nome de um livro.");
      return;
    }

    try {
      const resposta = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${livro}&maxResults=9`);
      setLivros(resposta.data.items || []);
      console.log(resposta.data.items);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      alert("Não foi possível buscar os livros. Tente novamente mais tarde.");
    }
  }


  return (
    <>
      <main>
        <header>
          <Image src="/LogoBlack.png" alt='Logo do site BookHub' width={40} height={40} />
          <div id='login-cadast'>
            <Link href={'/user/create'}>Cadastrar</Link>
            <Link href={'/user/login'}>Entrar</Link>
          </div>
        </header>

        <div id='apresentacao'>
          <div id='titulo'>
            <h2 id='book-hub'>BookHub</h2>
            <p>Sua estante digital, pensada para quem <span className='fundo-verde'>ama ler!</span></p>
          </div>
          <Image id='img-apres' src="/ilustracao.jpg" alt='Ilustração menina voando em livros' width={232} height={200} />
        </div>
        <div className='search-container'>
          <input type="text" className='search-bar' placeholder='Encontre sua próxima história...' value={livro}
            onChange={(e) => setLivro(e.target.value)}/>
          <button className='search-btn'><FontAwesomeIcon icon={faMagnifyingGlass} id='lupa' onClick={buscaLivros}/></button>
        </div>

        {livros.length > 0 && <p id="search-title">Resultados da sua pesquisa:</p>}
        <section id='search-results'>
        {livros.map((item) => (
          <Card
            key={item.id}
            titulo={item.volumeInfo.title}
            autor={item.volumeInfo.authors?.join(", ") || "Autor desconhecido"}
            ano={item.volumeInfo.publishedDate || "Data desconhecida"}
            imagem={item.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"} // Exibe uma imagem padrão caso não exista
          />
        ))}
        </section>
      </main>
    </>
  );
}