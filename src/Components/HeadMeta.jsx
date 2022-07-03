import Head from "next/head";

const MetaTag = (props) => {
  return <Head>
    <title>{props.title}</title>
    <meta property="og:title" content={props.title}/>
    <meta property="og:description" content={props.description}/>
    <meta property="og:image" content={props.image} key={`ogimage-${props.title}`}/>
  </Head>
}

export default MetaTag