import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getPost(slug) {
    const text = await readFile(`./src/lib/content/${slug}.md`, "utf8");
    const { content, data: { title, seo_title, seo_desctiption } } = matter(text);
    const body = marked(content);
    return {slug, title, seo_title, seo_desctiption, body}
 }

 export async function getSlugs() {
    const files = await readdir('./src/lib/content/');
    return files.filter((file) => file.endsWith('.md'))
        .map((file) => file.slice(0, -'.md'.length));
}
 