import React, { useState} from "react";
import { NextPage, GetStaticProps } from "next";
import { Button, Card } from "@nextui-org/react";
import { Inter } from "@next/font/google";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import Image from "next/image";


interface Props {
  pokemons: SmallPokemon[];
  idPokemon: number;

}

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage<Props> = ({ pokemons, idPokemon }) => {
  const [count, setCount] = useState(idPokemon);
  const nameAleatorio = pokemons[idPokemon + count].name;

  const padreaHijo = () => {

    setCount(Math.floor(Math.random() * 10));
  }; 
  
  let correcto = "<h2>Es correcto!!✨🎆🎨🤩</h2>"
  let incorrecto = "<h2>Vuelve a intentarlo!</h2>"
  
  
  const pokemonCorrecto = (id:number) => {
    let identificador = document.getElementById("pass")   
    console.log("id " + id)


    
    if (count===(id-1) && identificador!=null) {  
      console.log("Valor count" + count)
      console.log("Valor id" + (id))
      identificador.style.transition= "all 2s"
      identificador.style.transform= "rotate(360deg)"
      identificador.innerHTML  = correcto;

    }else{

      if (identificador !=null) {
        console.log("Valor count " + count)
        console.log("Valor id " + (id))
        identificador.style.transition= "all 2s"
        identificador.style.transform= "rotate(360deg)"  
        identificador.innerHTML = incorrecto;        
      }
    };

  };

  
  //No hace ni caso, nota el document.element no me deja que este fuera de la función.
  const pokemonClick = () => {

    let identificador = document.getElementById("pass")     

    if (identificador !=null) {
      identificador.style.transition= "all 2s"
      identificador.style.transform= "rotate(360deg)"

    }
  }

  return (
    // onClick esta deprecated ahora se usa onPress()
    <>
      <Layout title="Pokemon Game">
        <h3>Busca este pokemon:</h3>
        <Button id="buttonChoise" color="gradient" onPress={() => padreaHijo()}>
          {nameAleatorio}
        </Button>                
        <Card id="pass" onChange={pokemonClick}><h2>Será el pokemon correcto?</h2></Card>
   
        <ul className="cartaPokemon">
          {pokemons.map(({ id, name, img }) => (
            <li key={id}>
              {/* {id + 1}-{name} */}
              <Image
                src={img}
                alt="icono de Pokemon"
                width={100}
                height={100}
                priority
              />
              <Button
                id="buttonChoise"
                color="gradient"
                onPress={() => pokemonCorrecto(id)}
              
              >
                {/* {name} */}
                ¿Soy yo?
              </Button>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
};

//función para que la página renderice más rapido, nextgetStaticProps snippet SOLO SE EJECUTA DEL LADO DEL SERVIDOR
//SOLO SE PUEDE USAR DENTRO DE LAS PAGES, NO EN LOS COMPONENTS.

//Aquí se cargarian previamente los pokemons para que el cliente en cuanto este cargada la pagina ya le vaya bien.

//Instalamos axios para poder traer los pokemons pero tb se podría hacer con un fetch. yarn add axios
export const getStaticProps: GetStaticProps = async (ctx) => {
  // your fetch function here
  // tipamos el get con los datos que creamos en la carpeta interfaces

  let idPokemon = 1;

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=30");

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));
  return {
    props: {
      pokemons,
      idPokemon,
    },
 
  };
};

export default HomePage;
