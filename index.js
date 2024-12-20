const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Users berhasil diambil", users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  try {
    const isExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!isExists) {
      return res.status(400).json({ error: "User not found" });
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    res.status(202).json({ message: "User updated successfully", updateUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const isExists = await prisma.user.findUnique({
      where: { id },
    });
    if (!isExists) {
      return res.json({ error: "User not found" });
    }
    const deleteUser = await prisma.user.delete({
      where: { id },
    });
    res.status(202).json({ message: "user berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

module.exports = app;