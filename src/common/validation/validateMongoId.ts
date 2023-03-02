import Joi from "joi";

export function validateMongoId(id: string){
    const schema = Joi.string().required().regex(/^[a-fA-F0-9]{24}$/)
        .error(new Error('Invalid id provided'));
    return schema.validate(id);
}
