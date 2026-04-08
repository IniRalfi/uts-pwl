import { render } from "../config/viewEngine";
import * as mahasiswaModel from "../models/mahasiswaModel";

export const home = async (c) => {
  // Ambil jumlah total dan list mahasiswa dari database
  const total_mahasiswa = await mahasiswaModel.count();
  const mahasiswa = await mahasiswaModel.getAll();

  const html = await render(
    "home",
    {
      title: "Dashboard Bun MVC",
      message: "Hello dari Bun + Tailwind",
      total_mahasiswa,
      mahasiswa, // <--- Kirim datanya kesini
    },
    c,
  );

  return c.html(html);
};
