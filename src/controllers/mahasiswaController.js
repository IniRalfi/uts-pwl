import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

export const index = async (c) => {
  const data = await model.getAll(); // <-- TAMBAH AWAIT
  const success = c.req.query("success");
  const error = c.req.query("error");
  return c.html(
    await render(
      "mahasiswa/index",
      { title: "Data Mahasiswa", mahasiswa: data, success, error },
      c,
    ),
  );
};

export const createForm = async (c) =>
  c.html(await render("mahasiswa/create", { title: "Tambah Mahasiswa" }, c));

export const store = async (c) => {
  const body = await c.req.parseBody();
  if (!body.nama || !body.nim) return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
  await model.create({ nama: body.nama, nim: body.nim }); // <-- TAMBAH AWAIT
  return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
};

export const editForm = async (c) => {
  const id = c.req.param("id");
  const data = await model.getById(id); // <-- TAMBAH AWAIT
  return c.html(await render("mahasiswa/edit", { title: "Edit Mahasiswa", mhs: data }, c));
};

export const updateData = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  if (!body.nama || !body.nim)
    return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
  await model.update(id, { nama: body.nama, nim: body.nim }); // <-- TAMBAH AWAIT
  return c.redirect("/mahasiswa?success=Data berhasil diupdate");
};

export const destroy = async (c) => {
  const id = c.req.param("id");
  await model.remove(id); // <-- TAMBAH AWAIT
  return c.redirect("/mahasiswa?success=Data berhasil dihapus");
};
