import { connection } from '../utils/db_mysql';

interface IRecipe {
  name: string;
  description: string;
  author_id: number;
}
interface Iingredient {
  ingredient_category_id: number;
  name: string;
  color: string;
  img: string;
}
export interface IStep {
  recipe_id: number;
  ingredient_id: number;
  step_number: number;
  description: string;
  timer: number;
  image: string;
  amount: number;
  unit: string;
}
export interface IGetRecipe {
  id: number;
  description: string;
  author_name: string;
}

export const getDataRecipe = async (): Promise<IGetRecipe[]> => {
  return Object.values(
    JSON.parse(
      JSON.stringify(
        await connection.query(
          'SELECT recipe.`id`, recipe.`description` ,recipe.`name`, users.`name` AS author_name FROM recipe INNER JOIN users ON recipe.`author_id` = users.`id` '
        )
      )
    )
  );
};

export const insertDataRecipe = async (data: IRecipe) => {
  await connection.query('INSERT INTO recipe SET ?', data);
};

export const insertDataIngredient = async (data: Iingredient) => {
  const ingredientData = await connection.query(
    'INSERT INTO ingredient(ingredient.`name`,ingredient.`color`,ingredient.`img`) VALUES (?,?,?)',
    [data.name, data.color, data.img]
  );
  await connection.query(
    'INSERT INTO ingredient_category_ingredient(ingredient_category_id, ingredient_id) VALUES (?,?)',
    [data.ingredient_category_id, JSON.parse(JSON.stringify(ingredientData)).insertId]
  );
};

export const insertDataStep = async (data: IStep) => {
  const stepData = await connection.query(
    'INSERT INTO step (recipe_id, step_number,description,timer,image) VALUES (?,?,?,?,?)',
    [data.recipe_id, data.step_number, data.description, data.timer, data.image]
  );
  await connection.query(
    'INSERT INTO step_ingredients (recipe_id,ingredient_id,step_id,amount,unit) VALUES (?,?,?,?,?)',
    [data.recipe_id, data.ingredient_id, JSON.parse(JSON.stringify(stepData)).insertId, data.amount, data.unit]
  );
};
