import Head from "next/head";

export default function HeadManager({ title, description, keywords }) {
  return (
    <Head>
      <title>{title || "تورینو - تورهای داخلی و خارجی"}</title>
      <meta name="description" content={description || "رزرو تورهای متنوع داخلی و خارجی با تورینو"} />
      <meta name="keywords" content={keywords || "تور، مسافرت، رزرو تور، سفر"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
