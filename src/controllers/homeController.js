import { render } from "../config/viewEngine";
import * as mahasiswaModel from "../models/mahasiswaModel";

export const home = async (c) => {
  // Ambil jumlah total mahasiswa dari database
  const total_mahasiswa = await mahasiswaModel.count();

  const html = await render(
    "home",
    {
      title: "Dashboard Bun MVC",
      message: "Hello dari Bun + Tailwind",
      total_mahasiswa, // Kirim datanya kesini
    },
    c,
  );

  return c.html(html);
};
