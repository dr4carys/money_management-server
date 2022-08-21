export const argchecker = (req: any, res: any, next: any) => {
  if (Object.keys(req.body).length === 0) res.status(400).send({ body: 'argument empty' });
  next();
};
