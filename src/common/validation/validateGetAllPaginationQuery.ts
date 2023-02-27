import Joi from "joi";

export function validateGetAllPaginationQuery(query: { page?: string; limit?: string }){
    const schema = Joi.object({
        page: Joi.number().integer().positive(),
        limit: Joi.number().integer().positive().max(100),
    });
    return schema.validate(query);
}
