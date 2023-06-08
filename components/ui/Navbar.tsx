import React, { FC } from 'react'
import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";


export const Navbar= () => {  

  let count = 5;

  //Importamos colores de NextUI
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0x 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      {/* Esto lo obtenemos de la PokeApi https://pokeapi.co/, lo pasamos por Postman y en los sprites
      obtenemos la url en front_default. Tengo que darle permiso para coger las imágenes de la página
      diciendo que confio en ella en el next.config.js */}
      <Image 
        src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`}
        alt= "icono de Pokemon" 
        width={70}
        height={70}
        priority 
      />

      <Text color="white" h2>P</Text>
      <Text color="white" h3>okémon</Text>

      {/* Para componentes de nextUI se utiliza css en vez de style */}
      <Spacer css={{flex:1}}></Spacer>

      <Text color="white" >Favoritos</Text>
    </div>
  );
};
