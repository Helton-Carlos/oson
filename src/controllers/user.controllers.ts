import type { Request, Response } from 'express';
import pool from '../db/index';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import type { User } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const checkUsers = async (
  req: Request<unknown, unknown, { nome: string; password: string }>,
  res: Response
): Promise<void> => {
  const { nome, password } = req.body;
  try {
    const result = await pool.query<User>(
      'SELECT * FROM usuarios WHERE nome = $1 AND password = $2',
      [nome, password],
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (!user) {
        res.status(401).json({ autenticado: false });
        return;
      }
      const { id, nome, email } = user;

      const token = jwt.sign({ id, nome }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        autenticado: true,
        token,
        usuario: {
          id,
          nome,
          email,
        },
      });
    } else {
      res.status(401).json({ autenticado: false });
    }
  } catch (err) {
    console.error('Erro ao verificar usuário:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

export const setUsers = async (
  req: Request<unknown, unknown, { nome: string; email: string; password: string }>,
  res: Response
): Promise<void> => {
  const id = uuidv4();
  const { nome, email, password } = req.body;

  try {
    const result = await pool.query<User>(
      'INSERT INTO usuarios (id, nome, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, nome, email, password],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir usuario:', err);
    res.status(500).json({ erro: 'Erro ao inserir usuario' });
  }
};
