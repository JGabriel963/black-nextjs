import Header from "@/components/Header";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "reactstrap";
import ProductsList from "@/components/ProductsList";
import { ProductType, fetchProducts } from "@/services/products";
import { ReactNode } from "react";

interface ProductsProps  {
  children?: ReactNode
  products?: ProductType[]
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProducts()
  return {
    props: { products }
  }
}

const Products: NextPage = ({ children, products}: ProductsProps) => {
  return (
    <>
      <Head>
        <title>Nossos Produtos</title>
        <meta name="description" content="Conheça todos os nossos produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container className="mb-5">
          <h1 className="my-5">
            Nossos Produtos
          </h1>

          {<ProductsList products={products} />}
        </Container>
      </main>
    </>
  )
}

export default Products