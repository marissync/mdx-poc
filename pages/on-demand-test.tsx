import { useState, useEffect, Fragment } from "react";
//import * as runtime from 'react/jsx-runtime' // Production.
import * as runtime from "react/jsx-dev-runtime"; // Development.
import { compile, run } from "@mdx-js/mdx";
import Component1 from "../components/Component1";
import type { MDXModule } from "mdx/types";
import remarkFrontmatter from "remark-frontmatter";

const stringMDX = `---
ct1:
    name: Mdx Rocks
---

<Component1 name={props.ct1.name} />
`;
export default function Page({ code }: any) {
  const [mdxModule, setMdxModule] = useState<MDXModule>();
  const Content = mdxModule ? mdxModule?.default : Fragment;
  useEffect(() => {
    (async () => {
      setMdxModule(await run(code, runtime));
    })();
  }, [code]);

  const pageProps = { ct1: { name: "Mdx Rocks" } };

  return (
    <>
      <h1>Something about MDX:</h1>
      <Content components={{ Component1 }} {...pageProps} />
    </>
  );
}
export async function getStaticProps() {
  //const url = path.join(process.cwd(), "components", "index");
  //console.log(url);
  const code = String(
    await compile(stringMDX, {
      // jsx: true,
      outputFormat: "function-body",
      development: process.env.NODE_ENV === "production" ? false : true,
      remarkPlugins: [remarkFrontmatter],
      // useDynamicImport: true,
      // baseUrl: `${url}`
      //useDynamicImport: true,
      // ^-- Generate code for production.
      // `false` if you use `/jsx-runtime` on client, `true` if you use
      // `/jsx-dev-runtime`.
      /* …otherOptions */
    })
  );
  // console.log("code", code);
  return { props: { code } };
}
