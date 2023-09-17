import { ProductType, fetchProduct, fetchProducts } from "@/services/products";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "reactstrap";
import { ReactNode } from "react";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";

interface ProductProps {
    children?: ReactNode
    product?: ProductType
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params

    if(typeof id === 'string') {
        const product = await fetchProduct(id)

        return {
            props: { product }
        }
    }

    return {
        redirect: {
            destination: '/products',
            permanent: false
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()
  
    const paths = products.map(product => {
      return { params: { id: product.id.toString() } }
    })
  
    return { paths, fallback: false }
  }

const Product: NextPage = ({ children, product }: ProductProps) => {
    return (
        <div>
        <Head>
          <title>{product!.name}</title>
          <meta name="description" content={product!.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Header />
  
        <Container className="mt-5">
          <ProductDetails product={product!} />
        </Container>
      </div>
    )
}

export default Product