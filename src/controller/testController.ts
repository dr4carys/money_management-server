import {
  getDataRecipe,
  insertDataRecipe,
  insertDataIngredient,
  insertDataStep,
  IGetRecipe,
} from '../models/flashCoffeModel';

export const getRecipe = async (req: any, res: any): Promise<any> => {
  const data: IGetRecipe[] = await getDataRecipe();
  if (!data) {
    res.status(404).send({ body: 'not found' });
  }
  res.status(200).send({
    body: data,
  });
};

export const insertRecipe = async (req: any, res: any): Promise<any> => {
  try {
    await insertDataRecipe(req.body);
  } catch (e) {
    res.status(400).send({ body: 'failed when insert data' });
  }
  res.status(200).send({ body: 'success' });
};

export const insertIngredient = async (req: any, res: any): Promise<any> => {
  try {
    await insertDataIngredient(req.body);
  } catch (e) {
    res.status(400).send({ body: 'failed when inserti data' });
  }
  res.status(200).send({ body: 'success' });
};

export const insertStep = async (req: any, res: any): Promise<any> => {
  try {
    await insertDataStep(req.body);
  } catch (e) {
    res.status(400).send({ body: 'failed when inserti data' });
  }
  res.status(200).send({ body: 'success' });
};
