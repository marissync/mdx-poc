import { useState, useEffect, Fragment } from 'react'
//import * as runtime from 'react/jsx-runtime' // Production.
import * as runtime from 'react/jsx-dev-runtime' // Development.
import { compile, run } from '@mdx-js/mdx'
import Component1 from "../components/Component1";
// import { MDXProvider } from '@mdx-js/react';
import remarkFrontmatter from 'remark-frontmatter';
import path from 'path';

// const useMDXComponents = {
//     Component1
// }

const stringMDX = `---
Component1:
 name: Mdx Rocks
---

<Component1 name={frontmatter.Component1.name} />
`;

export default function Page({ code }: any) {
    const [mdxModule, setMdxModule] = useState()
    const Content = mdxModule ? mdxModule : Fragment

    useEffect(() => {
        ; (async () => {
            setMdxModule(await run(code, runtime))
        })()
    }, [code])

    return (
        <Content />
    )
}

export async function getStaticProps() {
    const remarkPlugins = [remarkFrontmatter];
    const url = path.join(process.cwd(), "components", "index");
    console.log(url);
    const code = String(
        await compile(stringMDX, {
            outputFormat: 'function-body',
            development: process.env.NODE_ENV === 'production' ? false : true,
            remarkPlugins: remarkPlugins,
            useDynamicImport: true,
            baseUrl: `${url}`
            //useDynamicImport: true,            
            // ^-- Generate code for production.
            // `false` if you use `/jsx-runtime` on client, `true` if you use
            // `/jsx-dev-runtime`.
            /* …otherOptions */
        })
    )
    // console.log("code", code);
    return { props: { code } }
}