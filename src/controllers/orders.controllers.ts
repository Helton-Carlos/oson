import type { Request, Response } from 'express';
import pool from '@db/index';
import { v4 as uuidv4 } from 'uuid';

import type { Order } from 'types/orden';

export const createOrders = async (
  req: Request<Order>,
  res: Response,
): Promise<void> => {
  const { title, description, schedule_time } = req.body;

  try {
    const id = uuidv4();

    const result = await pool.query<Order>(
      'INSERT INTO ordem (id, title, description, schedule_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, title, description, schedule_time],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir ordens:', err);
    res.status(500).json({ erro: 'Erro ao inserir ordens' });
  }
};

export const getOrders = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await pool.query<Order>('SELECT * FROM ordem');

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar ordens:', err);
    res.status(500).json({ erro: 'Erro ao buscar ordens' });
  }
};
