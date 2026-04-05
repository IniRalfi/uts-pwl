import ejs from "ejs";
import { readFile } from "fs/promises";

export const render = async (view, data = {}, c = null) => {
  try {
    console.log(`[ViewEngine] Rendering: ${view}`);
    const viewPath = `./src/views/` + view + `.ejs`;
    const viewTemplate = await readFile(viewPath, "utf-8");
    console.log(`[ViewEngine] View file loaded`);

    const content = ejs.render(viewTemplate, data);

    // PASTIKAN BARIS INI BERSIH DARI TANDA KURUNG KOTAK []
    const layoutPath = `./src/views/layout.ejs`;

    const layoutTemplate = await readFile(layoutPath, "utf-8");
    console.log(`[ViewEngine] Layout file loaded`);

    return ejs.render(layoutTemplate, {
      ...data,
      body: content,
      currentPath: c?.req?.path || "",
    });
  } catch (error) {
    console.error("[ViewEngine] Error:", error);
    return "Error Rendering View";
  }
};
