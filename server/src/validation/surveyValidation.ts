import Joi from 'joi';
import surveyConfig from '../models/surveyConfig.json' with { type: "json" };

export const getSurveyConfig = () => {
  return surveyConfig;
};

const buildValidationSchema = () => {
  const config = getSurveyConfig();
  const schemaDefinition: { [key: string]: Joi.Schema } = {};

  config.questions.forEach((question: any) => {
    let validator;

    switch (question.type) {
      case 'text':
      case 'textarea':
        validator = Joi.string();
        if (question.validation.minLength) {
          validator = validator.min(question.validation.minLength);
        }
        if (question.validation.maxLength) {
          validator = validator.max(question.validation.maxLength);
        }
        break;
      case 'rating':
        validator = Joi.number().integer().min(1).max(question.scale);
        break;
      case 'multiple_choice':
      case 'select':
        validator = Joi.string().valid(...question.options);
        break;
      default:
        validator = Joi.any();
    }

    if (question.validation.required) {
      validator = validator.required();
    } else {
      validator = validator.optional();
    }
      
    schemaDefinition[question.name] = validator;
  });

  return Joi.object(schemaDefinition);
};

export const surveyResponseSchema = buildValidationSchema();
