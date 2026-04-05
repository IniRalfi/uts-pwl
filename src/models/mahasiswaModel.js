import prisma from "../config/prisma";

export const getAll = async () => await prisma.mahasiswa.findMany();

export const getById = async (id) =>
  await prisma.mahasiswa.findUnique({
    where: { id: parseInt(id) },
  });

export const create = async (data) =>
  await prisma.mahasiswa.create({
    data: { nama: data.nama, nim: data.nim },
  });

export const update = async (id, data) =>
  await prisma.mahasiswa.update({
    where: { id: parseInt(id) },
    data: { nama: data.nama, nim: data.nim },
  });

export const remove = async (id) =>
  await prisma.mahasiswa.delete({
    where: { id: parseInt(id) },
  });
