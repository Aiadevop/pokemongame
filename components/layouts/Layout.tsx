import React, { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui/index";

interface Props {
  // El titulo es opcional
  title?: string;
  children: React.ReactNode;

}

export const Layout: FC<Props> = ({ children, title}) => {


  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Lara Alonso" />
        <meta
          name="description"
          content={`informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, podedex`} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      <Navbar ></Navbar>

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
