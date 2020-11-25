const Joi = require('@hapi/joi');

const editPostValidation = data => {
    const schema = Joi.object({
        links: Joi.object()
    });
}

const viewerRegisterValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        profilePicture: Joi.string()
            .optional(),
        username: Joi.string()
            .min(6)
            .required(),
    });

    return schema.validate(data);
}

const viewerLoginValidation = data => {

    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    });

    return schema.validate(data);
}
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        appName: Joi.string(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        profilePicture: Joi.string()
            .optional(),
        icon64: Joi.string()
            .optional(),
        icon192: Joi.string()
            .optional(),
        username: Joi.string()
            .min(6)
            .required(),
        links: Joi.array()
            .items(Joi.object(
            ))
            .optional(),
        posts: Joi.array()
            .items(Joi.object(
            ))
            .optional(),
        youtubeid: Joi.string()
            .optional(),
        instagramid: Joi.string()
            .optional()
    });

    return schema.validate(data);
}
const loginValidation = data => {

    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.viewerLoginValidation = viewerLoginValidation;
module.exports.editPostValidation = editPostValidation;
module.exports.viewerRegisterValidation = viewerRegisterValidation;
