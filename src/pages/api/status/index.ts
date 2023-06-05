import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send('');
  } else {
    res.status(404).json({ message: 'method not found' });
  }
}
