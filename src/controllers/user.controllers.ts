import type { Request, Response } from 'express';
import pool from '@db/index';
import jwt from 'jsonwebtoken';

import type { User } from 'types/user';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const checkUsers = async (
  req: Request<unknown, unknown, { nome: string; password: string }>,
  res: Response
): Promise<void> => {
  const { nome, password } = req.body;

  try {
    const result = await pool.query<User>(
      'SELECT * FROM users WHERE nome = $1 AND password = $2',
      [nome, password],
    );
    
    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);
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
  const { nome, email, password } = req.body;

  try {
    const result = await pool.query<User>(
      'INSERT INTO users (nome, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, password],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir usuario:', err);
    res.status(500).json({ erro: 'Erro ao inserir usuario' });
  }
};
